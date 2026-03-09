const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateAboutHero() {
    console.log("Fetching about page...");
    const { data: page, error: fetchError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'about')
        .single();

    if (fetchError) {
        console.error("Fetch error:", fetchError);
        return;
    }

    // Update English content
    let contentEn = page.content_json;
    if (contentEn && Array.isArray(contentEn.content)) {
        const heroIndex = contentEn.content.findIndex(c => c.type === 'Hero');
        if (heroIndex >= 0) {
            contentEn.content[heroIndex].props.title = "About Us";
            console.log("Updated English hero title.");
        }
    }

    // Update Chinese content
    let contentZh = page.content_zh_json;
    if (contentZh && Array.isArray(contentZh.content)) {
        const heroIndexZh = contentZh.content.findIndex(c => c.type === 'Hero');
        if (heroIndexZh >= 0) {
            contentZh.content[heroIndexZh].props.title = "关于我们";
            console.log("Updated Chinese hero title.");
        }
    }

    console.log("Saving about page...");
    const { error: updateError } = await supabase
        .from('pages')
        .update({
            content_json: contentEn,
            content_zh_json: contentZh
        })
        .eq('slug', 'about');

    if (updateError) {
        console.error("Update error:", updateError);
    } else {
        console.log("Successfully updated about page hero title.");
    }
}

updateAboutHero();
