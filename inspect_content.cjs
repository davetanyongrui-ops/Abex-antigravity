
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspectPageContent() {
    const { data: page, error } = await supabase
        .from('pages')
        .select('slug, content_json, content_zh_json')
        .eq('slug', 'index')
        .single();

    if (error) {
        console.error('Error fetching page:', error);
        return;
    }

    console.log(`--- PAGE: ${page.slug} ---`);
    console.log('EN Content Sample (1st Block):', JSON.stringify(page.content_json?.content?.[0] || {}, null, 2));
    console.log('ZH Content Sample (1st Block):', JSON.stringify(page.content_zh_json?.content?.[0] || {}, null, 2));
}

inspectPageContent();
