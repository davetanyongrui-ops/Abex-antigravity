
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const translations = {
    "PIL Series": {
        name_zh: "PIL 系列",
        description_zh: "类型：单级立式管道离心泵。\n\n特点：结构紧凑，安装方便，适用于各种民用和工业供水系统。",
        specs_zh: { "流量": "450 M3/H", "扬程": "150M", "设计": "DIN 24255" }
    },
    "P-ISO Series": {
        name_zh: "P-ISO 系列",
        description_zh: "类型：单级后拉式端吸离心泵。\n\n设计符合 ISO 2858 标准，广泛应用于工业过程及通用系统。",
        specs_zh: { "流量": "1900 M3/H", "扬程": "160M", "标准": "ISO 2858" }
    },
    "PAZ Series": {
        name_zh: "PAZ 系列",
        description_zh: "类型：单级直连式离心泵。\n\n采用 DIN 24255 设计，提供高效的流体循环解决方案。",
        specs_zh: { "流量": "450 M3/H", "扬程": "150M", "设计": "DIN 24255" }
    },
    "PS Series": {
        name_zh: "PS 系列",
        description_zh: "类型：单级双吸卧式中开离心泵。\n\n适用于大流量、高扬程的应用场景，如水厂、灌溉及工业冷却。",
        specs_zh: { "流量": "7200 M3/H", "扬程": "170M", "分体": "水平分体" }
    },
    "PV Series": {
        name_zh: "PV 系列",
        description_zh: "类型：立式多级不锈钢离心泵。\n\n采用不锈钢制造，适用于高层供水、超滤系统及轻平衡工业应用。",
        specs_zh: { "流量": "240 M3/H", "扬程": "300M", "材质": "不锈钢" }
    },
    "PM Series": {
        name_zh: "PM 系列",
        description_zh: "类型：卧式多级不锈钢离心泵。\n\n多级设计提供稳定的高压输出，紧凑耐用。",
        specs_zh: { "流量": "26 M3/H", "扬程": "60M", "应用": "通用高压" }
    },
    "CP Series": {
        name_zh: "CP 系列",
        description_zh: "类型：潜水排污泵。\n\n专为污水和废水处理设计，具备出色的抗堵塞能力。",
        specs_zh: { "流量": "400 M3/H", "扬程": "38M", "环境": "潜水" }
    },
    "SP Series": {
        name_zh: "SP 系列",
        description_zh: "类型：潜水无堵塞排污泵。\n\n适用于建筑工地、工厂及市政污水排放。",
        specs_zh: { "流量": "210 M3/H", "扬程": "40M", "特点": "无堵塞" }
    },
    "4PBS Series": {
        name_zh: "4PBS 系列",
        description_zh: "类型：4英寸深井潜水泵。\n\n采用浮动叶轮设计，具备卓越的含沙处理能力，适用于农业灌溉及家庭供水。",
        specs_zh: { "尺寸": "4英寸", "类型": "深井泵" }
    },
    "VT Series": {
        name_zh: "VT 系列",
        description_zh: "类型：立式长轴泵（涡轮泵）。\n\n重型设计，适用于消防、海洋应用及高压工业抽水。",
        specs_zh: { "配置": "VTC, VTM, VTA, VTG", "应用": "消防, 海洋" }
    },
    "PA Series": {
        name_zh: "PA 系列",
        description_zh: "类型：单级后拉式端吸离心泵。\n\n基于 DIN 24255 标准，适用于工业循环和通用水处理。",
        specs_zh: { "流量": "1300 M3/H", "扬程": "150M", "设计": "DIN 24255" }
    },
    "PEM Series": {
        name_zh: "PEM 系列",
        description_zh: "类型：电动机（电机）。\n\n高效率、低噪音的鼠笼式异步电动机，符合国际 IP54/IP55 标准。",
        specs_zh: { "标准": "IP54/IP55", "类型": "三相异步电机" }
    },
    "MD Series": {
        name_zh: "MD 系列",
        description_zh: "类型：多级离心泵。\n\n模块化设计（MDH, MDE, MDV），常用于高层消防系统，提供不同压力的多个出口。",
        specs_zh: { "模块": "MDH, MDE, MDV", "应用": "高层消防" }
    },
    "SPT-SPU Series": {
        name_zh: "SPT-SPU 系列",
        description_zh: "类型：自吸离心泵。\n\n常用于处理含有杂质、碎屑和污水的恶劣环境。",
        specs_zh: { "自吸": "是", "应用": "垃圾/污水" }
    },
    "PBS Series": {
        name_zh: "PBS 系列",
        description_zh: "类型：潜水排污泵。\n\n大流量设计，专为高强度的排污任务打造。",
        specs_zh: { "流量": "250 M3/H", "扬程": "300M", "特点": "潜水式" }
    },
    "Fire Pump Systems": {
        name_zh: "消防泵系统",
        description_zh: "专业消防系统解决方案，包含端吸泵及中开泵等多种配置，符合国际消防标准。",
        specs_zh: { "应用": "消防安全", "配置": "端吸, 中开" }
    },
    "WEINMAN SPLIT CASE": {
        name_zh: "Weinman 中开泵",
        description_zh: "重型大流量性能。L 系列单级及 LVM 立式安装泵提供卓越的水力设计与机械简洁性。",
        specs_zh: { "品牌": "Weinman", "类型": "水平分体/立式分体" }
    },
    "Weinman End Suction Pumps": {
        name_zh: "Weinman 端吸泵",
        description_zh: "高效率、通用型端吸泵。适用于商用、工业及市政 HVAC、工艺冷却及饮用水系统。",
        specs_zh: { "品牌": "Weinman", "型号": "AC, AE, AE-V 系列" }
    }
};

async function translateProductsJson() {
    const { data: products, error: fetchError } = await supabase
        .from('products')
        .select('id, name, specs_json');

    if (fetchError) {
        console.error('Error fetching products:', fetchError);
        return;
    }

    for (const product of products) {
        const trans = translations[product.name];
        if (trans) {
            console.log(`Translating: ${product.name}`);
            const updatedSpecs = {
                ...(product.specs_json || {}),
                name_zh: trans.name_zh,
                description_zh: trans.description_zh,
                specs_zh: trans.specs_zh
            };

            const { error: updateError } = await supabase
                .from('products')
                .update({ specs_json: updatedSpecs })
                .eq('id', product.id);

            if (updateError) {
                console.error(`Error updating ${product.name}:`, updateError);
            }
        } else {
            console.log(`No translation manual for: ${product.name}`);
        }
    }
    console.log('Product translations updated successfully via JSON fallback.');
}

translateProductsJson();
