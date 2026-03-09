
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const translations = {
    about: {
        title_zh: "关于我们",
        blocks: [
            { type: "Hero", props: { title: "关于 ABEX", subtitle: "流体管理领域的卓越工程", bgImage: "/images/hero/about.webp" } },
            { type: "ImageSplit", props: { label: "我们的使命", title: "提供无与伦比的泵送解决方案", subtitle: "ABEX Pump & Engineering 建立在可靠性和技术专长的原则之上，已发展成为东南亚首屈一指的工业流体管理系统供应商。" } },
            {
                type: "FeatureGrid", props: {
                    title: "为什么选择 ABEX?", features: [
                        { title: "全球品牌", description: "Paragon、American Marsh 及其他领先品牌的授权经销商。" },
                        { title: "技术专家", description: "内部工程团队提供复杂的液压计算和系统设计。" },
                        { title: "售后支持", description: "全面的维护计划和快速的备件供应。" }
                    ]
                }
            }
        ]
    },
    products: {
        title_zh: "产品目录",
        blocks: [
            { type: "Hero", props: { title: "工业系统目录", subtitle: "浏览我们完整的高性能水泵和流体管理工程解决方案。", bgImage: "/images/hero/products.webp" } }
        ]
    },
    servicing: {
        title_zh: "维修服务",
        blocks: [
            { type: "Hero", props: { title: "专业水泵维修与保养", subtitle: "通过我们的认证工程团队，最大限度地提高 Paragon 和 Weinman 水泵的运行时间并延长其使用寿命。", bgImage: "/images/hero/servicing.webp" } }
        ]
    },
    projects: {
        title_zh: "项目案例",
        blocks: [
            { type: "Hero", props: { title: "已完成的安装项目", subtitle: "ABEX 已成功为新加坡及东南亚各地的关键任务项目提供专业的泵解决方案。", bgImage: "/images/hero/projects.webp" } }
        ]
    },
    contact: {
        title_zh: "联系我们",
        blocks: [
            { type: "Hero", props: { title: "联系我们", subtitle: "与我们的工程团队取得联系，获取专业支持。", bgImage: "/images/hero/contact.webp" } }
        ]
    }
};

async function translateAllPages() {
    for (const [slug, data] of Object.entries(translations)) {
        const { data: page, error: fetchError } = await supabase
            .from('pages')
            .select('*')
            .eq('slug', slug)
            .single();

        if (fetchError) {
            console.error(`Error fetching ${slug} page:`, fetchError);
            continue;
        }

        let contentZh = page.content_zh_json || { content: [], root: {} };
        const translatedContent = (page.content_json?.content || []).map(block => {
            const zhBlock = { ...block, id: block.id + '-zh' };

            // Apply hardcoded translations if available
            const matchingTranslation = data.blocks.find(b => b.type === block.type);
            if (matchingTranslation) {
                zhBlock.props = { ...block.props, ...matchingTranslation.props };
            }

            // Fix image paths
            if (zhBlock.props.bgImage?.startsWith('/zh/')) zhBlock.props.bgImage = zhBlock.props.bgImage.replace('/zh/', '/');
            if (zhBlock.props.bg_image?.startsWith('/zh/')) zhBlock.props.bg_image = zhBlock.props.bg_image.replace('/zh/', '/');

            return zhBlock;
        });

        contentZh.content = translatedContent;

        const { error: updateError } = await supabase
            .from('pages')
            .update({ content_zh_json: contentZh, title_zh: data.title_zh })
            .eq('id', page.id);

        if (updateError) {
            console.error(`Error updating ${slug} page:`, updateError);
        } else {
            console.log(`Successfully translated ${slug} page and fixed images.`);
        }
    }
}

translateAllPages();
