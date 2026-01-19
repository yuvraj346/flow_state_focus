import React from "react";
import { cn } from "@/lib/utils";

interface NatureBackdropProps {
    className?: string;
    timeOfDay: "morning" | "afternoon" | "evening" | "all day";
}

export const NatureBackdrop: React.FC<NatureBackdropProps> = ({ className, timeOfDay }) => {
    const isNight = timeOfDay === "evening";
    const isAfternoon = timeOfDay === "afternoon";

    return (
        <div className={cn(
            "relative h-40 w-full overflow-hidden transition-all duration-700",
            isNight ? "bg-[#1a1a1a]" : isAfternoon ? "bg-orange-50/20" : "bg-primary/5",
            className
        )}>
            {/* Visual background elements */}
            <div className="absolute inset-0">
                {/* Soft clouds/mist */}
                <div className="absolute top-4 left-[10%] w-32 h-8 bg-foreground/5 blur-3xl opacity-50 rounded-full animate-float" />
                <div className="absolute top-12 left-[60%] w-40 h-10 bg-foreground/5 blur-3xl opacity-50 rounded-full animate-float" style={{ animationDelay: '1s' }} />

                {/* Hills (SVG style) */}
                <svg
                    viewBox="0 0 400 100"
                    preserveAspectRatio="none"
                    className="absolute bottom-0 w-full h-24 transition-colors duration-700"
                    style={{ fill: isNight ? '#262626' : 'currentColor', opacity: 0.15 }}
                >
                    <path d="M0 80 Q100 0 200 80 T400 80 V100 H0 Z" />
                </svg>
                <svg
                    viewBox="0 0 400 100"
                    preserveAspectRatio="none"
                    className="absolute bottom-0 w-full h-16 transition-colors duration-700"
                    style={{ fill: isNight ? '#121212' : 'currentColor', opacity: 0.2 }}
                >
                    <path d="M0 60 Q150 20 250 80 T400 60 V100 H0 Z" />
                </svg>

                {/* Birds (Simple minimalist wings) */}
                <div className="absolute top-10 left-[40%] animate-float" style={{ animationDuration: '5s' }}>
                    <BirdIcon className="text-foreground/30 rotate-12" />
                </div>
                <div className="absolute top-16 left-[45%] animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}>
                    <BirdIcon className="text-foreground/20 -rotate-12 w-3" />
                </div>

                {/* Trees */}
                <div className="absolute bottom-8 left-[15%] opacity-40">
                    <Tree color={isNight ? "text-emerald-900" : "text-emerald-500"} />
                </div>
                <div className="absolute bottom-6 right-[20%] opacity-30">
                    <Tree color={isNight ? "text-emerald-900" : "text-emerald-500"} className="scale-125" />
                </div>
            </div>
        </div>
    );
};

const BirdIcon = ({ className }: { className?: string }) => (
    <svg
        width="16"
        height="8"
        viewBox="0 0 16 8"
        fill="none"
        className={className}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
    >
        <path d="M1 5C3 1 7 1 8 5" />
        <path d="M8 5C9 1 13 1 15 5" />
    </svg>
);

const Tree = ({ color, className }: { color: string, className?: string }) => (
    <div className={cn("flex flex-col items-center", className)}>
        <div className={cn("w-6 h-6 rounded-full", color)} style={{ borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%' }} />
        <div className="w-1 h-3 bg-foreground/20 rounded-full -mt-1" />
    </div>
);
