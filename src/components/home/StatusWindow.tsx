import React from "react";
import { NeuCard } from "@/components/ui/NeuCard";
import { Progress } from "@/components/ui/progress";
import { Swords, Shield, Zap, Brain, Eye, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusWindowProps {
  level: number;
  xp: number;
  requiredXp: number;
  rank: string;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    vitality: number;
    sense: number;
  };
  title: string;
  job: string;
}

export const StatusWindow: React.FC<StatusWindowProps> = ({
  level,
  xp,
  requiredXp,
  rank,
  stats,
  title,
  job,
}) => {
  const xpPercentage = (xp / requiredXp) * 100;

  return (
    <div className="status-window-container animate-scale-in">
      <div className="relative overflow-hidden rounded-3xl border-2 border-primary/30 bg-background/80 backdrop-blur-xl p-6 shadow-[0_0_50px_rgba(0,242,255,0.15)]">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Header Section */}
        <div className="relative z-10 flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-primary italic uppercase mb-1">
              Status Window
            </h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Player: <span className="text-foreground">Yuvraj</span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-primary italic leading-none">
              LV. {level}
            </div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">
              Rank: <span className="text-primary">{rank}</span>
            </div>
          </div>
        </div>

        {/* Job and Title */}
        <div className="relative z-10 grid grid-cols-2 gap-4 mb-8">
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
            <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Title</div>
            <div className="text-sm font-bold text-foreground truncate">{title}</div>
          </div>
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
            <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Job</div>
            <div className="text-sm font-bold text-foreground truncate">{job}</div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative z-10 space-y-4">
          <StatBar icon={<Swords className="w-4 h-4" />} label="Strength" value={stats.strength} color="text-red-400" />
          <StatBar icon={<Zap className="w-4 h-4" />} label="Agility" value={stats.agility} color="text-yellow-400" />
          <StatBar icon={<Brain className="w-4 h-4" />} label="Intelligence" value={stats.intelligence} color="text-blue-400" />
          <StatBar icon={<Shield className="w-4 h-4" />} label="Vitality" value={stats.vitality} color="text-green-400" />
          <StatBar icon={<Eye className="w-4 h-4" />} label="Sense" value={stats.sense} color="text-purple-400" />
        </div>

        {/* XP Bar */}
        <div className="relative z-10 mt-8 space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span>Experience Points</span>
            <span>{Math.round(xpPercentage)}%</span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden border border-primary/20">
            <div 
              className="h-full bg-gradient-to-r from-primary to-blue-400 shadow-[0_0_10px_rgba(0,242,255,0.5)] transition-all duration-1000"
              style={{ width: `${xpPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatBarProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const StatBar: React.FC<StatBarProps> = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-3">
    <div className={cn("p-2 rounded-lg bg-background border border-primary/10", color)}>
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-end mb-1">
        <span className="text-[10px] font-bold uppercase text-muted-foreground">{label}</span>
        <span className="text-lg font-black text-foreground">{value}</span>
      </div>
      <div className="h-1 w-full bg-secondary/50 rounded-full overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-1000", color.replace('text', 'bg'))}
          style={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  </div>
);
