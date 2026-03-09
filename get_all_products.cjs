
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function getAllProducts() {
    const { data: products, error } = await supabase
        .from('products')
        .select('id, name, specs_json');

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    console.log(JSON.stringify(products, null, 2));
}

getAllProducts();
