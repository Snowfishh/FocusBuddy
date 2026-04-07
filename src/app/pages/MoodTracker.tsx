import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const moods = [
  { emoji: "😔", label: "Rough", value: 1, color: "#B0B0C8" },
  { emoji: "😟", label: "Low", value: 2, color: "#9585E0" },
  { emoji: "😐", label: "Okay", value: 3, color: "#6B9BD2" },
  { emoji: "🙂", label: "Good", value: 4, color: "#68C4A0" },
  { emoji: "😊", label: "Great", value: 5, color: "#F5C96A" },
];

const weekData = [
  { day: "Mon", value: 3, emoji: "😐" },
  { day: "Tue", value: 4, emoji: "🙂" },
  { day: "Wed", value: 2, emoji: "😟" },
  { day: "Thu", value: 5, emoji: "😊" },
  { day: "Fri", value: 4, emoji: "🙂" },
  { day: "Sat", value: 3, emoji: "😐" },
  { day: "Sun", value: 4, emoji: "🙂" },
];

const moodMessages: Record<number, { message: string; tip: string }> = {
  1: {
    message: "That's okay. Hard days are part of the journey. 💙",
    tip: "Try a 5-minute breathing exercise to reset.",
  },
  2: {
    message: "It's okay to not be okay. You're doing your best. 🌧️",
    tip: "A short walk or some music might help.",
  },
  3: {
    message: "Steady and moving forward — that counts! 🌤️",
    tip: "Stay hydrated and take small breaks.",
  },
  4: {
    message: "You're in a good space! Keep riding this wave. 🌈",
    tip: "Great time to tackle something you've been putting off.",
  },
  5: {
    message: "You're shining today! Channel this energy! ☀️",
    tip: "Celebrate small wins and be proud of yourself!",
  },
};

