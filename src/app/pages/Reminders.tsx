import { useState } from "react";
import { Bell, CheckCircle2, Circle, Clock, AlertTriangle, RefreshCw, Plus } from "lucide-react";

interface CheckItem {
  id: number;
  text: string;
  emoji: string;
  checked: boolean;
}

interface ReminderItem {
  id: number;
  title: string;
  time: string;
  repeat: string;
  urgency: "low" | "medium" | "high";
  icon: string;
}

const initialChecklist: CheckItem[] = [
  { id: 1, text: "Keys", emoji: "🔑", checked: false },
  { id: 2, text: "Phone + charger", emoji: "📱", checked: false },
  { id: 3, text: "Wallet / card", emoji: "💳", checked: false },
  { id: 4, text: "Bag / backpack", emoji: "🎒", checked: false },
  { id: 5, text: "Water bottle", emoji: "💧", checked: false },
  { id: 6, text: "Medication", emoji: "💊", checked: false },
  { id: 7, text: "Earbuds / headphones", emoji: "🎧", checked: false },
  { id: 8, text: "Bus card / ticket", emoji: "🎫", checked: false },
];

const reminders: ReminderItem[] = [
  { id: 1, title: "Take morning medication", time: "9:00 AM", repeat: "Daily", urgency: "high", icon: "💊" },
  { id: 2, title: "Bio assignment due", time: "Tomorrow, 11:59 PM", repeat: "Once", urgency: "high", icon: "📚" },
  { id: 3, title: "Drink water reminder", time: "Every 2 hrs", repeat: "Daily", urgency: "low", icon: "💧" },
  { id: 4, title: "Group project check-in", time: "Friday, 3:00 PM", repeat: "Weekly", urgency: "medium", icon: "👥" },
  { id: 5, title: "Evening wind-down", time: "9:30 PM", repeat: "Daily", urgency: "low", icon: "🌙" },
];

const urgencyConfig = {
  high: { bg: "#FDECEA", border: "#F5A07A", text: "#C0392B", label: "Urgent", dot: "#E74C3C" },
  medium: { bg: "#FFF8E1", border: "#F5C96A", text: "#9B7A00", label: "Soon", dot: "#F5C96A" },
  low: { bg: "#E8F8F2", border: "#68C4A0", text: "#2E7D5A", label: "Chill", dot: "#68C4A0" },
};

