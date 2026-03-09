import { Config } from "@measured/puck";
import { Droplet, Zap, Factory, Settings, ChevronRight } from "lucide-react";
import Image from "next/image";
import { PuckInlineText } from "@/components/admin/PuckInlineText";
import { CompanyCertifications } from "@/components/site/CompanyCertifications";

type Props = {
    Hero: {
        title: string;
        subtitle: string;
        bgImage?: string;
        ctaText?: string;
        ctaHref?: string;
    };
    FeatureGrid: {
        label?: string;
        heading: string;
        description?: string;
        features: { title: string; description: string; icon?: "Droplet" | "Zap" | "Factory" | "Settings" }[];
    };
    TextBlock: {
        heading: string;
        content: string;
    };
    ContactForm: {
        title: string;
        description: string;
        renderForm?: () => React.ReactNode;
    };
    ProductCatalog: {
        title: string;
        renderCatalog?: () => React.ReactNode;
    };
    ProjectTimeline: {
        title: string;
        renderTimeline?: () => React.ReactNode;
    };
    ImageSplit: {
        label?: string;
        title: string;
        description: string;
        image: string;
        reverse: boolean;
        theme: "light" | "dark";
        ctaText?: string;
        ctaHref?: string;
    };
    StatsGrid: {
        stats: { label: string; value: string }[];
    };
    BrandsGrid: {
        title: string;
        description: string;
        brands: { name: string; logo: string; description: string }[];
    };
    CompanyCertifications: {};
};

const IconMap = {
    Droplet: Droplet,
    Zap: Zap,
    Factory: Factory,
    Settings: Settings,
};

import { useTranslations } from "next-intl";

