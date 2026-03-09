"use client";

import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/lib/puck/config";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ClientEditor({ pageId, slug, initialData, initialZhData }: {
    pageId: string;
    slug: string;
    initialData: any;
    initialZhData: any;
}) {
    const normalizeData = (initial: any) => {
        if (!initial || typeof initial !== 'object' || !('content' in initial)) {
            return { content: [], root: {} };
        }
        // Deep copy and add IDs if missing
        const clone = JSON.parse(JSON.stringify(initial));
        if (Array.isArray(clone.content)) {
            clone.content = clone.content.map((block: any, i: number) => {
                if (!block.id) {
                    block.id = `${block.type?.toLowerCase() || 'block'}-${Date.now()}-${i}`;
                }
                return block;
            });
        }
        return clone;
    };

    const [data, setData] = useState(() => normalizeData(initialData));
    const [zhData, setZhData] = useState(() => normalizeData(initialZhData));
    const [isZh, setIsZh] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved' | 'error'>('saved');
    const [lastSavedData, setLastSavedData] = useState(data);
    const [lastSavedZhData, setLastSavedZhData] = useState(zhData);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSave = useCallback(async (currentData: any, targetLocale: 'en' | 'zh') => {
        setSaveStatus('saving');
        try {
            const payload = {
                slug,
                locale: targetLocale,
                fullData: currentData
            };
            console.log(`[Autosave] Saving ${targetLocale} content for slug: ${slug}`);

            const response = await fetch('/api/save-page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || `HTTP ${response.status}`);
            }

            setSaveStatus('saved');
            if (targetLocale === 'zh') setLastSavedZhData(JSON.parse(JSON.stringify(currentData)));
            else setLastSavedData(JSON.parse(JSON.stringify(currentData)));

            // Background revalidation happens on server
        } catch (error: any) {
            console.error("Autosave error:", error);
            setSaveStatus('error');
            toast.error(`Autosave failed: ${error.message}`);
        }
    }, [slug, router]);

    // Autosave Effect
    useEffect(() => {
        const currentData = isZh ? zhData : data;
        const lastSaved = isZh ? lastSavedZhData : lastSavedData;

        // Check if data actually changed to avoid redundant saves
        const hasChanged = JSON.stringify(currentData) !== JSON.stringify(lastSaved);

        if (hasChanged) {
            setSaveStatus('unsaved');
            const timer = setTimeout(() => {
                handleSave(currentData, isZh ? 'zh' : 'en');
            }, 1500); // 1.5s debounce

            return () => clearTimeout(timer);
        }
    }, [data, zhData, isZh, handleSave, lastSavedData, lastSavedZhData]);

    if (!isMounted) {
        return (
            <div className="h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="text-slate-400 hover:text-white">← Back</button>
                    <h1 className="font-bold">Visual Editor</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                        <div className={`w-2 h-2 rounded-full ${saveStatus === 'saving' ? 'bg-amber-500 animate-pulse' :
                            saveStatus === 'unsaved' ? 'bg-blue-400' :
                                saveStatus === 'error' ? 'bg-red-500' : 'bg-emerald-500'
                            }`} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                            {saveStatus === 'saving' ? 'Saving...' :
                                saveStatus === 'unsaved' ? 'Unsaved Changes' :
                                    saveStatus === 'error' ? 'Error Saving' : 'All Changes Saved'}
                        </span>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-1 flex">
                        <button
                            onClick={() => setIsZh(false)}
                            className={`px-3 py-1 rounded-md text-sm transition-all ${!isZh ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setIsZh(true)}
                            className={`px-3 py-1 rounded-md text-sm transition-all ${isZh ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                        >
                            Chinese
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-hidden">
                <Puck
                    config={config}
                    data={isZh ? zhData : data}
                    onChange={(newData) => {
                        if (isZh) setZhData(newData);
                        else setData(newData);
                    }}
                    headerPath="/admin/pages"
                />
            </div>
        </div>
    );
}
