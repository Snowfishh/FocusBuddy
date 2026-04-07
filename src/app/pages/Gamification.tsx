import { useState } from "react";
import { Flame, Zap, Trophy, Star, Lock, ChevronRight } from "lucide-react";

interface Badge {
  id: number;
  name: string;
  description: string;
  emoji: string;
  earned: boolean;
  gradient: string;
  date?: string;
}

const badges: Badge[] = [
  { id: 1, name: "First Step", description: "Complete your first task", emoji: "🌱", earned: true, gradient: "linear-gradient(135deg, #68C4A0, #4AB5C4)", date: "Jan 12" },
  { id: 2, name: "On a Roll", description: "3-day streak", emoji: "🔥", earned: true, gradient: "linear-gradient(135deg, #F5A07A, #F5C96A)", date: "Feb 3" },
  { id: 3, name: "Week Warrior", description: "7-day streak", emoji: "⚡", earned: true, gradient: "linear-gradient(135deg, #9585E0, #6B9BD2)", date: "Feb 10" },
  { id: 4, name: "Mind Reader", description: "Log mood 7 days", emoji: "💜", earned: true, gradient: "linear-gradient(135deg, #C4A7E7, #9585E0)", date: "Feb 20" },
  { id: 5, name: "Focus Master", description: "Complete 5 focus sessions", emoji: "🎯", earned: false, gradient: "linear-gradient(135deg, #9B9B9B, #B0B0B0)", },
  { id: 6, name: "Team Player", description: "Share a task with buddy", emoji: "🤝", earned: false, gradient: "linear-gradient(135deg, #9B9B9B, #B0B0B0)" },
  { id: 7, name: "Self-Care Star", description: "Complete 10 self-care tasks", emoji: "🌟", earned: false, gradient: "linear-gradient(135deg, #9B9B9B, #B0B0B0)" },
  { id: 8, name: "Legend", description: "30-day streak", emoji: "🏆", earned: false, gradient: "linear-gradient(135deg, #9B9B9B, #B0B0B0)" },
];

