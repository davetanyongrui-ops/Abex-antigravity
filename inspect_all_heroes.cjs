
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspectAllPages() {
    const slugs = ['index', 'products', 'servicing', 'projects'];
    const { data: pages, error } = await supabase
        .from('pages')
        .select('slug, content_zh_json')
        .in('slug', slugs);

    if (error) {
        console.error('Error fetching pages:', error);
        return;
    }

    pages.forEach(page => {
        console.log(`--- PAGE: ${page.slug} ---`);
        const hero = (page.content_zh_json?.content || []).find(c => c.type === 'Hero');
        console.log('Hero Prop:', JSON.stringify(hero?.props || {}, null, 2));
        console.log('---------------------------');
    });
}

inspectAllPages();