const logHistory = [
  { date: "Yesterday", mood: 4, emoji: "🙂", note: "Finished my assignment early, felt accomplished!" },
  { date: "2 days ago", mood: 2, emoji: "😟", note: "Struggled to focus, felt overwhelmed in the afternoon." },
  { date: "3 days ago", mood: 5, emoji: "😊", note: "Great study session + went for a run." },
];

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  return (
    <text x={cx} y={cy - 6} textAnchor="middle" fontSize={14}>
      {payload.emoji}
    </text>
  );
};

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [logged, setLogged] = useState(false);
  const [activeTab, setActiveTab] = useState<"log" | "history" | "trends">("log");

  const logMood = () => {
    if (!selectedMood) return;
    setLogged(true);
  };

  const moodInfo = selectedMood ? moodMessages[selectedMood] : null;

  return (
    <div className="px-4 pt-3 pb-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-[20px] text-[#2D2640]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
          Mood Tracker
        </h1>
        <p className="text-[12px] text-[#9B96B0] mt-0.5">No judgment here. Just check in. 💜</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-4">
        {(["log", "history", "trends"] as const).map((tab) => (
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
            {tab === "log" ? "📝 Log" : tab === "history" ? "📅 History" : "📈 Trends"}
          </button>
        ))}
      </div>

      {/* Log Mood Tab */}
      {activeTab === "log" && (
        <div>
          {!logged ? (
            <>
              {/* Mood Picker */}
              <div className="bg-white rounded-3xl p-5 shadow-sm mb-4">
                <p className="text-[15px] text-[#2D2640] mb-4 text-center" style={{ fontWeight: 600 }}>
                  How are you feeling right now?
                </p>
                <div className="flex items-end justify-between">
                  {moods.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setSelectedMood(m.value)}
                      className="flex flex-col items-center gap-1.5 transition-all duration-200"
                      style={{
                        transform: selectedMood === m.value ? "scale(1.25)" : "scale(1)",
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
                        style={{
                          background: selectedMood === m.value ? m.color + "25" : "#F4F1FC",
                          borderWidth: 2,
                          borderStyle: "solid",
                          borderColor: selectedMood === m.value ? m.color : "transparent",
                        }}
                      >
                        <span className="text-[24px]">{m.emoji}</span>
                      </div>
                      <span
                        className="text-[10px]"
                        style={{
                          color: selectedMood === m.value ? m.color : "#9B96B0",
                          fontWeight: selectedMood === m.value ? 700 : 400,
                        }}
                      >
                        {m.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood Message */}
              {moodInfo && (
                <div
                  className="rounded-2xl px-4 py-3.5 mb-4"
                  style={{ background: "linear-gradient(135deg, #EDE9FB, #E8F2FF)" }}
                >
                  <p className="text-[13px] text-[#2D2640]" style={{ fontWeight: 500 }}>
                    {moodInfo.message}
                  </p>
                  <p className="text-[11px] text-[#9B96B0] mt-1">💡 {moodInfo.tip}</p>
                </div>
              )}

              {/* Notes */}
              <div className="bg-white rounded-3xl p-4 shadow-sm mb-4">
                <p className="text-[13px] text-[#2D2640] mb-2" style={{ fontWeight: 600 }}>
                  Add a note{" "}
                  <span className="text-[11px] text-[#9B96B0]" style={{ fontWeight: 400 }}>
                    (optional)
                  </span>
                </p>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's on your mind? There's no right or wrong answer..."
                  rows={3}
                  className="w-full bg-[#F4F1FC] rounded-2xl px-4 py-3 text-[13px] text-[#2D2640] outline-none resize-none placeholder:text-[#C9C4DC]"
                />
              </div>

              <button
                onClick={logMood}
                disabled={!selectedMood}
                className="w-full py-3.5 rounded-2xl text-white text-[14px] transition-all duration-200"
                style={{
                  background: selectedMood
                    ? "linear-gradient(135deg, #9585E0, #6B9BD2)"
                    : "#E2DEF0",
                  color: selectedMood ? "white" : "#C9C4DC",
                  fontWeight: 600,
                }}
              >
                Log My Mood ✨
              </button>
            </>
          ) : (
            <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
              <p className="text-[48px] mb-3">
                {moods.find((m) => m.value === selectedMood)?.emoji}
              </p>
              <p className="text-[17px] text-[#2D2640]" style={{ fontWeight: 700 }}>
                Mood logged!
              </p>
              <p className="text-[13px] text-[#9B96B0] mt-1">
                Thanks for checking in. It takes courage. 💜
              </p>
              {note && (
                <div className="mt-4 bg-[#F4F1FC] rounded-2xl px-4 py-3 text-left">
                  <p className="text-[11px] text-[#9B96B0]">Your note:</p>
                  <p className="text-[13px] text-[#2D2640] mt-0.5" style={{ fontWeight: 500 }}>
                    {note}
                  </p>
                </div>
              )}
              <button
                onClick={() => { setLogged(false); setSelectedMood(null); setNote(""); }}
                className="mt-4 text-[13px] text-[#9585E0]"
                style={{ fontWeight: 500 }}
              >
                Log again →
              </button>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="space-y-3">
          {logHistory.map((entry, i) => {
            const moodInfo = moods.find((m) => m.value === entry.mood);
            return (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: (moodInfo?.color || "#9585E0") + "20" }}
                  >
                    <span className="text-[24px]">{entry.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-[#2D2640]" style={{ fontWeight: 600 }}>
                        {moodInfo?.label}
                      </p>
                      <span className="text-[11px] text-[#9B96B0]">{entry.date}</span>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <div
                          key={v}
                          className="h-1.5 flex-1 rounded-full"
                          style={{
                            background: v <= entry.mood ? (moodInfo?.color || "#9585E0") : "#EDE9FB",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {entry.note && (
                  <p className="text-[11px] text-[#9B96B0] mt-2 pl-15">{entry.note}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === "trends" && (
        <div>
          <div className="bg-white rounded-3xl p-4 shadow-sm mb-4">
            <p className="text-[14px] text-[#2D2640] mb-1" style={{ fontWeight: 600 }}>
              This Week's Mood
            </p>
            <p className="text-[11px] text-[#9B96B0] mb-4">
              Your average: 😊 3.6 — You're doing well!
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={weekData} margin={{ top: 20, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9585E0" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9585E0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#9B96B0" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis domain={[0, 5]} hide />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.[0]) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white rounded-xl px-3 py-2 shadow-md text-center">
                          <p className="text-[18px]">{d.emoji}</p>
                          <p className="text-[11px] text-[#9B96B0]">{d.day}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#9585E0"
                  strokeWidth={2.5}
                  fill="url(#moodGrad)"
                  dot={CustomDot}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Logged", value: "12", sub: "This month", emoji: "📝" },
              { label: "Best streak", value: "4 days", sub: "Logging streak", emoji: "🔥" },
              { label: "Avg mood", value: "3.6", sub: "This week", emoji: "💜" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-3 shadow-sm text-center">
                <p className="text-[18px]">{stat.emoji}</p>
                <p className="text-[15px] text-[#2D2640] mt-1" style={{ fontWeight: 700 }}>
                  {stat.value}
                </p>
                <p className="text-[10px] text-[#9B96B0]">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}