const milestones = [
  { title: "Getting Started", points: 0, reached: true },
  { title: "Explorer", points: 100, reached: true },
  { title: "Achiever", points: 300, reached: true },
  { title: "Champion", points: 600, reached: false },
  { title: "Legend", points: 1000, reached: false },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const streakDays = [true, true, true, false, true, true, false]; // mock streak calendar

const recentActivity = [
  { text: "Completed 4 tasks", points: "+40 pts", emoji: "✅", time: "Today" },
  { text: "7-day streak bonus!", points: "+50 pts", emoji: "🔥", time: "Yesterday" },
  { text: "Logged your mood", points: "+10 pts", emoji: "😊", time: "2 days ago" },
  { text: "Completed focus session", points: "+20 pts", emoji: "🎯", time: "3 days ago" },
];

export function Gamification() {
  const [activeTab, setActiveTab] = useState<"overview" | "badges" | "activity">("overview");

  const totalPoints = 420;
  const level = 4;
  const currentLvlPoints = 300;
  const nextLvlPoints = 600;
  const lvlPct = Math.round(((totalPoints - currentLvlPoints) / (nextLvlPoints - currentLvlPoints)) * 100);
  const earned = badges.filter((b) => b.earned).length;

  return (
    <div className="px-4 pt-3 pb-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-[20px] text-[#2D2640]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
          Your Progress
        </h1>
        <p className="text-[12px] text-[#9B96B0] mt-0.5">Every task is a win 🏆</p>
      </div>

      {/* Level Card */}
      <div
        className="rounded-3xl p-5 mb-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2D2640, #4A3F6B)" }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5" style={{ transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5" style={{ transform: "translate(-30%,30%)" }} />
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span
                className="text-[10px] px-2.5 py-1 rounded-full text-[#F5C96A] uppercase tracking-wider"
                style={{ background: "rgba(245,201,106,0.15)", fontWeight: 700 }}
              >
                Level {level} · Achiever
              </span>
              <p className="text-white text-[28px] mt-2" style={{ fontWeight: 700, lineHeight: 1 }}>
                {totalPoints}
                <span className="text-[16px] text-white/60 ml-1">pts</span>
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <span className="text-[36px]">⚡</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-white/50 mb-1.5">
            <span>Level {level}</span>
            <span>{totalPoints - currentLvlPoints} / {nextLvlPoints - currentLvlPoints} to Level {level + 1}</span>
          </div>
          <div className="w-full h-2.5 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${lvlPct}%`,
                background: "linear-gradient(90deg, #9585E0, #F5C96A)",
              }}
            />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <Flame size={16} color="#F5A07A" fill="#F5A07A" />
              <span className="text-white text-[13px]" style={{ fontWeight: 600 }}>7 day streak</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy size={16} color="#F5C96A" fill="#F5C96A" />
              <span className="text-white text-[13px]" style={{ fontWeight: 600 }}>{earned} badges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-4">
        {(["overview", "badges", "activity"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2 rounded-xl text-[12px] capitalize transition-all duration-200"
            style={{
              background: activeTab === tab ? "#9585E0" : "transparent",
              color: activeTab === tab ? "white" : "#9B96B0",
              fontWeight: activeTab === tab ? 600 : 400,
            }}
          >
            {tab === "overview" ? "📊 Overview" : tab === "badges" ? "🏅 Badges" : "📝 Activity"}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {[
              { emoji: "🔥", value: "7", label: "Day Streak", color: "#FFF0EC" },
              { emoji: "✅", value: "42", label: "Tasks Done", color: "#E8F8F2" },
              { emoji: "🏅", value: `${earned}/${badges.length}`, label: "Badges", color: "#EDE9FB" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-3 text-center"
                style={{ background: s.color }}
              >
                <p className="text-[20px]">{s.emoji}</p>
                <p className="text-[16px] text-[#2D2640] mt-0.5" style={{ fontWeight: 700 }}>
                  {s.value}
                </p>
                <p className="text-[10px] text-[#9B96B0]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Weekly Streak Calendar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <p className="text-[13px] text-[#2D2640] mb-3" style={{ fontWeight: 600 }}>
              This Week's Streak 🔥
            </p>
            <div className="flex justify-between">
              {weekDays.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-9 h-9 rounded-2xl flex items-center justify-center"
                    style={{
                      background: streakDays[i]
                        ? "linear-gradient(135deg, #9585E0, #6B9BD2)"
                        : "#F4F1FC",
                    }}
                  >
                    {streakDays[i] ? (
                      <Flame size={14} color="white" fill="white" />
                    ) : (
                      <span className="text-[10px] text-[#C9C4DC]">{day}</span>
                    )}
                  </div>
                  <span className="text-[9px] text-[#9B96B0]">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-[13px] text-[#2D2640] mb-3" style={{ fontWeight: 600 }}>
              Milestones 🎯
            </p>
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: m.reached ? "linear-gradient(135deg, #9585E0, #68C4A0)" : "#F4F1FC",
                    }}
                  >
                    {m.reached ? (
                      <Star size={14} color="white" fill="white" />
                    ) : (
                      <Lock size={12} color="#C9C4DC" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p
                        className="text-[12px]"
                        style={{
                          color: m.reached ? "#2D2640" : "#9B96B0",
                          fontWeight: m.reached ? 600 : 400,
                        }}
                      >
                        {m.title}
                      </p>
                      <span
                        className="text-[10px]"
                        style={{ color: m.reached ? "#9585E0" : "#C9C4DC", fontWeight: 600 }}
                      >
                        {m.points} pts
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F4F1FC] rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: m.reached
                            ? "100%"
                            : `${Math.min(100, (totalPoints / m.points) * 100)}%`,
                          background: m.reached
                            ? "linear-gradient(90deg, #9585E0, #68C4A0)"
                            : "#9585E0",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === "badges" && (
        <div>
          <div
            className="rounded-2xl p-3 mb-4 flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, #EDE9FB, #E8F2FF)" }}
          >
            <span className="text-[24px]">🏅</span>
            <p className="text-[12px] text-[#9B96B0]">
              You've earned{" "}
              <span className="text-[#9585E0]" style={{ fontWeight: 700 }}>
                {earned} of {badges.length} badges
              </span>
              . Keep going!
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl p-4 flex flex-col items-center text-center relative overflow-hidden"
                style={{ background: b.earned ? "white" : "#F8F7FF", boxShadow: b.earned ? "0 2px 8px rgba(0,0,0,0.07)" : "none" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2"
                  style={{
                    background: b.earned ? b.gradient : "#EFEFEF",
                  }}
                >
                  {b.earned ? (
                    <span className="text-[28px]">{b.emoji}</span>
                  ) : (
                    <Lock size={20} color="#C9C4DC" />
                  )}
                </div>
                <p
                  className="text-[12px]"
                  style={{
                    color: b.earned ? "#2D2640" : "#9B96B0",
                    fontWeight: b.earned ? 700 : 400,
                  }}
                >
                  {b.name}
                </p>
                <p className="text-[10px] text-[#9B96B0] mt-0.5">{b.description}</p>
                {b.earned && b.date && (
                  <span
                    className="text-[9px] mt-2 px-2 py-0.5 rounded-full"
                    style={{ background: "#EDE9FB", color: "#9585E0", fontWeight: 600 }}
                  >
                    ✓ {b.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === "activity" && (
        <div className="space-y-2.5">
          {recentActivity.map((a, i) => (
            <div key={i} className="bg-white rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#EDE9FB" }}
              >
                <span className="text-[20px]">{a.emoji}</span>
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-[#2D2640]" style={{ fontWeight: 500 }}>
                  {a.text}
                </p>
                <p className="text-[10px] text-[#9B96B0]">{a.time}</p>
              </div>
              <span className="text-[12px] text-[#68C4A0]" style={{ fontWeight: 700 }}>
                {a.points}
              </span>
            </div>
          ))}
          <div
            className="rounded-2xl p-4 flex items-center gap-3 mt-2"
            style={{ background: "linear-gradient(135deg, #EDE9FB, #E8F8F2)" }}
          >
            <Zap size={18} color="#9585E0" fill="#EDE9FB" />
            <p className="text-[12px] text-[#9585E0]" style={{ fontWeight: 500 }}>
              Complete more tasks to earn points and unlock new badges!
            </p>
            <ChevronRight size={14} color="#9585E0" />
          </div>
        </div>
      )}
    </div>
  );
}
