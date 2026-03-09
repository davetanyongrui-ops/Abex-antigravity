
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function listProducts() {
    // 1. Check all columns
    const { data: columnData, error: colError } = await supabase
        .rpc('get_table_columns', { table_name: 'products' });

    if (colError) {
        // Fallback: just try to select everything and see what we get
        const { data: sample, error: sampleError } = await supabase
            .from('products')
            .select('*')
            .limit(1);

        if (sampleError) {
            console.error('Error fetching samples:', sampleError);
        } else {
            console.log('--- SAMPLE PRODUCT KEYS ---');
            console.log(Object.keys(sample[0] || {}).join(', '));
        }
    } else {
        console.log('--- PRODUCTS COLUMNS ---');
        console.log(columnData.map(c => c.column_name).join(', '));
    }

    const { data: products, error } = await supabase
        .from('products')
        .select('id, name, name_zh, specs_json, specs_zh_json')
        .limit(10);

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    console.log('\n--- PRODUCT SAMPLES ---');
    products.forEach(p => {
        console.log(`- ID: ${p.id}`);
        console.log(`  EN Name: ${p.name}`);
        console.log(`  ZH Name: ${p.name_zh || 'MISSING'}`);
        console.log(`  ZH Specs: ${p.specs_zh_json ? 'EXISTS' : 'MISSING'}`);
    });

    const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

    console.log('\nTotal products:', count);
}

listProducts();
