
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fetchHome() {
    const { data: page, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'index')
        .single();

    if (error) {
        console.error('Error fetching home:', error);
        return;
    }

    console.log('--- EN CONTENT ---');
    console.log(JSON.stringify(page.content_json, null, 2));
    console.log('--- ZH CONTENT ---');
    console.log(JSON.stringify(page.content_zh_json, null, 2));
}

fetchHome();
