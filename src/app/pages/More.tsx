import { useNavigate } from "react-router";
import { Bell, Heart, Users, BookOpen, Trophy, Star, ChevronRight, Settings, HelpCircle } from "lucide-react";

const features = [
  {
    path: "/reminders",
    icon: Bell,
    label: "Reminders",
    desc: "Smart checklists & alerts",
    gradient: "linear-gradient(135deg, #9585E0, #6B9BD2)",
    emoji: "🔔",
  },
  {
    path: "/affirmations",
    icon: Star,
    label: "Affirmations",
    desc: "Daily uplifting cards",
    gradient: "linear-gradient(135deg, #C4A7E7, #9585E0)",
    emoji: "✨",
  },
  {
    path: "/collaboration",
    icon: Users,
    label: "Together",
    desc: "Accountability buddies",
    gradient: "linear-gradient(135deg, #68C4A0, #4AB5C4)",
    emoji: "🤝",
  },
  {
    path: "/resources",
    icon: BookOpen,
    label: "Resources",
    desc: "ADHD tips & tools",
    gradient: "linear-gradient(135deg, #F5A07A, #F5C96A)",
    emoji: "📚",
  },
  {
    path: "/gamification",
    icon: Trophy,
    label: "Rewards",
    desc: "Badges, streaks & points",
    gradient: "linear-gradient(135deg, #F5C96A, #F5A07A)",
    emoji: "🏆",
  },
  {
    path: "/mood",
    icon: Heart,
    label: "Mood Tracker",
    desc: "Check in with yourself",
    gradient: "linear-gradient(135deg, #E8A0BF, #9585E0)",
    emoji: "💜",
  },
];

const settings = [
  { icon: Settings, label: "App Settings", desc: "Notifications, theme, preferences" },
  { icon: HelpCircle, label: "Help & Support", desc: "FAQs and contact us" },
];

export function More() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-3 pb-6">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[20px] text-[#2D2640]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
          Explore
        </h1>
        <p className="text-[12px] text-[#9B96B0] mt-0.5">All your tools in one place 🌟</p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {features.map((f) => (
          <button
            key={f.path}
            onClick={() => navigate(f.path)}
            className="relative rounded-3xl p-4 overflow-hidden text-left flex flex-col gap-2 shadow-sm"
            style={{ background: f.gradient, minHeight: 110 }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10" style={{ transform: "translate(30%,-30%)" }} />
            <span className="text-[28px] relative z-10">{f.emoji}</span>
            <div className="relative z-10">
              <p className="text-white text-[14px]" style={{ fontWeight: 700 }}>
                {f.label}
              </p>
              <p className="text-white/70 text-[10px] mt-0.5">{f.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Settings */}
      <p className="text-[13px] text-[#2D2640] mb-3" style={{ fontWeight: 600 }}>
        Settings
      </p>
      <div className="space-y-2.5">
        {settings.map((s) => (
          <button
            key={s.label}
            className="w-full bg-white rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EDE9FB] flex items-center justify-center flex-shrink-0">
              <s.icon size={18} color="#9585E0" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-[#2D2640]" style={{ fontWeight: 600 }}>
                {s.label}
              </p>
              <p className="text-[11px] text-[#9B96B0]">{s.desc}</p>
            </div>
            <ChevronRight size={16} color="#C9C4DC" />
          </button>
        ))}
      </div>

      {/* App Info */}
      <div className="mt-6 text-center">
        <p className="text-[11px] text-[#C9C4DC]">Focus Flow · Version 1.0</p>
        <p className="text-[10px] text-[#C9C4DC] mt-0.5">Made with 💜 for neurodivergent minds</p>
      </div>
    </div>
  );
}
