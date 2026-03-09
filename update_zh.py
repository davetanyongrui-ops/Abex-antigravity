import requests
import json

URL = "https://jkdxmcjtvzvqeeywfpul.supabase.co/rest/v1/pages"
HEADERS = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZHhtY2p0dnp2cWVleXdmcHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDA5OTksImV4cCI6MjA4ODI3Njk5OX0.2J77T1N2XPcWMW-PMPnfgecskWjcLkwmcxkU2BPnCPc",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZHhtY2p0dnp2cWVleXdmcHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDA5OTksImV4cCI6MjA4ODI3Njk5OX0.2J77T1N2XPcWMW-PMPnfgecskWjcLkwmcxkU2BPnCPc",
    "Content-Type": "application/json"
}

pages = {
    "index": {
        "root": {"props": {"title": "首页"}},
        "content": [
            {
                "id": "home-hero",
                "type": "Hero",
                "props": {
                    "title": "可靠的水泵解决方案",
                    "subtitle": "动力 • 精准 • 性能。ABEX 提供值得信赖的水泵系统，致力于输送世界上最核心的资源 —— 水。",
                    "bgImage": "/images/hero/home.webp",
                    "ctaText": "查看产品范围",
                    "ctaHref": "/zh/products"
                }
            },
            {
                "id": "home-intro",
                "type": "ImageSplit",
                "props": {
                    "label": "公司介绍",
                    "title": "专注于高质量工业泵",
                    "description": "ABEX PUMP & ENGINEERING 专注于提供世界级的流体管理系统。我们对我们的旗舰品牌 Paragon Pump 感到非常自豪，该品牌以极高的耐用性和水力效率享誉全球。我们的工程团队提供从规格说明到部署的端到端支持。",
                    "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070",
                    "ctaText": "关于我们的工程",
                    "ctaHref": "/zh/about",
                    "reverse": False,
                    "theme": "light"
                }
            },
            {
                "id": "home-features",
                "type": "FeatureGrid",
                "props": {
                    "label": "核心能力",
                    "heading": "为什么选择 ABEX?",
                    "features": [
                        {
                            "icon": "Factory",
                            "title": "授权分销",
                            "description": "该地区 Paragon Pump 和 American Marsh 的主要分销商。"
                        },
                        {
                            "icon": "Zap",
                            "title": "先进工程",
                            "description": "针对复杂的工业需求提供先进的流体动力学和液压系统设计。"
                        },
                        {
                            "icon": "Settings",
                            "title": "全生命周期支持",
                            "description": "全生命周期维护、快速备件供应和 24/7 技术援助。"
                        },
                        {
                            "icon": "Droplet",
                            "title": "认证质量",
                            "description": "ISO 9001 认证的质量控制确保每个装置都符合极高的耐用标准。"
                        }
                    ]
                }
            },
            {
                "id": "home-projects-teaser",
                "type": "ImageSplit",
                "props": {
                    "label": "区域成功",
                    "title": "良好的区域业绩记录",
                    "description": "从新加坡的水务设施到印度尼西亚和马来西亚的棕榈油厂，ABEX 已成功部署了数千台工业设备。我们的项目证明了我们精确的工程能力和区域物流能力。",
                    "image": "https://images.unsplash.com/photo-1541888941295-1e8fbc3d6221?q=80&w=2070",
                    "ctaText": "查看成功案例",
                    "ctaHref": "/zh/projects",
                    "reverse": True,
                    "theme": "dark"
                }
            }
        ]
    },
    "about": {
        "root": {"props": {"title": "关于我们"}},
        "content": [
            {
                "id": "about-hero",
                "type": "Hero",
                "props": {
                    "title": "为每个行业提供可靠的水泵解决方案",
                    "subtitle": "动力 • 精准 • 性能。ABEX 提供值得信赖的水泵系统，致力于输送世界上最核心的资源 - 水。",
                    "bgImage": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
                    "ctaText": "我们的解决方案",
                    "ctaHref": "/zh/products"
                }
            },
            {
                "id": "about-background",
                "type": "ImageSplit",
                "props": {
                    "label": "ABEX 水泵解决方案",
                    "title": "我们的公司背景",
                    "description": "在 ABEX，我们专注于高质量的水泵、潜水泵和工业泵送系统，为该地区的家庭、工厂和基础设施提供动力。我们的解决方案结合了效率、耐用性和卓越的工程技术，确保在每种应用中都能实现流畅的水流和可靠的性能。",
                    "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070",
                    "reverse": False,
                    "theme": "light"
                }
            },
            {
                "id": "about-paragon",
                "type": "ImageSplit",
                "props": {
                    "label": "对质量的承诺",
                    "title": "推荐品牌：Paragon Pump",
                    "description": "我们的推荐品牌之一 Paragon Pump 代表了我们对质量和创新的承诺。从商业建筑到重型工业工厂，Paragon Pump 的设计经久耐用，性能值得信赖。",
                    "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
                    "reverse": True,
                    "theme": "dark"
                }
            },
            {
                "id": "about-mission-text",
                "type": "TextBlock",
                "props": {
                    "heading": "我们的使命",
                    "content": "ABEX 是水泵系统和流体处理解决方案的领先供应商，服务于商业、工业和住宅客户。凭借多年的经验和技术专长，我们提供端到端的水管理系统 —— 从咨询和产品供应到售后支持。"
                }
            },
            {
                "id": "about-beliefs",
                "type": "FeatureGrid",
                "props": {
                    "label": "核心价值",
                    "heading": "我们相信：",
                    "features": [
                        {
                            "icon": "Droplet",
                            "title": "质量第一",
                            "description": "每台泵都符合严格的性能和耐用标准。"
                        },
                        {
                            "icon": "Zap",
                            "title": "创新",
                            "description": "与 Paragon Pump 等全球领先品牌合作，提供先进的泵送技术。"
                        },
                        {
                            "icon": "Settings",
                            "title": "客户承诺",
                            "description": "从系统设计到维护，我们确保无忧的操作。"
                        }
                    ]
                }
            },
            {
                "id": "about-certs",
                "type": "CompanyCertifications",
                "props": {}
            }
        ]
    }
}

for slug, content in pages.items():
    print(f"Updating {slug}...")
    resp = requests.patch(f"{URL}?slug=eq.{slug}", headers=HEADERS, json={"content_zh_json": content})
    print(f"Status: {resp.status_code}")
