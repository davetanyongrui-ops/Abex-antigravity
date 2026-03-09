
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function finalizeProducts() {
    console.log('--- FINALIZING PRODUCT CATALOG ---');

    // Detect schema
    const { data: cols } = await supabase.from('products').select('*').limit(1);
    const hasSpecsText = cols && cols.length > 0 && ('specs_text' in cols[0]);
    console.log('Using specs_text?', hasSpecsText);

    // 1. Add Fire Pump Systems
    const firePump = {
        id: uuidv4(),
        name: "Fire Pump Systems",
        slug: "fire-pump-systems",
        price_sgd: 25000,
        image_url: "/assets/products/fire-pump.png",
        stock_level: 2
    };
    const descFP = "Complete Fire Pump Systems engineered for reliability. Available in various configurations including end-suction and split-case, meeting NFPA 20 standards.";
    if (hasSpecsText) firePump.specs_text = descFP;
    else firePump.specs_json = { description: descFP };

    // 2. Add LR Series (using PS image as they are both split case)
    const lrSeries = {
        id: uuidv4(),
        name: "LR Series",
        slug: "lr-series",
        price_sgd: 18000,
        image_url: "/assets/products/ps-series.png",
        stock_level: 3
    };
    const descLR = "Large Scale Double Suction Split Casing Centrifugal Pump. Designed for high flow and heavy-duty industrial water supply.";
    if (hasSpecsText) lrSeries.specs_text = descLR;
    else lrSeries.specs_json = { description: descLR };

    const newAdds = [firePump, lrSeries];
    for (const item of newAdds) {
        // Use upsert to avoid duplicate slugs
        const { error } = await supabase.from('products').upsert(item, { onConflict: 'slug' });
        if (error) console.error(`Error adding ${item.name}:`, error.message);
        else console.log(`Added/Updated ${item.name}.`);
    }

    // 3. Update existing ones that might need better mapping
    const finalUpdates = [
        { name: "VT Series", image_url: "/assets/products/pv-series.png" },
        { name: "SP Series", image_url: "/assets/products/cp-series.png" },
        { name: "SPT-SPU Series", image_url: "/assets/products/ps-series.png" },
    ];

    for (const item of finalUpdates) {
        await supabase
            .from('products')
            .update({ image_url: item.image_url })
            .ilike('name', `%${item.name}%`);
        console.log(`Refined ${item.name} image.`);
    }

    console.log('--- CATALOG FINALIZED ---');
}

finalizeProducts();
