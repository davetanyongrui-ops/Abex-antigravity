const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function toTitleCase(str) {
    if (!str) return str;
    return str.toLowerCase().split(' ').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

async function updateHeroContent() {
    const { data: pages, error } = await supabase.from('pages').select('*');
    if (error) {
        console.error('Error fetching pages:', error);
        return;
    }

    for (const page of pages) {
        console.log(`Processing page: ${page.slug}`);
        let needsUpdate = false;

        const processContent = (contentData, isHome) => {
            if (!contentData || !contentData.content) return contentData;
            const newContent = { ...contentData };
            newContent.content = newContent.content.map(block => {
                if (block.type === 'Hero') {
                    needsUpdate = true;
                    // Change Title to Title Case
                    if (block.props.title) {
                        block.props.title = toTitleCase(block.props.title);
                    }

                    // Specific update for Home page subtitle
                    if (isHome) {
                        block.props.subtitle = "Power. Precision. Performance. ABEX delivers trusted water pump systems built to move the world's most essential resource — water.";
                    }
                }
                return block;
            });
            return newContent;
        };

        const isHome = page.slug === 'index';
        const updatedContentJson = processContent(page.content_json, isHome);
        const updatedContentZhJson = processContent(page.content_zh_json, false); // Assuming we only touch EN subtitle for now, or maybe titlecase works for ZH? ZH usually doesn't have case, but English words in it might.

        if (needsUpdate) {
            const { error: updateError } = await supabase
                .from('pages')
                .update({
                    content_json: updatedContentJson,
                    content_zh_json: updatedContentZhJson // Update both just in case title was changed
                })
                .eq('id', page.id);

            if (updateError) {
                console.error(`Error updating page ${page.slug}:`, updateError);
            } else {
                console.log(`Successfully updated ${page.slug}`);
            }
        } else {
            console.log(`No Hero section found in ${page.slug}`);
        }
    }
}

updateHeroContent();