export const config: Config<Props> = {
    components: {
        Hero: {
            fields: {
                title: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Title on Canvas</div> },
                subtitle: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Subtitle on Canvas</div> },
                bgImage: { type: "text" },
                ctaText: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit CTA on Canvas</div> },
                ctaHref: { type: "text" },
            },
            render: ({ title, subtitle, bgImage, ctaText, ctaHref, puck, id }) => {
                const tCommon = useTranslations('Common');
                return (
                    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                        {bgImage && (
                            <div className="absolute inset-0 z-0 bg-slate-900">
                                <Image
                                    src={bgImage}
                                    alt=""
                                    fill
                                    priority
                                    className="object-cover opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/80" />
                            </div>
                        )}

                        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 z-10 text-left w-full">
                            <div className="max-w-4xl">
                                <PuckInlineText
                                    value={title}
                                    propKey="title"
                                    puckProps={{ title, subtitle, bgImage, ctaText, ctaHref, puck, id }}
                                    as="h1"
                                    className="text-[2.5rem] md:text-[4rem] font-extrabold tracking-tight text-white mb-8 leading-tight font-heading"
                                />

                                {subtitle && (
                                    <PuckInlineText
                                        value={subtitle}
                                        propKey="subtitle"
                                        puckProps={{ title, subtitle, bgImage, ctaText, ctaHref, puck, id }}
                                        as="p"
                                        className="text-[1.1rem] md:text-[1.3rem] font-medium text-white/90 mb-12 leading-relaxed max-w-2xl font-sans"
                                    />
                                )}

                                {ctaText && (
                                    <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
                                        <a
                                            href={ctaHref || "#"}
                                            className="h-12 inline-flex items-center px-8 bg-[#FF7E1A] text-white font-medium text-[0.9rem] rounded hover:opacity-90 transition-all duration-300 shadow-lg min-w-[180px] justify-center"
                                            onClick={(e) => { if (puck.isEditing) e.preventDefault(); }}
                                        >
                                            <PuckInlineText
                                                value={ctaText}
                                                propKey="ctaText"
                                                puckProps={{ title, subtitle, bgImage, ctaText, ctaHref, puck, id }}
                                            />
                                            <ChevronRight className="ml-2 w-4 h-4" />
                                        </a>
                                        <button className="h-12 inline-flex items-center px-8 bg-transparent border-2 border-white text-white font-medium text-[0.9rem] rounded hover:bg-white hover:text-slate-900 transition-all duration-300 min-w-[180px] justify-center">
                                            {tCommon('EngineeringSupport')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                );
            },
        },
        TextBlock: {
            fields: {
                heading: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Heading on Canvas</div> },
                content: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Content on Canvas</div> },
            },
            render: ({ heading, content, puck, id }) => (
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        {heading && (
                            <div className="mb-10">
                                <PuckInlineText
                                    value={heading}
                                    propKey="heading"
                                    puckProps={{ heading, content, puck, id }}
                                    as="h2"
                                    className="text-3xl md:text-4xl font-bold section-heading mb-6"
                                />
                            </div>
                        )}
                        <PuckInlineText
                            value={content}
                            propKey="content"
                            puckProps={{ heading, content, puck, id }}
                            as="div"
                            className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap font-sans opacity-90"
                        />
                    </div>
                </section>
            ),
        },
        FeatureGrid: {
            fields: {
                label: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Label on Canvas</div> },
                heading: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Heading on Canvas</div> },
                description: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Description on Canvas</div> },
                features: {
                    type: "array",
                    arrayFields: {
                        title: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Title on Canvas</div> },
                        description: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Description on Canvas</div> },
                        icon: {
                            type: "radio", options: [
                                { label: "Water", value: "Droplet" },
                                { label: "Power", value: "Zap" },
                                { label: "Industry", value: "Factory" },
                                { label: "Maintenance", value: "Settings" }
                            ]
                        }
                    },
                    getItemSummary: (item) => item.title || "Feature",
                },
            },
            render: ({ label, heading, description, features, puck, id }: any) => (
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            {label && (
                                <PuckInlineText
                                    value={label}
                                    propKey="label"
                                    puckProps={{ label, heading, description, features, puck, id }}
                                    as="span"
                                    className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block"
                                />
                            )}
                            <PuckInlineText
                                value={heading}
                                propKey="heading"
                                puckProps={{ label, heading, description, features, puck, id }}
                                as="h2"
                                className="text-3xl md:text-5xl font-extrabold section-heading-center leading-tight"
                            />
                            {description && (
                                <PuckInlineText
                                    value={description}
                                    propKey="description"
                                    puckProps={{ label, heading, description, features, puck, id }}
                                    as="p"
                                    className="mt-6 text-lg md:text-xl text-slate-600 font-sans leading-relaxed opacity-95"
                                />
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(features || []).map((feat: any, i: number) => {
                                // For arrays, we need to pass a special puckProps object to PuckInlineText 
                                // that knows how to update the specific item in the array
                                const getPropsForItem = (field: string) => ({
                                    ...{ label, heading, description, features, puck, id },
                                    onChange: (updatedProps: any) => {
                                        if (updatedProps.puck?.onChange) return; // Puck Inline Text will call this
                                        const newFeatures = [...features];
                                        newFeatures[i] = { ...newFeatures[i], [field]: updatedProps[field] };
                                        puckPropsForThisItem.onChange({ ...{ label, heading, description, features, puck, id }, features: newFeatures });
                                    }
                                });
                                // Create a mock propKey/puckProps combo specifically for array mutation
                                const puckPropsForThisItem = {
                                    ...{ label, heading, description, features, puck, id },
                                    onChange: (updatedItemProps: any) => {
                                        // The inline text component will think it's updating "title" on the root object
                                        // We intercept it and update the specific item in the array instead
                                        const rootProps = { label, heading, description, features, puck, id };
                                        if (!rootProps.puck) return; // Only if we have the puck object with onChange

                                        const newFeatures = [...features];
                                        if ('title' in updatedItemProps && updatedItemProps.title !== feat.title) {
                                            newFeatures[i] = { ...newFeatures[i], title: updatedItemProps.title };
                                        }
                                        if ('description' in updatedItemProps && updatedItemProps.description !== feat.description) {
                                            newFeatures[i] = { ...newFeatures[i], description: updatedItemProps.description };
                                        }
                                        (rootProps.puck as any).onChange?.({ ...rootProps, features: newFeatures });
                                    }
                                };

                                return (
                                    <div key={`${feat.title}-${i}`} className="bg-white p-10 rounded-2xl shadow-md card-hover border border-slate-100 flex flex-col items-center text-center">
                                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-sm">
                                            {(() => {
                                                const Icon = feat.icon ? (IconMap as any)[feat.icon] : Settings;
                                                return <Icon className="w-8 h-8" />;
                                            })()}
                                        </div>
                                        <PuckInlineText
                                            value={feat.title}
                                            propKey="title"
                                            puckProps={puckPropsForThisItem}
                                            as="h3"
                                            className="text-xl md:text-2xl font-bold text-slate-800 mb-5 font-heading w-full"
                                        />
                                        <PuckInlineText
                                            value={feat.description}
                                            propKey="description"
                                            puckProps={puckPropsForThisItem}
                                            as="p"
                                            className="text-slate-600 text-base leading-relaxed font-sans opacity-95 w-full"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            ),
        },
        ContactForm: {
            fields: {
                title: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Title on Canvas</div> },
                description: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Description on Canvas</div> },
            },
            render: ({ title, description, renderForm, puck, id }) => {
                const tCommon = useTranslations('Common');
                if (renderForm) return <div key="form-container">{renderForm()}</div>;
                return (
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <PuckInlineText
                                        value={title || tCommon('ConsultExpert')}
                                        propKey="title"
                                        puckProps={{ title, description, puck, id }}
                                        as="h2"
                                        className="text-3xl md:text-4xl font-bold section-heading mb-6"
                                    />
                                    <PuckInlineText
                                        value={description}
                                        propKey="description"
                                        puckProps={{ title, description, puck, id }}
                                        as="p"
                                        className="text-lg text-slate-700 mb-10 leading-relaxed font-sans"
                                    />

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                                                <Settings className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 mb-1">{tCommon('TailoredEngineering')}</h4>
                                                <p className="text-slate-600 text-sm">{tCommon('CustomizedSolutions')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="h-14 bg-slate-50 border border-slate-200 rounded-md" />
                                            <div className="h-14 bg-slate-50 border border-slate-200 rounded-md" />
                                        </div>
                                        <div className="h-14 bg-slate-50 border border-slate-200 rounded-md" />
                                        <div className="h-32 bg-slate-50 border border-slate-200 rounded-md" />
                                        <div className="h-14 bg-primary rounded-md flex items-center justify-center text-white font-bold text-base shadow-md hover:bg-primary-dark transition-all">
                                            {tCommon('SendMessage')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            }
        },
        ProductCatalog: {
            fields: {
                title: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Title on Canvas</div> },
            },
            render: ({ title, renderCatalog, puck, id }) => {
                const t = useTranslations('ProductCatalog');
                if (renderCatalog) return <div key="catalog-container">{renderCatalog()}</div>;
                return (
                    <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
                        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                            <div className="mb-12 border-b border-white/10 pb-8 flex justify-between items-end">
                                <div>
                                    <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-3 block">{t('PremiumInventory')}</span>
                                    <PuckInlineText
                                        value={title || t('DefaultTitle')}
                                        propKey="title"
                                        puckProps={{ title, puck, id }}
                                        as="h2"
                                        className="text-3xl md:text-5xl font-bold tracking-tight font-heading"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <button className="h-12 px-6 bg-white/10 hover:bg-white/20 transition-colors rounded-md text-sm font-bold border border-white/10">
                                        {t('ViewFullCatalog')}
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-40">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={`pc-placeholder-${i}`} className="bg-white/5 rounded-2xl p-8 border border-white/10 flex flex-col items-center">
                                        <div className="w-full aspect-square bg-white/10 rounded mb-6" />
                                        <div className="h-4 bg-white/10 w-full mb-4" />
                                        <div className="h-3 bg-white/10 w-2/3" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            }
        },
        ProjectTimeline: {
            fields: {
                title: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Title on Canvas</div> },
            },
            render: ({ title, renderTimeline, puck, id }) => {
                const tCommon = useTranslations('Common');
                if (renderTimeline) return <div key="timeline-container">{renderTimeline()}</div>;
                return (
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <PuckInlineText
                                    value={title || tCommon('ProjectExcellence')}
                                    propKey="title"
                                    puckProps={{ title, puck, id }}
                                    as="h2"
                                    className="text-3xl md:text-4xl font-bold section-heading-center"
                                />
                            </div>
                            <div className="space-y-12 opacity-30">
                                {[1, 2, 3].map(i => (
                                    <div key={`pt-placeholder-${i}`} className="flex gap-12 items-center">
                                        <div className="w-20 h-20 bg-slate-100 rounded-full flex-shrink-0" />
                                        <div className="flex-1 space-y-4">
                                            <div className="h-6 bg-slate-100 w-1/4" />
                                            <div className="h-4 bg-slate-100 w-3/4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            }
        },
        ImageSplit: {
            fields: {
                label: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Label on Canvas</div> },
                title: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Title on Canvas</div> },
                description: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Description on Canvas</div> },
                image: { type: "text" },
                reverse: { type: "radio", options: [{ label: "Image Right", value: false }, { label: "Image Left", value: true }] },
                theme: { type: "radio", options: [{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }] },
                ctaText: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit CTA on Canvas</div> },
                ctaHref: { type: "text" },
            },
            render: ({ label, title, description, image, reverse, theme, ctaText, ctaHref, puck, id }) => (
                <section className={`py-20 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                            <div className={reverse ? 'lg:order-2' : ''}>
                                {label && (
                                    <PuckInlineText
                                        value={label}
                                        propKey="label"
                                        puckProps={{ label, title, description, image, reverse, theme, ctaText, ctaHref, puck, id }}
                                        as="span"
                                        className="text-primary font-bold text-xs uppercase tracking-widest mb-6 block"
                                    />
                                )}
                                <PuckInlineText
                                    value={title}
                                    propKey="title"
                                    puckProps={{ label, title, description, image, reverse, theme, ctaText, ctaHref, puck, id }}
                                    as="h2"
                                    className="text-3xl md:text-4xl font-bold section-heading mb-8"
                                />
                                <PuckInlineText
                                    value={description}
                                    propKey="description"
                                    puckProps={{ label, title, description, image, reverse, theme, ctaText, ctaHref, puck, id }}
                                    as="p"
                                    className={`text-lg leading-relaxed mb-10 font-sans opacity-95 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}
                                />
                                {ctaText && (
                                    <a
                                        href={ctaHref || "#"}
                                        className="h-12 inline-flex items-center px-8 bg-primary text-white font-bold text-sm rounded-md hover:bg-primary-dark transition-all duration-300 shadow-md"
                                        onClick={(e) => { if (puck.isEditing) e.preventDefault(); }}
                                    >
                                        <PuckInlineText
                                            value={ctaText}
                                            propKey="ctaText"
                                            puckProps={{ label, title, description, image, reverse, theme, ctaText, ctaHref, puck, id }}
                                        />
                                        <ChevronRight className="ml-2 w-4 h-4" />
                                    </a>
                                )}
                            </div>
                            <div className={`relative ${reverse ? 'lg:order-1' : ''} group px-4 w-full max-w-2xl mx-auto`}>
                                <div className="absolute inset-0 bg-blue-600/5 -rotate-3 scale-105 rounded-2xl -z-10 group-hover:rotate-0 transition-transform duration-500" />
                                <div className="aspect-video lg:aspect-[4/3] overflow-hidden rounded-2xl shadow-xl border border-slate-100 bg-slate-200">
                                    <Image
                                        src={image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000"}
                                        alt={title}
                                        fill
                                        className="object-cover transform transition-transform duration-[1500ms] group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        },
        StatsGrid: {
            fields: {
                stats: {
                    type: "array",
                    arrayFields: {
                        label: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Label on Canvas</div> },
                        value: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Value on Canvas</div> },
                    },
                }
            },
            render: ({ stats, puck, id }) => (
                <section className="bg-primary py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            {(stats || []).map((stat, idx) => {
                                const puckPropsForThisItem = {
                                    ...{ stats, puck, id },
                                    onChange: (updatedItemProps: any) => {
                                        const rootProps = { stats, puck, id };
                                        if (!rootProps.puck) return;

                                        const newStats = [...stats];
                                        if ('value' in updatedItemProps && updatedItemProps.value !== stat.value) {
                                            newStats[idx] = { ...newStats[idx], value: updatedItemProps.value };
                                        }
                                        if ('label' in updatedItemProps && updatedItemProps.label !== stat.label) {
                                            newStats[idx] = { ...newStats[idx], label: updatedItemProps.label };
                                        }
                                        (rootProps.puck as any).onChange?.({ ...rootProps, stats: newStats });
                                    }
                                };
                                return (
                                    <div key={`${stat.label}-${idx}`} className="text-center text-white">
                                        <PuckInlineText
                                            value={stat.value}
                                            propKey="value"
                                            puckProps={puckPropsForThisItem}
                                            as="div"
                                            className="text-4xl md:text-5xl font-extrabold mb-3 font-heading"
                                        />
                                        <PuckInlineText
                                            value={stat.label}
                                            propKey="label"
                                            puckProps={puckPropsForThisItem}
                                            as="div"
                                            className="text-sm font-bold text-white/80 uppercase tracking-widest font-sans"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )
        },
        BrandsGrid: {
            fields: {
                title: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Title on Canvas</div> },
                description: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Description on Canvas</div> },
                brands: {
                    type: "array",
                    arrayFields: {
                        name: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Name on Canvas</div> },
                        logo: { type: "text" },
                        description: { type: "custom", render: () => <div className="text-xs text-slate-400 p-2">Edit Description on Canvas</div> },
                    },
                    getItemSummary: (item) => item.name || "Brand",
                },
            },
            render: ({ title, description, brands, puck, id }) => {
                const tCommon = useTranslations('Common');
                return (
                    <section className="py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <PuckInlineText
                                    value={title || tCommon('OurBrands')}
                                    propKey="title"
                                    puckProps={{ title, description, brands, puck, id }}
                                    as="h2"
                                    className="text-3xl md:text-4xl font-bold section-heading-center mb-6"
                                />
                                {description && (
                                    <PuckInlineText
                                        value={description}
                                        propKey="description"
                                        puckProps={{ title, description, brands, puck, id }}
                                        as="p"
                                        className="text-lg text-slate-600 max-w-3xl mx-auto font-sans opacity-90"
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {(brands || []).map((brand, i) => {
                                    const puckPropsForThisItem = {
                                        ...{ title, description, brands, puck, id },
                                        onChange: (updatedItemProps: any) => {
                                            const rootProps = { title, description, brands, puck, id };
                                            if (!rootProps.puck) return;

                                            const newBrands = [...brands];
                                            if ('name' in updatedItemProps && updatedItemProps.name !== brand.name) {
                                                newBrands[i] = { ...newBrands[i], name: updatedItemProps.name };
                                            }
                                            if ('description' in updatedItemProps && updatedItemProps.description !== brand.description) {
                                                newBrands[i] = { ...newBrands[i], description: updatedItemProps.description };
                                            }
                                            (rootProps.puck as any).onChange?.({ ...rootProps, brands: newBrands });
                                        }
                                    };
                                    return (
                                        <div key={`${brand.name}-${i}`} className="bg-slate-50 p-10 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                                            <div className="h-24 w-full relative mb-8 grayscale group-hover:grayscale-0 transition-all duration-500 flex items-center justify-center p-4">
                                                <Image
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <PuckInlineText
                                                value={brand.name}
                                                propKey="name"
                                                puckProps={puckPropsForThisItem}
                                                as="h3"
                                                className="text-2xl font-bold text-slate-900 mb-4 font-heading"
                                            />
                                            <PuckInlineText
                                                value={brand.description}
                                                propKey="description"
                                                puckProps={puckPropsForThisItem}
                                                as="p"
                                                className="text-slate-600 text-base leading-relaxed font-sans"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                );
            },
        },
        CompanyCertifications: {
            render: () => <CompanyCertifications />
        }
    },
};
