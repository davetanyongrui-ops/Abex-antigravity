const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function updateCertifications() {
    console.log('Starting certification update...');

    // Fetch all products
    const { data: products, error: fetchError } = await supabase
        .from('products')
        .select('id, name');

    if (fetchError) {
        console.error('Error fetching products:', fetchError);
        return;
    }

    console.log(`Found ${products.length} products.`);

    const certifications = ["ISO 9001", "Singapore Green Building Council", "Setsco", "UL Listed"];

    for (const product of products) {
        console.log(`Updating ${product.name}...`);
        const { error: updateError } = await supabase
            .from('products')
            .update({ certifications: certifications })
            .eq('id', product.id);

        if (updateError) {
            console.error(`Failed to update ${product.name}:`, updateError);
        } else {
            console.log(`Successfully updated ${product.name}`);
        }
    }

    console.log('Finished updating certifications.');
}

updateCertifications().catch(err => console.error('Unhandled error:', err));
