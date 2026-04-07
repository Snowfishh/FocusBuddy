import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Bell,
  ChevronRight,
  Flame,
  Star,
  CheckCircle2,
  Circle,
  Zap,
  Users,
  BookOpen,
  Trophy,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const tasks = [
  { id: 1, text: "Review lecture notes", done: true, priority: "high", tag: "Study" },
  { id: 2, text: "Take medication 💊", done: false, priority: "high", tag: "Health" },
  { id: 3, text: "Reply to group chat", done: false, priority: "medium", tag: "Social" },
  { id: 4, text: "30-min focus session", done: false, priority: "low", tag: "Focus" },
];

const moods = [
  { emoji: "😔", label: "Rough", value: 1 },
  { emoji: "😐", label: "Okay", value: 2 },
  { emoji: "🙂", label: "Good", value: 3 },
  { emoji: "😊", label: "Great", value: 4 },
  { emoji: "🤩", label: "Amazing", value: 5 },
];

const priorityColor: Record<string, string> = {
  high: "#F5A07A",
  medium: "#F5C96A",
  low: "#68C4A0",
};

const reminders = [
  { id: 1, text: "Keys & wallet check", time: "In 20 min", bg: "#EDE9FB", dot: "#9585E0" },
  { id: 2, text: "Bio assignment due", time: "Tomorrow", bg: "#E8F2FF", dot: "#6B9BD2" },
];

const quickAccess = [
  { label: "Affirmations", emoji: "✨", path: "/affirmations", bg: "#EDE9FB", color: "#9585E0" },
  { label: "Together", emoji: "🤝", path: "/collaboration", bg: "#E8F8F2", color: "#3A9E7A" },
  { label: "Resources", emoji: "📚", path: "/resources", bg: "#FFF8E1", color: "#C28B00" },
  { label: "Rewards", emoji: "🏆", path: "/gamification", bg: "#FFE4DA", color: "#C5632A" },
];

