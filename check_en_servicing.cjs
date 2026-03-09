
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkEnglishServicing() {
    const { data: page, error } = await supabase
        .from('pages')
        .select('slug, content_json')
        .eq('slug', 'servicing')
        .single();

    if (error) {
        console.error('Error:', error);
        return;
    }

    const hero = page.content_json?.content?.find(c => c.type === 'Hero');
    console.log('EN Hero Props:', JSON.stringify(hero?.props || {}, null, 2));
}

checkEnglishServicing();
