
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fetchAllPages() {
    const { data: pages, error } = await supabase
        .from('pages')
        .select('slug, content_json, content_zh_json');

    if (error) {
        console.error('Error fetching pages:', error);
        return;
    }

    pages.forEach(page => {
        console.log(`--- PAGE: ${page.slug} ---`);
        console.log('EN Blocks:', (page.content_json?.content || []).map(c => c.type).join(', '));
        console.log('ZH Blocks:', (page.content_zh_json?.content || []).map(c => c.type).join(', '));
        console.log('---------------------------');
    });
}

fetchAllPages();
