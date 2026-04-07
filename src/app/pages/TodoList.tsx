import { useState } from "react";
import { CheckCircle2, Circle, Plus, Zap, Filter, Search } from "lucide-react";

type Priority = "high" | "medium" | "low";
type Category = "All" | "Today" | "Study" | "Health" | "Social" | "Focus";

interface Task {
  id: number;
  text: string;
  done: boolean;
  priority: Priority;
  tag: string;
  category: Category;
  dueTime?: string;
}

const initialTasks: Task[] = [
  { id: 1, text: "Review lecture notes for bio exam", done: true, priority: "high", tag: "Study", category: "Study", dueTime: "2:00 PM" },
  { id: 2, text: "Take morning medication 💊", done: false, priority: "high", tag: "Health", category: "Health", dueTime: "9:00 AM" },
  { id: 3, text: "30-min deep focus session", done: false, priority: "medium", tag: "Focus", category: "Focus" },
  { id: 4, text: "Reply to group project chat", done: false, priority: "medium", tag: "Social", category: "Social" },
  { id: 5, text: "Water plants 🌿", done: true, priority: "low", tag: "Today", category: "Today" },
  { id: 6, text: "Read 10 pages of assigned chapter", done: false, priority: "high", tag: "Study", category: "Study", dueTime: "6:00 PM" },
  { id: 7, text: "10-min walk outside", done: false, priority: "low", tag: "Health", category: "Health" },
  { id: 8, text: "Set out tomorrow's clothes", done: false, priority: "low", tag: "Today", category: "Today" },
];

const categories: Category[] = ["All", "Today", "Study", "Health", "Social", "Focus"];

const priorityConfig: Record<Priority, { color: string; bg: string; label: string }> = {
  high: { color: "#D85A4A", bg: "#FDECEA", label: "High" },
  medium: { color: "#C28B00", bg: "#FFF8E1", label: "Med" },
  low: { color: "#3A9E7A", bg: "#E8F8F2", label: "Low" },
};

