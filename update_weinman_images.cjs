const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const splitCaseUrl = "https://www.cranepumps.com/wp-content/uploads/2024/01/Website_ProductImages_0003_W-HOR-SPLIT.jpg";
    const endSuctionUrl = "https://www.cranepumps.com/wp-content/uploads/2024/01/Website_ProductImages_0001_W-End-Suction.jpg";

    const { error: err1 } = await supabase.from('products').update({ image_url: splitCaseUrl }).eq('slug', 'weinman-split-case');
    if (err1) console.error("Error updating split case:", err1);

    const { error: err2 } = await supabase.from('products').update({ image_url: endSuctionUrl }).eq('slug', 'weinman-end-suction-pumps');
    if (err2) console.error("Error updating end suction:", err2);

    console.log("Weinman images updated successfully.");
}
run();
