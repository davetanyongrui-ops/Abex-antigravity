const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function runUpdate() {
    console.log("Starting content update...");

    // 1. Update Homepage (Remove StatsGrid)
    console.log("Fetching homepage content...");
    const { data: home, error: homeFetchError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'index')
        .single();

    if (homeFetchError) {
        console.error("Error fetching homepage:", homeFetchError);
        return;
    }

    const removeStats = (content) => {
        if (!content || !content.content) return content;
        return {
            ...content,
            content: content.content.filter(block => block.type !== 'StatsGrid')
        };
    };

    const newHomeContentEn = removeStats(home.content_json);
    const newHomeContentZh = removeStats(home.content_zh_json);

    console.log("Updating homepage in database...");
    const { error: homeUpdateError } = await supabase
        .from('pages')
        .update({
            content_json: newHomeContentEn,
            content_zh_json: newHomeContentZh
        })
        .eq('slug', 'index');

    if (homeUpdateError) {
        console.error("Error updating homepage:", homeUpdateError);
    } else {
        console.log("Successfully removed stats from homepage.");
    }

    // 2. Update About Page (Add BrandsGrid)
    console.log("Fetching about page content...");
    const { data: about, error: aboutFetchError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'about')
        .single();

    if (aboutFetchError) {
        console.error("Error fetching about page:", aboutFetchError);
        return;
    }

    const brandsEn = [
        {
            name: "Paragon Pump",
            logo: "https://paragonpumpasia.com/image/catalog/Navigation_Logo.png",
            description: "Our flagship brand offering high-quality, durable pumps designed for residential and commercial applications."
        },
        {
            name: "Weinman",
            logo: "https://abex-engrg.com/wp-content/uploads/2024/08/Weinman-Logo.jpg",
            description: "A premier brand by Crane Pumps & Systems, Weinman is a recognized leader in high-end centrifugal pumps for HVAC, industrial, and water treatment applications."
        }
    ];

    const brandsZh = [
        {
            name: "Paragon Pump",
            logo: "https://paragonpumpasia.com/image/catalog/Navigation_Logo.png",
            description: "我们的旗舰品牌，为住宅和商业应用提供高质量、耐用的水泵。"
        },
        {
            name: "Weinman",
            logo: "https://abex-engrg.com/wp-content/uploads/2024/08/Weinman-Logo.jpg",
            description: "Crane Pumps & Systems 旗下的顶级品牌，是 HVAC、工业和水处理应用高端离心泵领域的公认领导者。"
        }
    ];

    const addBrands = (content, brands, title, desc) => {
        if (!content || !content.content) return content;

        const brandsBlock = {
            id: content.content[0].id.includes('-zh') ? 'about-brands-zh' : 'about-brands',
            type: 'BrandsGrid',
            props: {
                title: title,
                description: desc,
                brands: brands
            }
        };

        // Insert after mission or as 4th element (original mission was 4th)
        const newContent = [...content.content];
        const missionIndex = newContent.findIndex(b => b.id.includes('mission'));
        if (missionIndex !== -1) {
            newContent.splice(missionIndex + 1, 0, brandsBlock);
        } else {
            newContent.push(brandsBlock);
        }

        return {
            ...content,
            content: newContent
        };
    };

    const newAboutContentEn = addBrands(
        about.content_json,
        brandsEn,
        "Our Brands",
        "ABEX is proud to partner with leading global brands to deliver superior pump solutions."
    );
    const newAboutContentZh = addBrands(
        about.content_zh_json,
        brandsZh,
        "我们的品牌",
        "ABEX 自豪地与全球领先品牌合作，提供卓越的水泵解决方案。"
    );

    console.log("Updating about page in database...");
    const { error: aboutUpdateError } = await supabase
        .from('pages')
        .update({
            content_json: newAboutContentEn,
            content_zh_json: newAboutContentZh
        })
        .eq('slug', 'about');

    if (aboutUpdateError) {
        console.error("Error updating about page:", aboutUpdateError);
    } else {
        console.log("Successfully added 'Our Brands' section to About page.");
    }

    console.log("All updates completed.");
}

runUpdate();
