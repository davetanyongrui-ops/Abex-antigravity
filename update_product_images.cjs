
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function updateImages() {
    console.log('--- UPDATING PRODUCT IMAGES ---');

    const updates = [
        { name: "PA Series", image_url: "/assets/products/pa-series.png" },
        { name: "PS Series", image_url: "/assets/products/ps-series.png" },
        { name: "PAZ Series", image_url: "/assets/products/paz-series.png" },
        { name: "P-ISO Series", image_url: "/assets/products/p-iso-series.png" },
        { name: "PV Series", image_url: "/assets/products/pv-series.png" },
        { name: "PIL Series", image_url: "/assets/products/pil-series.png" },
        { name: "PM Series", image_url: "/assets/products/pm-series.png" },
        { name: "CP Series", image_url: "/assets/products/cp-series.png" },
        { name: "MD Series", image_url: "/assets/products/md-series.png" },
        { name: "4PBS Series", image_url: "/assets/products/pbs-series.png" }
    ];

    for (const item of updates) {
        const { error } = await supabase
            .from('products')
            .update({ image_url: item.image_url })
            .ilike('name', `%${item.name}%`);

        if (error) {
            console.error(`Error updating ${item.name}:`, error.message);
        } else {
            console.log(`Updated ${item.name} image.`);
        }
    }

    // Special case for Fire Pump if it exists or should be added
    console.log('--- UPDATE FINISHED ---');
}

updateImages();