const tagColors: Record<string, { bg: string; color: string }> = {
  Study: { bg: "#EDE9FB", color: "#7B6BD0" },
  Health: { bg: "#E8F8F2", color: "#3A9E7A" },
  Social: { bg: "#E8F2FF", color: "#4A86C4" },
  Focus: { bg: "#FFF0EC", color: "#D0704A" },
  Today: { bg: "#F0EDFF", color: "#7B6BD0" },
};

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [focusMode, setFocusMode] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const toggle = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const filtered = tasks.filter((t) => {
    if (activeCategory === "All") return true;
    return t.category === activeCategory;
  });

  const focusTasks = focusMode ? filtered.filter((t) => !t.done && t.priority === "high") : filtered;

  const done = filtered.filter((t) => t.done).length;
  const total = filtered.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const addTask = () => {
    if (!newTaskText.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newTaskText,
        done: false,
        priority: "medium",
        tag: "Today",
        category: "Today",
      },
    ]);
    setNewTaskText("");
    setShowAddTask(false);
  };

  return (
    <div className="px-4 pt-3 pb-4 relative flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] text-[#2D2640]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            My Tasks
          </h1>
          <p className="text-[12px] text-[#9B96B0] mt-0.5">
            {done} of {total} completed today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Search size={16} color="#9585E0" />
          </button>
          <button className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Filter size={16} color="#9585E0" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-3xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] text-[#9B96B0]">Daily Progress</span>
          <span className="text-[13px] text-[#9585E0]" style={{ fontWeight: 700 }}>
            {pct}%
          </span>
        </div>
        <div className="w-full h-3 bg-[#EDE9FB] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #9585E0, #6B9BD2)",
            }}
          />
        </div>
        {pct >= 50 && (
          <p className="text-[11px] text-[#68C4A0] mt-2" style={{ fontWeight: 500 }}>
            ✨ You're doing great! Keep it up!
          </p>
        )}
      </div>

      {/* Focus Mode Toggle */}
      <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: focusMode ? "#EDE9FB" : "#F4F1FC" }}
          >
            <Zap size={16} color={focusMode ? "#9585E0" : "#C9C4DC"} fill={focusMode ? "#9585E0" : "none"} />
          </div>
          <div>
            <p className="text-[13px] text-[#2D2640]" style={{ fontWeight: 600 }}>
              Focus Mode
            </p>
            <p className="text-[10px] text-[#9B96B0]">Show only high priority</p>
          </div>
        </div>
        <button
          onClick={() => setFocusMode(!focusMode)}
          className="relative w-12 h-6 rounded-full transition-all duration-300"
          style={{ background: focusMode ? "#9585E0" : "#E2DEF0" }}
        >
          <div
            className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300"
            style={{ left: focusMode ? "26px" : "2px" }}
          />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] transition-all duration-200"
            style={{
              background: activeCategory === cat ? "#9585E0" : "white",
              color: activeCategory === cat ? "white" : "#9B96B0",
              fontWeight: activeCategory === cat ? 600 : 400,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2.5 flex-1">
        {focusTasks.length === 0 && (
          <div className="text-center py-10">
            <p className="text-[40px] mb-2">🎉</p>
            <p className="text-[14px] text-[#9B96B0]">All caught up! Great work!</p>
          </div>
        )}
        {focusTasks.map((task) => {
          const pCfg = priorityConfig[task.priority];
          const tColor = tagColors[task.tag] || { bg: "#F4F1FC", color: "#9585E0" };
          return (
            <div
              key={task.id}
              className="bg-white rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3 transition-all duration-200"
              style={{ opacity: task.done ? 0.65 : 1 }}
            >
              <button onClick={() => toggle(task.id)} className="flex-shrink-0">
                {task.done ? (
                  <CheckCircle2 size={22} color="#68C4A0" fill="#E6F7EF" />
                ) : (
                  <Circle size={22} color="#C9C4DC" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[13px] text-[#2D2640]"
                  style={{
                    fontWeight: 500,
                    textDecoration: task.done ? "line-through" : "none",
                    color: task.done ? "#9B96B0" : "#2D2640",
                  }}
                >
                  {task.text}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: tColor.bg, color: tColor.color, fontWeight: 500 }}
                  >
                    {task.tag}
                  </span>
                  {task.dueTime && (
                    <span className="text-[10px] text-[#9B96B0]">⏰ {task.dueTime}</span>
                  )}
                </div>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: pCfg.bg,
                  color: pCfg.color,
                  fontWeight: 600,
                }}
              >
                {pCfg.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Add Task Overlay */}
      {showAddTask && (
        <div
          className="absolute inset-0 bg-black/20 z-40 flex items-end justify-center rounded-b-[44px]"
          onClick={() => setShowAddTask(false)}
        >
          <div
            className="bg-white w-full rounded-t-3xl p-5 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-[#E2DEF0] rounded-full mx-auto mb-4" />
            <p className="text-[15px] text-[#2D2640] mb-3" style={{ fontWeight: 600 }}>
              Add New Task
            </p>
            <input
              autoFocus
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="What do you need to do?"
              className="w-full bg-[#F4F1FC] rounded-2xl px-4 py-3 text-[14px] text-[#2D2640] outline-none placeholder:text-[#C9C4DC]"
            />
            <button
              onClick={addTask}
              className="mt-3 w-full py-3 rounded-2xl text-white text-[14px]"
              style={{ background: "linear-gradient(135deg, #9585E0, #6B9BD2)", fontWeight: 600 }}
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      {/* FAB - sticky at bottom of scroll area */}
      <div className="sticky bottom-4 flex justify-end mt-4">
        <button
          onClick={() => setShowAddTask(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: "linear-gradient(135deg, #9585E0, #6B9BD2)",
            boxShadow: "0 8px 24px rgba(149, 133, 224, 0.5)",
          }}
        >
          <Plus size={24} color="white" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}