export function Reminders() {
  const [checklist, setChecklist] = useState<CheckItem[]>(initialChecklist);
  const [activeTab, setActiveTab] = useState<"checklist" | "reminders" | "deadlines">("checklist");

  const toggleCheck = (id: number) => {
    setChecklist((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  };

  const resetChecklist = () => setChecklist((prev) => prev.map((i) => ({ ...i, checked: false })));

  const checkedCount = checklist.filter((i) => i.checked).length;
  const allChecked = checkedCount === checklist.length;

  const deadlines = reminders.filter((r) => r.urgency === "high");

  return (
    <div className="px-4 pt-3 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] text-[#2D2640]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            Reminders
          </h1>
          <p className="text-[12px] text-[#9B96B0] mt-0.5">Stay on track, one step at a time</p>
        </div>
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: "#EDE9FB" }}
        >
          <Bell size={18} color="#9585E0" />
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-4">
        {(["checklist", "reminders", "deadlines"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2 rounded-xl text-[12px] transition-all duration-200 capitalize"
            style={{
              background: activeTab === tab ? "#9585E0" : "transparent",
              color: activeTab === tab ? "white" : "#9B96B0",
              fontWeight: activeTab === tab ? 600 : 400,
            }}
          >
            {tab === "checklist" ? "🏠 Leaving" : tab === "reminders" ? "🔔 Active" : "⏰ Deadlines"}
          </button>
        ))}
      </div>

      {/* Leaving Home Checklist */}
      {activeTab === "checklist" && (
        <div>
          <div className="bg-white rounded-3xl p-4 shadow-sm mb-3">
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-[15px] text-[#2D2640]" style={{ fontWeight: 600 }}>
                  Before You Leave 🚪
                </p>
                <p className="text-[11px] text-[#9B96B0]">
                  {checkedCount} of {checklist.length} packed
                </p>
              </div>
              <button
                onClick={resetChecklist}
                className="flex items-center gap-1 text-[11px] text-[#9585E0] bg-[#EDE9FB] px-3 py-1.5 rounded-full"
              >
                <RefreshCw size={11} /> Reset
              </button>
            </div>
            <div className="w-full h-2 bg-[#EDE9FB] rounded-full overflow-hidden mt-3">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(checkedCount / checklist.length) * 100}%`,
                  background: "linear-gradient(90deg, #9585E0, #68C4A0)",
                }}
              />
            </div>
          </div>

          {allChecked && (
            <div
              className="rounded-2xl px-4 py-3 mb-3 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, #E8F8F2, #D4F0E4)" }}
            >
              <span className="text-[22px]">🎉</span>
              <p className="text-[13px] text-[#2E7D5A]" style={{ fontWeight: 600 }}>
                All packed! You're ready to go!
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center gap-2.5 transition-all duration-200 text-left"
                style={{
                  borderWidth: 1.5,
                  borderStyle: "solid",
                  borderColor: item.checked ? "#68C4A0" : "#EDE9FB",
                  background: item.checked ? "#F0FBF6" : "white",
                }}
              >
                {item.checked ? (
                  <CheckCircle2 size={20} color="#68C4A0" fill="#E0F5EC" />
                ) : (
                  <Circle size={20} color="#C9C4DC" />
                )}
                <div>
                  <p className="text-[18px] leading-none">{item.emoji}</p>
                  <p
                    className="text-[11px] mt-0.5"
                    style={{
                      color: item.checked ? "#68C4A0" : "#2D2640",
                      fontWeight: item.checked ? 600 : 500,
                      textDecoration: item.checked ? "line-through" : "none",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Reminders */}
      {activeTab === "reminders" && (
        <div className="space-y-3">
          {reminders.map((r) => {
            const cfg = urgencyConfig[r.urgency];
            return (
              <div
                key={r.id}
                className="bg-white rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3"
                style={{
                  borderLeft: `4px solid ${cfg.dot}`,
                }}
              >
                <span className="text-[22px] flex-shrink-0">{r.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#2D2640]" style={{ fontWeight: 600 }}>
                    {r.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock size={11} color="#9B96B0" />
                    <span className="text-[11px] text-[#9B96B0]">{r.time}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: "#F4F1FC", color: "#9585E0", fontWeight: 500 }}
                    >
                      {r.repeat}
                    </span>
                  </div>
                </div>
                <span
                  className="text-[10px] px-2 py-1 rounded-full flex-shrink-0"
                  style={{ background: cfg.bg, color: cfg.text, fontWeight: 600 }}
                >
                  {cfg.label}
                </span>
              </div>
            );
          })}
          <button
            className="w-full mt-2 py-3.5 rounded-2xl border-2 border-dashed border-[#EDE9FB] flex items-center justify-center gap-2 text-[13px] text-[#9585E0]"
            style={{ fontWeight: 500 }}
          >
            <Plus size={16} /> Add New Reminder
          </button>
        </div>
      )}

      {/* Deadlines */}
      {activeTab === "deadlines" && (
        <div>
          <div
            className="rounded-2xl p-4 mb-4 flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, #FDECEA, #FFE8E0)" }}
          >
            <AlertTriangle size={20} color="#C0392B" />
            <p className="text-[12px] text-[#C0392B]" style={{ fontWeight: 500 }}>
              You have{" "}
              <span style={{ fontWeight: 700 }}>{deadlines.length} urgent</span> items this week.
              You've got this! 💪
            </p>
          </div>
          <div className="space-y-3">
            {reminders.map((r) => {
              const cfg = urgencyConfig[r.urgency];
              return (
                <div
                  key={r.id}
                  className="rounded-2xl p-4 flex items-center gap-3 shadow-sm"
                  style={{ background: cfg.bg }}
                >
                  <span className="text-[24px]">{r.icon}</span>
                  <div className="flex-1">
                    <p className="text-[13px] text-[#2D2640]" style={{ fontWeight: 600 }}>
                      {r.title}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: cfg.text }}>
                      ⏰ {r.time}
                    </p>
                  </div>
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: cfg.dot }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
