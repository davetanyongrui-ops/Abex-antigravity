const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    await supabase.from('products').update({ image_url: null }).eq('slug', 'weinman-end-suction-pumps');
    await supabase.from('products').update({ image_url: null }).eq('slug', 'weinman-split-case');
    console.log("Images reset to null to show fallback icon.");
}
run();
