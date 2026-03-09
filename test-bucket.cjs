const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAnon = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, serviceKey);

async function run() {
    const { data: buckets, error } = await supabaseAdmin.storage.listBuckets();
    if (error) {
        console.error("Error listing buckets:", error);
    } else {
        console.log("Buckets:", buckets.map(b => b.name));
        if (!buckets.find(b => b.name === 'product-images')) {
            console.log("Creating product-images bucket...");
            const { data, error: createError } = await supabaseAdmin.storage.createBucket('product-images', { public: true });
            if (createError) console.error("Error creating bucket:", createError);
            else console.log("Bucket created successfully.");
        } else {
            const bucketInfo = buckets.find(b => b.name === 'product-images');
            console.log("Bucket exists. Public:", bucketInfo.public);
        }
    }
}
run();
