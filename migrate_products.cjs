
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function migrate() {
    console.log('--- MIGRATION START ---');

    const productsData = [
        {
            name: "PA Series",
            slug: "pa-series",
            price_sgd: 1200,
            image_url: "/assets/products/centrifugal_pump_industrial_1772797112000.png",
            description: "Single Stage, Back Pull-out, End-Suction Centrifugal Pump. These meet DIN 24255 specifications and are designed for commercial, industrial, and agricultural use.",
            stock_level: 50
        },
        {
            name: "PAZ Series",
            slug: "paz-series",
            price_sgd: 1350,
            image_url: "/assets/products/centrifugal_pump_industrial_1772797112000.png",
            description: "Single Stage Close Coupled Centrifugal Pump. A closed-coupled version of the PA series designed for stable performance and easy maintenance.",
            stock_level: 40
        },
        {
            name: "PS Series",
            slug: "ps-series",
            price_sgd: 15000,
            image_url: "/assets/products/split_case_pump_industrial_large_1772797208748.png",
            description: "Single Stage Double Suction Split Casing Centrifugal Pump. Available in 46 sizes, handling heads up to 656 feet and flows up to 80,000 GPM.",
            stock_level: 5
        },
        {
            name: "PV Series",
            slug: "pv-series",
            price_sgd: 2800,
            image_url: "/assets/products/vertical_multistage_pump_industrial_1772797127929.png",
            description: "Vertical Multistage Stainless Steel Pump. Used for clean water in high-rise buildings, municipal water supply, and irrigation.",
            stock_level: 25
        },
        {
            name: "PIL Series",
            slug: "pil-series",
            price_sgd: 2400,
            image_url: "/assets/products/vertical_multistage_pump_industrial_1772797127929.png",
            description: "Single Stage Close Coupled In-Line Centrifugal Pump. Compact vertical structure used for plants, mines, and city water supplies.",
            stock_level: 30
        },
        {
            name: "PM Series",
            slug: "pm-series",
            price_sgd: 3200,
            image_url: "/assets/products/centrifugal_pump_industrial_1772797112000.png",
            description: "Horizontal Multistage Stainless Steel Pump. Designed for clean water or liquids with similar characteristics, often used in boiler feed and pressure boosting.",
            stock_level: 15
        },
        {
            name: "CP Series",
            slug: "cp-series",
            price_sgd: 1800,
            image_url: "/assets/products/submersible_sewage_pump_industrial_1772797152236.png",
            description: "Submersible Sewage Pump. Specifically designed for wastewater and sewage handling.",
            stock_level: 20
        },
        {
            name: "SP Series",
            slug: "sp-series",
            price_sgd: 2100,
            image_url: "/assets/products/submersible_sewage_pump_industrial_1772797152236.png",
            description: "Non-clog Submersible Pump. Used for pumping waste, sewage, and mud with solids in civil engineering and construction.",
            stock_level: 18
        },
        {
            name: "P-ISO Series",
            slug: "p-iso-series",
            price_sgd: 1500,
            image_url: "/assets/products/centrifugal_pump_industrial_1772797112000.png",
            description: "Single Stage, Back Pull Out End Suction Centrifugal Pump. Designed according to ISO standards for various industrial applications.",
            stock_level: 35
        },
        {
            name: "4PBS Series",
            slug: "4pbs-series",
            price_sgd: 950,
            image_url: "/assets/products/submersible_sewage_pump_industrial_1772797152236.png",
            description: "Submersible Pump for 4-inch Wells. Features floating impellers and flat wear rings for superior sand handling.",
            stock_level: 60
        },
        {
            name: "VT Series",
            slug: "vt-series",
            price_sgd: 12000,
            image_url: "/assets/products/vertical_multistage_pump_industrial_1772797127929.png",
            description: "Vertical Turbine Pumps. Heavy-duty pumps available in multiple configurations (VTC, VTM, VTA, VTG) for high-pressure and high-flow applications like fire protection and marine use.",
            stock_level: 8
        },
        {
            name: "MD Series",
            slug: "md-series",
            price_sgd: 8500,
            image_url: "/assets/products/centrifugal_pump_industrial_1772797112000.png",
            description: "Multistage Centrifugal Pumps. A modular series (MDH, MDE, MDV) that allows for multi-outlet designs, often used in fire fighting to serve different pressure levels.",
            stock_level: 10
        },
        {
            name: "PEM Series",
            slug: "pem-series",
            price_sgd: 1100,
            image_url: "/assets/products/industrial_electric_motor_blue_1772797170487.png",
            description: "Electric Motors. High-efficiency, low-noise squirrel cage motors built to international IP54/IP55 standards, available for both horizontal and vertical mounting.",
            stock_level: 100
        },
        {
            name: "SPT-SPU Series",
            slug: "spt-spu-series",
            price_sgd: 3500,
            image_url: "/assets/products/self_priming_trash_pump_industrial_1772797187845.png",
            description: "Self-priming pumps typically used for handling trash and sewage.",
            stock_level: 12
        }
    ];

    // Check columns
    const { data: cols } = await supabase.from('products').select('*').limit(1);
    const hasSpecsText = cols && cols.length > 0 && ('specs_text' in cols[0]);

    // Also try to detect if we have updated_at to avoid insert failures
    const hasUpdatedAt = cols && cols.length > 0 && ('updated_at' in cols[0]);

    const finalizedProducts = productsData.map(p => {
        const { description, ...rest } = p;
        const item = {
            id: uuidv4(),
            ...rest
        };

        if (hasSpecsText) {
            item.specs_text = description;
        } else {
            item.specs_json = { description };
        }

        return item;
    });

    console.log('Clearing old products...');
    await supabase.from('products').delete().neq('slug', 'NONE');

    console.log('Inserting new products...');
    const { error: insError } = await supabase.from('products').insert(finalizedProducts);

    if (insError) {
        console.error('Insert error:', insError.message);
    } else {
        console.log('SUCCESS: All new products inserted with explicit IDs.');
    }

    console.log('--- MIGRATION END ---');
}

migrate();
