const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const weinmanProducts = [
    {
        id: uuidv4(),
        name: 'Weinman End Suction Pumps',
        slug: 'weinman-end-suction-pumps',
        price_sgd: 0,
        image_url: '/images/products/weinman-end-suction.webp',
        specs_json: { "Description": "High-efficiency general purpose pumping" },
        stock_level: 15
    },
    {
        id: uuidv4(),
        name: 'WEINMAN SPLIT CASE',
        slug: 'weinman-split-case',
        price_sgd: 0,
        image_url: '/images/products/weinman-split-case.webp',
        specs_json: { "Description": "Heavy-duty high capacity performance" },
        stock_level: 8
    }
];

async function run() {
    console.log("Restoring Weinman pumps...");
    for (const p of weinmanProducts) {
        const { error } = await supabase.from('products').insert([p]);
        if (error) console.error("Error inserting", p.name, error);
        else console.log("Restored", p.name);
    }
}
run();
