import { NeuCard } from "@/components/ui/NeuCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TrendingUp, Clock, CheckCircle2, Target, Calendar, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

interface DailyFocusData {
  day: string;
  hours: number;
}

interface ProgressStats {
  dailyProgress: number;
  todayFocusHours: number;
  tasksCompleted: number;
  totalTasks: number;
  currentStreak: number;
  dailyHistory: DailyFocusData[];
  habitHistory?: { day: string; rate: number }[];
}

interface ProjectProgress {
  id: string;
  name: string;
  hoursSpent: number;
  totalHours: number;
  progress: number;
}

interface ProgressDashboardProps {
  stats: ProgressStats;
  projects: ProjectProgress[];
}

const ProgressDashboard = ({ stats, projects }: ProgressDashboardProps) => {
  const maxHours = Math.max(...stats.dailyHistory.map(d => d.hours), 1);

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h${m > 0 ? ` ${m}m` : ""}`;
  };

  // Data for the 24h Focus Ring
  const focusRingData = [
    { name: 'Studied', value: stats.todayFocusHours, fill: 'var(--primary)' },
    { name: 'Remaining', value: Math.max(0, 24 - stats.todayFocusHours), fill: 'rgba(128, 128, 128, 0.05)' },
  ];

  return (
    <div className="space-y-8 mt-4 pb-20">
      {/* Top Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Focus Duration Circular Chart */}
        <NeuCard className="relative flex flex-col items-center justify-center p-8 space-y-4 text-center overflow-hidden">
          <div className="absolute top-4 left-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Focus Duration</h3>
          </div>

          <div className="relative flex items-center justify-center w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={focusRingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={10}
                >
                  {focusRingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black tracking-tighter italic">{formatDuration(stats.todayFocusHours)}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Today's Focus</span>
            </div>
          </div>

          <div className="w-full flex justify-between px-4 pt-2">
            <div className="text-left">
              <span className="text-[9px] font-black uppercase text-muted-foreground block">Current streak</span>
              <span className="text-sm font-black text-foreground">{stats.currentStreak} Days</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-black uppercase text-muted-foreground block">Daily Goal</span>
              <span className="text-sm font-black text-primary">8h 00m</span>
            </div>
          </div>
        </NeuCard>

        {/* Daily Target Ring */}
        <NeuCard className="flex flex-col items-center justify-center p-8 space-y-6 text-center bg-primary/[0.02]">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Daily Quest Completion</h3>
          <div className="relative flex items-center justify-center">
            <ProgressRing
              progress={stats.dailyProgress}
              size={170}
              strokeWidth={14}
              className="text-primary"
              showPercentage={false}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black tracking-tighter italic">{stats.dailyProgress}%</span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Mastery</span>
            </div>
          </div>
          <p className="text-[11px] font-medium text-muted-foreground leading-relaxed max-w-[200px]">
            You've completed <span className="font-black text-foreground">{stats.tasksCompleted} tasks</span> out of {stats.totalTasks} planned for today.
          </p>
        </NeuCard>
      </div>

      {/* Habit Consistency */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Habit Consistency</h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Weekly quest performance</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/5 rounded-full border border-green-500/5">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-green-500">CONSISTENT</span>
          </div>
        </div>

        <NeuCard className="p-6">
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.habitHistory || []}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--muted-foreground)' }}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-2xl shadow-xl">
                          <p className="text-[10px] font-bold text-green-500 mb-1">{payload[0].value}% Completion</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRate)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </NeuCard>
      </div>

      {/* Weekly Focus Tracker (Bar Chart) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Weekly Focus Tracker</h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Comparative study hours by day</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/5 rounded-full border border-green-500/5">
            <BarChart3 className="w-3 h-3 text-green-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-green-500">ANALYTICS</span>
          </div>
        </div>

        <NeuCard className="p-6">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.dailyHistory} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--muted-foreground)' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--muted-foreground)' }}
                  tickFormatter={(v) => `${v}h`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(128,128,128,0.1)', radius: 8 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-2xl shadow-xl">
                          <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{payload[0].payload.day}</p>
                          <p className="text-lg font-black text-green-500">{payload[0].value} Focus Hours</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="hours"
                  radius={[8, 8, 8, 8]}
                  barSize={32}
                >
                  {stats.dailyHistory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.hours > (maxHours * 0.7) ? '#10b981' : 'rgba(16, 185, 129, 0.4)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </NeuCard>
      </div>

      {projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <NeuCard key={p.id} className="p-4 space-y-3">
              <h4 className="font-bold">{p.name}</h4>
              <ProgressBar progress={p.progress} />
            </NeuCard>
          ))}
        </div>
      )}
    </div>
  );
};

export { ProgressDashboard };
export type { ProgressStats, ProjectProgress, DailyFocusData };
