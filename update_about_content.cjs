
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const enContent = {
    "root": { "props": { "title": "About Us" } },
    "content": [
        {
            "id": "about-hero",
            "type": "Hero",
            "props": {
                "title": "Reliable Water Pump Solutions for Every Industry",
                "subtitle": "Power. Precision. Performance. ABEX delivers trusted water pump systems built to move the world’s most essential resource - water.",
                "bgImage": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
                "ctaText": "Our Solutions",
                "ctaHref": "/en/products"
            }
        },
        {
            "id": "about-background",
            "type": "ImageSplit",
            "props": {
                "title": "Our Company Background",
                "label": "ABEX Water Pump Solutions",
                "description": "At ABEX, we specialize in high-quality water pumps, submersible pumps, and industrial pumping systems that power homes, factories, and infrastructures across the region. Our solutions combine efficiency, durability, and engineering excellence, ensuring smooth water flow and dependable performance in every application.",
                "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070",
                "reverse": false,
                "theme": "light"
            }
        },
        {
            "id": "about-paragon",
            "type": "ImageSplit",
            "props": {
                "title": "Featured Brand: Paragon Pump",
                "label": "Commitment to Quality",
                "description": "One of our featured brands, Paragon Pump, represents our commitment to quality and innovation. From commercial buildings to heavy-duty industrial plants, Paragon Pump is engineered for durability and trusted for performance.\n\nABEX Water Pump Solutions",
                "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
                "reverse": true,
                "theme": "dark"
            }
        },
        {
            "id": "about-mission-text",
            "type": "TextBlock",
            "props": {
                "heading": "Our Mission",
                "content": "ABEX is a leading supplier of water pumping systems and fluid handling solutions, serving commercial, industrial, and residential clients. With years of experience and technical expertise, we provide end-to-end water management systems — from consultation and product supply to after-sales support.\n\nOur mission is to deliver reliable and energy-efficient pump solutions that help businesses and communities manage water with confidence and sustainability."
            }
        },
        {
            "id": "about-beliefs",
            "type": "FeatureGrid",
            "props": {
                "heading": "We believe in:",
                "label": "Core Values",
                "features": [
                    {
                        "icon": "Droplet",
                        "title": "Quality First",
                        "description": "Every pump meets strict performance and durability standards."
                    },
                    {
                        "icon": "Zap",
                        "title": "Innovation",
                        "description": "Working with leading global brands like Paragon Pump to offer advanced pumping technology."
                    },
                    {
                        "icon": "Settings",
                        "title": "Customer Commitment",
                        "description": "From system design to maintenance, we ensure seamless, worry-free operations."
                    }
                ]
            }
        },
        {
            "id": "about-products",
            "type": "FeatureGrid",
            "props": {
                "heading": "Our Product Range",
                "description": "ABEX offers a complete range of water pumping solutions designed to meet every need — from household water supply to complex industrial systems.\n\nEach product is carefully selected and tested to ensure consistent operation and long service life, even under demanding conditions.",
                "features": [
                    {
                        "icon": "Droplet",
                        "title": "Water Pumps",
                        "description": "For general water transfer, building systems, and agriculture."
                    },
                    {
                        "icon": "Settings",
                        "title": "Submersible Pumps",
                        "description": "For deep wells, drainage, and wastewater management."
                    },
                    {
                        "icon": "Factory",
                        "title": "Industrial Pumps",
                        "description": "For manufacturing, cooling systems, and heavy-duty fluid handling."
                    },
                    {
                        "icon": "Settings",
                        "title": "Accessories & Parts",
                        "description": "For system support and performance optimization."
                    }
                ],
                "ctaText": "View All Products",
                "ctaHref": "/en/products"
            }
        },
        {
            "id": "about-projects",
            "type": "ImageSplit",
            "props": {
                "title": "Our Projects",
                "label": "Proven Track Record",
                "description": "ABEX has completed numerous projects across Singapore, Malaysia, and Indonesia — from residential developments to large-scale industrial plants.\n\nOur portfolio includes installations for cooling systems, wastewater treatment, and commercial water distribution, all reflecting our dedication to efficiency, reliability, and long-term performance.\n\nWhether you need a custom water system, technical consultation, or product supply, ABEX is ready to help you build something that flows with confidence.",
                "image": "https://images.unsplash.com/photo-1541888941295-1e8fbc3d6221?q=80&w=2070",
                "reverse": false,
                "theme": "light",
                "ctaText": "View Our Projects",
                "ctaHref": "/en/projects"
            }
        },
        {
            "id": "about-certs",
            "type": "CompanyCertifications",
            "props": {}
        },
        {
            "id": "about-cta",
            "type": "Hero",
            "props": {
                "title": "Ready to Learn More About Our Solutions?",
                "subtitle": "Contact us today to discuss how ABEX Pumps can support your water management needs.",
                "bgImage": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
                "ctaText": "Get in Touch",
                "ctaHref": "/en/contact"
            }
        }
    ]
};

