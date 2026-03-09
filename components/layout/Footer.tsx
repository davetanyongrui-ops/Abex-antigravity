"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAdminEdit } from "@/components/admin/AdminEditProvider";
import { InlineText } from "@/components/admin/InlineText";

export function Footer() {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Header');
    const locale = useLocale();
    const { updateChange, resolveValue } = useAdminEdit();
    const currentYear = new Date().getFullYear();
    const [layoutData, setLayoutData] = useState<any>(null);

    useEffect(() => {
        const fetchLayout = async () => {
            const { data } = await supabase
                .from('layout_content')
                .select('*')
                .eq('key', 'footer')
                .single();
            if (data) setLayoutData(data);
        };
        fetchLayout();
    }, []);

    const getLabel = (key: string, defaultValue: string) => {
        const value = resolveValue(`layout:footer:${key}`, layoutData ? (locale === 'zh' ? layoutData.content_zh_json : layoutData.content_json)?.[key] : null);

        if (value && typeof value === 'object') return value.content ?? defaultValue;
        return value || defaultValue;
    };

    const getClasses = (key: string, defaultClasses: string) => {
        const value = resolveValue(`layout:footer:${key}`, layoutData ? (locale === 'zh' ? layoutData.content_zh_json : layoutData.content_json)?.[key] : null);

        if (value && typeof value === 'object') return value.className ?? defaultClasses;
        return defaultClasses;
    };

    const handleUpdate = (key: string, data: any) => {
        updateChange(`layout:footer:${key}`, data);
    };

    return (
        <footer className="bg-[#1e293b] text-white font-sans border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">

                    {/* Column 1: Company Description */}
                    <div className="flex flex-col items-start text-left">
                        <h3 className="text-2xl font-bold font-heading mb-6 tracking-tight relative group inline-block text-white">
                            Abex Engineering
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#C0C0C0] rounded-full" />
                        </h3>
                        <p className="text-[#e9ecef] text-base leading-relaxed mb-10 max-w-sm opacity-90">
                            <InlineText
                                as="span"
                                content={getLabel('description', t('description'))}
                                onUpdate={(val) => handleUpdate('description', val)}
                            />
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="md:pl-8">
                        <h3 className="text-xl font-bold font-heading mb-8 relative group inline-block">
                            {getLabel('quickLinks', t('quickLinks'))}
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#C0C0C0] rounded-full" />
                        </h3>
                        <nav className="flex flex-col space-y-4">
                            {[
                                { label: tNav("Home"), href: "/" },
                                { label: tNav("AboutUs"), href: "/about" },
                                { label: tNav("Products"), href: "/products" },
                                { label: tNav("Projects"), href: "/projects" },
                                { label: tNav("ContactUs"), href: "/contact" },
                            ].map((link, idx) => (
                                <Link
                                    key={`${link.href}-${idx}`}
                                    href={link.href}
                                    className="text-[#e9ecef] text-base hover:text-[#C0C0C0] transition-colors duration-300 flex items-center group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#C0C0C0] mr-0 group-hover:mr-2 transition-all duration-300" />
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="lg:pl-4">
                        <h3 className="text-xl font-bold font-heading mb-8 relative group inline-block">
                            {getLabel('contactHeader', t('contactHeader'))}
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#C0C0C0] rounded-full" />
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 text-[#e9ecef]">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-base leading-relaxed pt-1">
                                    <InlineText
                                        as="div"
                                        content={getLabel('address', t('address'))}
                                        className={getClasses('address', "")}
                                        onUpdate={(data) => handleUpdate('address', data)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-[#e9ecef]">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-base leading-relaxed italic text-white flex gap-1">
                                    <InlineText
                                        as="span"
                                        content={getLabel('phone', t('phone'))}
                                        className={getClasses('phone', "")}
                                        onUpdate={(data) => handleUpdate('phone', data)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-[#e9ecef]">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-base leading-relaxed font-bold tracking-tight">
                                    <InlineText
                                        as="span"
                                        content={getLabel('email', t('email'))}
                                        className={getClasses('email', "")}
                                        onUpdate={(data) => handleUpdate('email', data)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <p className="text-sm text-[#e9ecef]/80 font-sans tracking-wide">
                        {t('copyright', { year: currentYear })}
                    </p>
                    <div className="flex space-x-8 text-xs font-medium tracking-widest uppercase">
                        <Link href="/terms" className="text-[#e9ecef]/60 hover:text-white transition-colors">{t('terms')}</Link>
                        <Link href="/privacy" className="text-[#e9ecef]/60 hover:text-white transition-colors">{t('privacy')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
