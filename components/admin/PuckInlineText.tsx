"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PuckInlineTextProps {
    value: string;
    propKey: string;
    puckProps: any;
    as?: React.ElementType;
    className?: string;
    placeholder?: string;
}

export function PuckInlineText({
    value,
    propKey,
    puckProps,
    as: Tag = "span",
    className,
    placeholder = "Type here...",
}: PuckInlineTextProps) {
    const contentRef = useRef<HTMLElement>(null);
    // Track local state to prevent jumping cursor while typing
    const [localValue, setLocalValue] = useState(value);

    // We only want to be editable if we are in Puck's edit mode
    // Puck passes `puck.isEditing` down in the render props
    const isEditing = puckProps?.puck?.isEditing ?? false;

    // Sync external value when not focused
    useEffect(() => {
        if (value !== localValue) {
            setLocalValue(value);
            if (contentRef.current && document.activeElement !== contentRef.current) {
                contentRef.current.innerText = value || "";
            }
        }
    }, [value]);

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
        if (!isEditing) return;
        const newValue = e.currentTarget.innerText;

        // Update local state
        setLocalValue(newValue);

        // Call Puck's onChange to sync the new value into the block's props
        if (puckProps?.onChange && newValue !== value) {
            // Create a new props object with the updated text
            puckProps.onChange({
                ...puckProps,
                [propKey]: newValue
            });
        }
    };

    if (!isEditing) {
        return <Tag className={className}>{value || ""}</Tag>;
    }

    return (
        <Tag
            ref={contentRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className={cn(
                "transition-all outline-none min-h-[1.5em] block whitespace-pre-wrap shrink-0",
                "hover:outline-dashed hover:outline-2 hover:outline-blue-400 hover:outline-offset-4 hover:cursor-text",
                "focus:outline-solid focus:outline-2 focus:outline-blue-600 focus:outline-offset-4 focus:bg-blue-50/10 rounded-sm",
                className
            )}
            onBlur={handleBlur}
            placeholder={placeholder}
            dangerouslySetInnerHTML={{ __html: value || "" }}
        />
    );
}
