import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Info } from "lucide-react";

interface SystemNotificationProps {
    title: string;
    message: string;
    type?: "quest" | "level-up" | "reward" | "alert";
    onClose?: () => void;
}

export const showSystemNotification = (props: SystemNotificationProps) => {
    toast.custom((t) => (
        <div className={cn(
            "relative overflow-hidden rounded-xl border-2 border-primary bg-background/95 backdrop-blur-md p-4 shadow-[0_0_30px_rgba(0,242,255,0.2)] min-w-[300px] animate-in fade-in slide-in-from-right-10",
            props.type === "level-up" ? "border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)]" : ""
        )}>
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_2px,3px_100%] opacity-20"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                    <div className={cn(
                        "w-2 h-2 rounded-full animate-pulse",
                        props.type === "level-up" ? "bg-yellow-400" : "bg-primary"
                    )}></div>
                    <span className={cn(
                        "text-[10px] font-black uppercase tracking-[0.2em]",
                        props.type === "level-up" ? "text-yellow-400" : "text-primary"
                    )}>
                        [ SYSTEM MESSAGE ]
                    </span>
                </div>
                <h3 className="text-lg font-black italic uppercase tracking-tight text-foreground">
                    {props.title}
                </h3>
                <p className="text-sm font-medium text-muted-foreground mt-1">
                    {props.message}
                </p>
            </div>
        </div>
    ), {
        duration: 5000,
        position: "top-center",
    });
};