const zhContent = {
    "root": { "props": { "title": "关于我们" } },
    "content": [
        {
            "id": "about-hero-zh",
            "type": "Hero",
            "props": {
                "title": "适用于各行各业的可靠水泵解决方案",
                "subtitle": "动力。精准。性能。ABEX 提供值得信赖的水泵系统，致力于移动世界最核心的资源——水。",
                "bgImage": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
                "ctaText": "我们的解决方案",
                "ctaHref": "/zh/products"
            }
        },
        {
            "id": "about-background-zh",
            "type": "ImageSplit",
            "props": {
                "title": "公司背景",
                "label": "ABEX 水泵解决方案",
                "description": "在 ABEX，我们专注于高质量的水泵、潜水泵和工业泵系统，为整个地区的家庭、工厂和基础设施提供动力。我们的解决方案结合了效率、耐用性和卓越工程，确保在每种应用中实现顺畅的水流和可靠的性能。",
                "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070",
                "reverse": false,
                "theme": "light"
            }
        },
        {
            "id": "about-paragon-zh",
            "type": "ImageSplit",
            "props": {
                "title": "特色品牌：Paragon Pump",
                "label": "对质量的承诺",
                "description": "我们的特色品牌之一 Paragon Pump 代表了我们对质量和创新的承诺。从商业建筑到重型工业厂房，Paragon Pump 专为耐用性而设计，性能值得信赖。\n\nABEX 水泵解决方案",
                "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
                "reverse": true,
                "theme": "dark"
            }
        },
        {
            "id": "about-mission-text-zh",
            "type": "TextBlock",
            "props": {
                "heading": "我们的使命",
                "content": "ABEX 是水泵系统和流体处理解决方案的领先供应商，为商业、工业和住宅客户提供服务。凭借多年的经验和技术专专长，我们提供端到端的水管理系统 —— 从咨询和产品供应到售后支持。\n\n我们的使命是提供可靠且节能的泵解决方案，帮助企业和社区充满信心且可持续地管理水资源。"
            }
        },
        {
            "id": "about-beliefs-zh",
            "type": "FeatureGrid",
            "props": {
                "heading": "我们相信：",
                "label": "核心价值观",
                "features": [
                    {
                        "icon": "Droplet",
                        "title": "质量第一",
                        "description": "每台泵都符合严格的性能和耐用性标准。"
                    },
                    {
                        "icon": "Zap",
                        "title": "创新",
                        "description": "与 Paragon Pump 等全球领先品牌合作，提供先进的泵送技术。"
                    },
                    {
                        "icon": "Settings",
                        "title": "客户承诺",
                        "description": "从系统设计到维护，我们确保无缝、无忧的运营。"
                    }
                ]
            }
        },
        {
            "id": "about-products-zh",
            "type": "FeatureGrid",
            "props": {
                "heading": "产品范围",
                "description": "ABEX 提供全系列水泵解决方案，旨在满足各种需求 —— 从家用供水到复杂的工业系统。\n\n每件产品都经过精心选择和测试，以确保即使在苛刻的条件下也能保持一致的运行和较长的使用寿命。",
                "features": [
                    {
                        "icon": "Droplet",
                        "title": "水泵",
                        "description": "用于一般输水、建筑系统和农业。"
                    },
                    {
                        "icon": "Settings",
                        "title": "潜水泵",
                        "description": "用于深井、排水和废水管理。"
                    },
                    {
                        "icon": "Factory",
                        "title": "工业泵",
                        "description": "用于制造、冷却系统和重型流体处理。"
                    },
                    {
                        "icon": "Settings",
                        "title": "配件与零件",
                        "description": "用于系统支持和性能优化。"
                    }
                ],
                "ctaText": "查看所有产品",
                "ctaHref": "/zh/products"
            }
        },
        {
            "id": "about-projects-zh",
            "type": "ImageSplit",
            "props": {
                "title": "我们的项目",
                "label": "良好的业绩记录",
                "description": "ABEX 在新加坡、马来西亚和印度尼西亚完成了众多项目 —— 从住宅开发项目到大型工业厂房。\n\n我们的投资组合包括冷却系统、废水处理和商业配水的安装，所有这些都反映了我们对效率、可靠性和长期性能的奉献。\n\n无论您需要定制水系统、技术咨询还是产品供应，ABEX 都准备好帮助您建立充满信心的水流。",
                "image": "https://images.unsplash.com/photo-1541888941295-1e8fbc3d6221?q=80&w=2070",
                "reverse": false,
                "theme": "light",
                "ctaText": "查看我们的项目",
                "ctaHref": "/zh/projects"
            }
        },
        {
            "id": "about-certs-zh",
            "type": "CompanyCertifications",
            "props": {}
        },
        {
            "id": "about-cta-zh",
            "type": "Hero",
            "props": {
                "title": "准备好了解更多关于我们的解决方案了吗？",
                "subtitle": "立即联系我们，讨论 ABEX 泵如何支持您的水管理需求。",
                "bgImage": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
                "ctaText": "联系我们",
                "ctaHref": "/zh/contact"
            }
        }
    ]
};

async function updateAbout() {
    const { error } = await supabase
        .from('pages')
        .update({
            content_json: enContent,
            content_zh_json: zhContent
        })
        .eq('slug', 'about');

    if (error) {
        console.error('Error updating about page:', error);
    } else {
        console.log('Successfully updated About Us page (EN & ZH)');
    }
}

updateAbout();
