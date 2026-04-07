import { useState } from "react";
import { Send, CheckCircle2, Circle, UserPlus, MessageCircle, Users, Trophy } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface SharedTask {
  id: number;
  text: string;
  assignedTo: string;
  avatar: string;
  done: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string;
}

interface Message {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
  isMe: boolean;
  emoji?: string;
}

const buddies = [
  {
    name: "Jamie",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
    status: "online",
    streak: 5,
    tasks: 8,
    role: "Study Buddy",
  },
  {
    name: "Priya",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    status: "offline",
    streak: 12,
    tasks: 14,
    role: "Accountability Partner",
  },
];

const sharedTasks: SharedTask[] = [
  { id: 1, text: "Review Chapter 5 together", assignedTo: "Jamie", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40", done: true, priority: "high", dueDate: "Today" },
  { id: 2, text: "Plan group project outline", assignedTo: "Me", avatar: "", done: false, priority: "high", dueDate: "Tomorrow" },
  { id: 3, text: "Practice presentation slides", assignedTo: "Priya", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40", done: false, priority: "medium", dueDate: "Friday" },
  { id: 4, text: "Share notes from lecture", assignedTo: "Jamie", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40", done: false, priority: "low", dueDate: "This week" },
];

const initialMessages: Message[] = [
  { id: 1, author: "Jamie", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40", text: "Hey! Just finished Chapter 5 review 📚", time: "10:22 AM", isMe: false, emoji: "📚" },
  { id: 2, author: "Me", avatar: "", text: "Amazing!! I'll start on the outline now 💪", time: "10:25 AM", isMe: true },
  { id: 3, author: "Priya", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40", text: "I shared the notes in the drive! Let me know if you need anything", time: "10:28 AM", isMe: false },
  { id: 4, author: "Me", avatar: "", text: "You're both amazing, thank you! 🎉", time: "10:30 AM", isMe: true },
];

const priorityDot: Record<string, string> = {
  high: "#F5A07A",
  medium: "#F5C96A",
  low: "#68C4A0",
};

export function Collaboration() {
  const [activeTab, setActiveTab] = useState<"buddies" | "tasks" | "chat">("buddies");
  const [tasks, setTasks] = useState(sharedTasks);
  const [messages, setMessages] = useState(initialMessages);
  const [newMsg, setNewMsg] = useState("");

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "Me",
        avatar: "",
        text: newMsg,
        time: "Now",
        isMe: true,
      },
    ]);
    setNewMsg("");
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const pct = Math.round((doneCount / tasks.length) * 100);

  return (
    <div className="px-4 pt-3 pb-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] text-[#2D2640]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            Together
          </h1>
          <p className="text-[12px] text-[#9B96B0] mt-0.5">You're not alone in this 💙</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] bg-[#EDE9FB] text-[#9585E0]"
          style={{ fontWeight: 600 }}
        >
          <UserPlus size={13} /> Invite
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-4">
        {(["buddies", "tasks", "chat"] as const).map((tab) => (
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
            {tab === "buddies" ? <span className="flex items-center justify-center gap-1"><Users size={12} /> Buddies</span>
              : tab === "tasks" ? <span className="flex items-center justify-center gap-1"><CheckCircle2 size={12} /> Tasks</span>
              : <span className="flex items-center justify-center gap-1"><MessageCircle size={12} /> Chat</span>}
          </button>
        ))}
      </div>

      {/* Buddies Tab */}
      {activeTab === "buddies" && (
        <div>
          {/* Group Progress Banner */}
          <div
            className="rounded-3xl p-4 mb-4 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #9585E0, #6B9BD2)" }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10" style={{ transform: "translate(30%,-30%)" }} />
            <p className="text-white/80 text-[11px] uppercase tracking-widest mb-1">Group Progress</p>
            <p className="text-white text-[24px]" style={{ fontWeight: 700 }}>{pct}% Done Today</p>
            <div className="w-full h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Buddy Cards */}
          <div className="space-y-3">
            {buddies.map((b) => (
              <div key={b.name} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={b.avatar}
                      alt={b.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                    style={{ background: b.status === "online" ? "#68C4A0" : "#C9C4DC" }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#2D2640]" style={{ fontWeight: 600 }}>
                    {b.name}
                  </p>
                  <p className="text-[11px] text-[#9B96B0]">{b.role}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[11px] text-[#F5A07A]" style={{ fontWeight: 600 }}>
                      🔥 {b.streak} day streak
                    </span>
                    <span className="text-[11px] text-[#9B96B0]">
                      ✅ {b.tasks} tasks
                    </span>
                  </div>
                </div>
                <button
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "#EDE9FB" }}
                >
                  <MessageCircle size={16} color="#9585E0" />
                </button>
              </div>
            ))}

            {/* Invite Card */}
            <button className="w-full bg-white rounded-2xl p-4 shadow-sm border-2 border-dashed border-[#EDE9FB] flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EDE9FB] flex items-center justify-center">
                <UserPlus size={20} color="#9585E0" />
              </div>
              <div className="text-left">
                <p className="text-[13px] text-[#2D2640]" style={{ fontWeight: 600 }}>
                  Add a buddy
                </p>
                <p className="text-[11px] text-[#9B96B0]">Invite someone to keep you accountable</p>
              </div>
            </button>
          </div>

          {/* Trophy Banner */}
          <div className="mt-4 rounded-2xl p-4 flex items-center gap-3" style={{ background: "#FFFAE6" }}>
            <Trophy size={20} color="#C28B00" fill="#F5C96A" />
            <div>
              <p className="text-[12px] text-[#9B7A00]" style={{ fontWeight: 600 }}>
                Your group completed 22 tasks this week!
              </p>
              <p className="text-[11px] text-[#C28B00]">You're all crushing it together 🏆</p>
            </div>
          </div>
        </div>
      )}

      {/* Shared Tasks Tab */}
      {activeTab === "tasks" && (
        <div>
          <div className="bg-white rounded-2xl p-3 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#9B96B0]">{doneCount}/{tasks.length} tasks done</span>
              <span className="text-[12px] text-[#9585E0]" style={{ fontWeight: 600 }}>{pct}%</span>
            </div>
            <div className="w-full h-2 bg-[#EDE9FB] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #9585E0, #68C4A0)" }} />
            </div>
          </div>
          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3">
                <button onClick={() => toggleTask(task.id)}>
                  {task.done ? (
                    <CheckCircle2 size={22} color="#68C4A0" fill="#E6F7EF" />
                  ) : (
                    <Circle size={22} color="#C9C4DC" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px]"
                    style={{
                      fontWeight: 500,
                      color: task.done ? "#9B96B0" : "#2D2640",
                      textDecoration: task.done ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {task.avatar ? (
                      <div className="w-4 h-4 rounded-full overflow-hidden">
                        <ImageWithFallback src={task.avatar} alt={task.assignedTo} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-[#EDE9FB] flex items-center justify-center">
                        <span className="text-[8px] text-[#9585E0]">Me</span>
                      </div>
                    )}
                    <span className="text-[10px] text-[#9B96B0]">{task.assignedTo} · {task.dueDate}</span>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ background: priorityDot[task.priority] }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === "chat" && (
        <div className="flex flex-col" style={{ height: "calc(100% - 120px)" }}>
          <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1" style={{ scrollbarWidth: "none" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.isMe ? "flex-row-reverse" : ""}`}
              >
                {!msg.isMe && (
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                    <ImageWithFallback src={msg.avatar} alt={msg.author} className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className="max-w-[70%] px-4 py-2.5 rounded-2xl"
                  style={{
                    background: msg.isMe
                      ? "linear-gradient(135deg, #9585E0, #7B73D0)"
                      : "white",
                    borderBottomRightRadius: msg.isMe ? 4 : 16,
                    borderBottomLeftRadius: msg.isMe ? 16 : 4,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  {!msg.isMe && (
                    <p className="text-[10px] mb-0.5" style={{ color: "#9585E0", fontWeight: 600 }}>
                      {msg.author}
                    </p>
                  )}
                  <p
                    className="text-[12px]"
                    style={{ color: msg.isMe ? "white" : "#2D2640", fontWeight: 400, lineHeight: 1.4 }}
                  >
                    {msg.text}
                  </p>
                  <p
                    className="text-[9px] mt-0.5 text-right"
                    style={{ color: msg.isMe ? "rgba(255,255,255,0.6)" : "#C9C4DC" }}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-sm">
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Say something supportive..."
              className="flex-1 bg-transparent text-[13px] text-[#2D2640] outline-none placeholder:text-[#C9C4DC]"
            />
            <button
              onClick={sendMessage}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: newMsg.trim() ? "#9585E0" : "#EDE9FB" }}
            >
              <Send size={15} color={newMsg.trim() ? "white" : "#C9C4DC"} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
