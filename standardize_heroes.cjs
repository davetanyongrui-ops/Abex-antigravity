
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const heroFixes = {
    index: '/images/hero/home.webp',
    about: '/images/hero/about.webp',
    products: '/images/hero/products.webp',
    projects: '/images/hero/projects.webp',
    servicing: '/images/hero/about.webp', // servicing.webp is missing, using about.webp as in EN
    contact: '/images/hero/about.webp'
};

async function standardizeHeroes() {
    for (const [slug, imagePath] of Object.entries(heroFixes)) {
        const { data: page, error: fetchError } = await supabase
            .from('pages')
            .select('*')
            .eq('slug', slug)
            .single();

        if (fetchError) {
            console.error(`Error fetching ${slug}:`, fetchError);
            continue;
        }

        let contentZh = page.content_zh_json || { content: [] };
        let contentEn = page.content_json || { content: [] };

        // Fix EN
        contentEn.content = (contentEn.content || []).map(block => {
            if (block.type === 'Hero') {
                block.props = { ...block.props, bgImage: imagePath, bg_image: imagePath };
            }
            return block;
        });

        // Fix ZH
        contentZh.content = (contentZh.content || []).map(block => {
            if (block.type === 'Hero') {
                block.props = { ...block.props, bgImage: imagePath, bg_image: imagePath };
                // Also ensure CTA Href in ZH has /zh prefix
                if (block.props.ctaHref && !block.props.ctaHref.startsWith('/zh')) {
                    block.props.ctaHref = '/zh' + block.props.ctaHref;
                }
            }
            return block;
        });

        const { error: updateError } = await supabase
            .from('pages')
            .update({
                content_json: contentEn,
                content_zh_json: contentZh
            })
            .eq('id', page.id);

        if (updateError) {
            console.error(`Error updating ${slug}:`, updateError);
        } else {
            console.log(`Standardized Heroes for ${slug}`);
        }
    }
}

standardizeHeroes();
