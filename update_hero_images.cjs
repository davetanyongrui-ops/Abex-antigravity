const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const heroMap = {
    'index': '/images/hero/home.webp',
    'about': '/images/hero/about.webp',
    'products': '/images/hero/products.webp',
    'projects': '/images/hero/projects.webp',
    'contact': '/images/hero/projects.webp', // Fallback for 404
    'servicing': '/images/hero/about.webp'  // Fallback
};

async function updateHeroImages() {
    const { data: pages, error } = await supabase.from('pages').select('*');
    if (error) {
        console.error('Error fetching pages:', error);
        return;
    }

    for (const page of pages) {
        const heroImage = heroMap[page.slug];
        if (!heroImage) continue;

        console.log(`Updating hero image for: ${page.slug}`);

        const updatePage = (content) => {
            if (!content || !content.content) return content;
            const newContent = { ...content };
            newContent.content = newContent.content.map(block => {
                if (block.type === 'Hero') {
                    return {
                        ...block,
                        props: {
                            ...block.props,
                            // Some use bgImage, some might use bg_image or similar in future
                            bgImage: heroImage,
                            bg_image: heroImage // Cover both bases
                        }
                    };
                }
                return block;
            });
            return newContent;
        };

        const updatedContentJson = updatePage(page.content_json);
        const updatedContentZhJson = updatePage(page.content_zh_json);

        const { error: updateError } = await supabase
            .from('pages')
            .update({
                content_json: updatedContentJson,
                content_zh_json: updatedContentZhJson
            })
            .eq('id', page.id);

        if (updateError) {
            console.error(`Error updating page ${page.slug}:`, updateError);
        } else {
            console.log(`Successfully updated ${page.slug}`);
        }
    }
}

updateHeroImages();