export function Home() {
  const navigate = useNavigate();
  const [checkedTasks, setCheckedTasks] = useState<number[]>([1]);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const completedCount = checkedTasks.length;
  const totalCount = tasks.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="px-4 pt-2 pb-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl overflow-hidden" style={{ border: "2.5px solid #EDE9FB" }}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] text-[#9B96B0]">Good morning ☀️</p>
            <p className="text-[17px] text-[#2D2640]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
              Hey, Jaedyn!            
            </p>
          </div>
        </div>
        <button
          className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center relative"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}
          onClick={() => navigate("/reminders")}
        >
          <Bell size={18} color="#9585E0" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#F5A07A] rounded-full" />
        </button>
      </div>

      {/* Affirmation Banner */}
      <div
        className="rounded-3xl p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #9585E0 0%, #6B9BD2 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-36 h-36 rounded-full bg-white/10"
          style={{ transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10"
          style={{ transform: "translate(-30%, 30%)" }}
        />
        <div className="relative">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Star size={12} color="rgba(255,255,255,0.8)" fill="rgba(255,255,255,0.8)" />
            <span className="text-[10px] text-white/70 uppercase tracking-widest" style={{ fontWeight: 600 }}>
              Daily Affirmation
            </span>
          </div>
          <p className="text-white text-[15px]" style={{ fontWeight: 500, lineHeight: 1.55 }}>
            "You are capable of amazing things. Every small step counts."
          </p>
          <button
            onClick={() => navigate("/affirmations")}
            className="mt-3 flex items-center gap-1 text-white/70 text-[12px]"
          >
            See more <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Mood Check-In */}
      <div className="bg-white rounded-3xl p-4" style={{ boxShadow: "0 2px 12px rgba(149,133,224,0.1)" }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[14px] text-[#2D2640]" style={{ fontWeight: 600 }}>
            How are you feeling?
          </p>
          <button
            onClick={() => navigate("/mood")}
            className="text-[12px] text-[#9585E0]"
            style={{ fontWeight: 500 }}
          >
            Track →
          </button>
        </div>
        <div className="flex items-end justify-between">
          {moods.map((m) => (
            <button
              key={m.value}
              onClick={() => setSelectedMood(m.value)}
              className="flex flex-col items-center gap-1 px-1.5 py-2 rounded-2xl transition-all duration-200"
              style={{
                background: selectedMood === m.value ? "#EDE9FB" : "transparent",
                transform: selectedMood === m.value ? "scale(1.18)" : "scale(1)",
              }}
            >
              <span className="text-[22px]">{m.emoji}</span>
              <span
                className="text-[9px]"
                style={{
                  color: selectedMood === m.value ? "#9585E0" : "#9B96B0",
                  fontWeight: selectedMood === m.value ? 700 : 400,
                }}
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Tasks */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[15px] text-[#2D2640]" style={{ fontWeight: 700 }}>
            Today's Tasks
          </p>
          <button
            onClick={() => navigate("/tasks")}
            className="text-[12px] text-[#9585E0]"
            style={{ fontWeight: 500 }}
          >
            See all →
          </button>
        </div>
        {/* Progress bar */}
        <div className="bg-white rounded-2xl p-3 mb-3" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-[#9B96B0]">{completedCount} of {totalCount} done</span>
            <span className="text-[12px] text-[#9585E0]" style={{ fontWeight: 700 }}>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#EDE9FB] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #9585E0, #6B9BD2)" }}
            />
          </div>
        </div>
        <div className="space-y-2">
          {tasks.map((task) => {
            const done = checkedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
              >
                <button
                  onClick={() =>
                    setCheckedTasks((prev) =>
                      done ? prev.filter((id) => id !== task.id) : [...prev, task.id]
                    )
                  }
                  className="flex-shrink-0"
                >
                  {done ? (
                    <CheckCircle2 size={22} color="#68C4A0" fill="#E6F7EF" />
                  ) : (
                    <Circle size={22} color="#C9C4DC" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px] truncate"
                    style={{
                      fontWeight: 500,
                      textDecoration: done ? "line-through" : "none",
                      color: done ? "#9B96B0" : "#2D2640",
                    }}
                  >
                    {task.text}
                  </p>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full mt-0.5 inline-block"
                    style={{ background: "#EDE9FB", color: "#9585E0", fontWeight: 500 }}
                  >
                    {task.tag}
                  </span>
                </div>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: priorityColor[task.priority] }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak & Points */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-3xl p-4 flex flex-col gap-1.5"
          style={{ background: "linear-gradient(135deg, #FFF0EC, #FFE4DA)" }}
        >
          <div className="flex items-center gap-1.5">
            <Flame size={18} color="#F5A07A" fill="#F5A07A" />
            <span className="text-[12px] text-[#C5632A]" style={{ fontWeight: 600 }}>Streak</span>
          </div>
          <p className="text-[28px] text-[#2D2640]" style={{ fontWeight: 800, lineHeight: 1 }}>7 🔥</p>
          <p className="text-[10px] text-[#C5632A]" style={{ fontWeight: 500 }}>Days in a row!</p>
        </div>
        <div
          className="rounded-3xl p-4 flex flex-col gap-1.5 cursor-pointer"
          style={{ background: "linear-gradient(135deg, #FFFAE6, #FFF0C8)" }}
          onClick={() => navigate("/gamification")}
        >
          <div className="flex items-center gap-1.5">
            <Zap size={18} color="#E8A800" fill="#F5C96A" />
            <span className="text-[12px] text-[#9B7A00]" style={{ fontWeight: 600 }}>Points</span>
          </div>
          <p className="text-[28px] text-[#2D2640]" style={{ fontWeight: 800, lineHeight: 1 }}>420 ⚡</p>
          <p className="text-[10px] text-[#9B7A00]" style={{ fontWeight: 500 }}>Level 4 · Achiever</p>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <p className="text-[14px] text-[#2D2640] mb-3" style={{ fontWeight: 700 }}>
          Quick Access
        </p>
        <div className="grid grid-cols-4 gap-2">
          {quickAccess.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl"
              style={{ background: item.bg }}
            >
              <span className="text-[22px]">{item.emoji}</span>
              <span className="text-[9px]" style={{ color: item.color, fontWeight: 600 }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Reminders */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[14px] text-[#2D2640]" style={{ fontWeight: 700 }}>Reminders</p>
          <button
            onClick={() => navigate("/reminders")}
            className="text-[12px] text-[#9585E0]"
            style={{ fontWeight: 500 }}
          >
            See all →
          </button>
        </div>
        <div className="space-y-2">
          {reminders.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: r.bg }}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.dot }} />
              <span className="text-[13px] text-[#2D2640] flex-1" style={{ fontWeight: 500 }}>
                {r.text}
              </span>
              <span className="text-[11px]" style={{ color: r.dot, fontWeight: 500 }}>{r.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
