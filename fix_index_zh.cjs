
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fixHeroImagesAndTranslateIndex() {
    // 1. Fetch current index page
    const { data: page, error: fetchError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'index')
        .single();

    if (fetchError) {
        console.error('Error fetching index page:', fetchError);
        return;
    }

    let contentZh = page.content_zh_json || { content: [], root: {} };

    // 2. Fix image paths and Translate content
    // We'll replace the placeholders with actual translations
    const translatedBlocks = (page.content_json?.content || []).map(block => {
        const zhBlock = { ...block, id: block.id + '-zh' };

        if (block.type === 'Hero') {
            zhBlock.props = {
                ...block.props,
                title: "可靠的工业泵解决方案",
                subtitle: "动力、精准、性能。ABEX 提供值得信赖的水泵系统，致力于输送世界上最核心的资源——水。",
                ctaText: "查看产品系列",
                ctaHref: "/zh/products",
                bgImage: block.props.bgImage, // Keep original path, remove /zh/ if present
                bg_image: block.props.bg_image
            };
            if (zhBlock.props.bgImage?.startsWith('/zh/')) zhBlock.props.bgImage = zhBlock.props.bgImage.replace('/zh/', '/');
            if (zhBlock.props.bg_image?.startsWith('/zh/')) zhBlock.props.bg_image = zhBlock.props.bg_image.replace('/zh/', '/');
        } else if (block.type === 'ImageSplit') {
            if (block.props.label === 'Company Introduction') {
                zhBlock.props = {
                    ...block.props,
                    label: "公司介绍",
                    title: "专注于高品质工业泵",
                    subtitle: "ABEX PUMP & ENGINEERING 致力于提供世界级的流体管理系统。我们对我们的旗舰品牌 Paragon Pump 感到自豪，该品牌以卓越的耐用性和水力效率享誉全球。",
                    ctaText: "了解更多"
                };
            } else if (block.props.label === 'Regional Project Success') {
                zhBlock.props = {
                    ...block.props,
                    label: "区域项目成果",
                    title: "久经考验的安装记录",
                    subtitle: "从新加坡的水务设施到该地区的工业中心，ABEX 已成功部署了数千台设备。我们的项目证明了我们的工程精度和区域物流能力。",
                    ctaText: "查看我们的项目"
                };
            }
        } else if (block.type === 'FeatureGrid') {
            zhBlock.props = {
                ...block.props,
                title: "为何选择 ABEX 实现流体卓越",
                features: (block.props.features || []).map(f => {
                    if (f.title === 'Global Brands') return { ...f, title: "全球品牌", description: "Paragon、American Marsh 等领先制造商的授权经销商。" };
                    if (f.title === 'Technical Expertise') return { ...f, title: "技术专长", description: "内部工程团队能够进行复杂的计算和系统设计。" };
                    if (f.title === 'After-Sales Support') return { ...f, title: "售后支持", description: "全面的维护计划和快速的备件供应。" };
                    return f;
                })
            };
        }
        return zhBlock;
    });

    contentZh.content = translatedBlocks;

    // 3. Update database
    const { error: updateError } = await supabase
        .from('pages')
        .update({ content_zh_json: contentZh, title_zh: "首页" })
        .eq('id', page.id);

    if (updateError) {
        console.error('Error updating index page:', updateError);
    } else {
        console.log('Successfully updated Index page translations and fixed image paths.');
    }
}

fixHeroImagesAndTranslateIndex();
