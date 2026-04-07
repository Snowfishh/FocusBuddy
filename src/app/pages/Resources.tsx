import { useState } from "react";
import { Search, Play, BookOpen, Wind, Brain, Headphones, ChevronRight, Star } from "lucide-react";

interface Resource {
  id: number;
  title: string;
  type: "article" | "video" | "exercise" | "tool" | "audio";
  category: string;
  duration: string;
  description: string;
  gradient: string;
  emoji: string;
  rating: number;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "4-7-8 Breathing for Focus",
    type: "exercise",
    category: "Breathing",
    duration: "5 min",
    description: "A calming breathing technique to reduce anxiety and restore focus instantly.",
    gradient: "linear-gradient(135deg, #68C4A0, #4AB5C4)",
    emoji: "🌬️",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Understanding Your ADHD Brain",
    type: "article",
    category: "ADHD Tips",
    duration: "8 min read",
    description: "Learn how dopamine and executive function affect your daily experience.",
    gradient: "linear-gradient(135deg, #9585E0, #6B9BD2)",
    emoji: "🧠",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Pomodoro Focus Timer",
    type: "tool",
    category: "Focus",
    duration: "25 min cycles",
    description: "Work in short bursts to maximize productivity without overwhelm.",
    gradient: "linear-gradient(135deg, #F5A07A, #F5C96A)",
    emoji: "⏱️",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Body Scan Meditation",
    type: "audio",
    category: "Mindfulness",
    duration: "10 min",
    description: "Release tension and calm your nervous system with this guided audio.",
    gradient: "linear-gradient(135deg, #C4A7E7, #9585E0)",
    emoji: "🧘",
    rating: 4.9,
  },
  {
    id: 5,
    title: "ADHD Time Blindness: Real Strategies",
    type: "video",
    category: "ADHD Tips",
    duration: "12 min watch",
    description: "Practical tips to manage time blindness and meet deadlines with less stress.",
    gradient: "linear-gradient(135deg, #7ECFB6, #68C4A0)",
    emoji: "⏰",
    rating: 4.6,
  },
  {
    id: 6,
    title: "The Emotion Regulation Toolkit",
    type: "article",
    category: "Coping Skills",
    duration: "6 min read",
    description: "Practical tools for managing emotional dysregulation as an ADHDer.",
    gradient: "linear-gradient(135deg, #E8A0BF, #9585E0)",
    emoji: "💜",
    rating: 4.8,
  },
  {
    id: 7,
    title: "5-4-3-2-1 Grounding Exercise",
    type: "exercise",
    category: "Coping Skills",
    duration: "3 min",
    description: "Use your senses to anchor yourself when feeling overwhelmed or scattered.",
    gradient: "linear-gradient(135deg, #A0C4F5, #6B9BD2)",
    emoji: "🌿",
    rating: 4.9,
  },
  {
    id: 8,
    title: "Focus Music: Deep Work Playlist",
    type: "audio",
    category: "Focus",
    duration: "60 min",
    description: "Binaural beats and lo-fi music to help your brain enter deep focus mode.",
    gradient: "linear-gradient(135deg, #F5C96A, #F5A07A)",
    emoji: "🎵",
    rating: 4.7,
  },
];

const categories = ["All", "ADHD Tips", "Focus", "Breathing", "Mindfulness", "Coping Skills"];
const typeConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  article: { icon: <BookOpen size={12} />, label: "Article", color: "#9585E0" },
  video: { icon: <Play size={12} />, label: "Video", color: "#F5A07A" },
  exercise: { icon: <Wind size={12} />, label: "Exercise", color: "#68C4A0" },
  tool: { icon: <Brain size={12} />, label: "Tool", color: "#6B9BD2" },
  audio: { icon: <Headphones size={12} />, label: "Audio", color: "#E8A0BF" },
};

export function Resources() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeResource, setActiveResource] = useState<Resource | null>(null);

  const filtered = resources.filter((r) => {
    const matchCat = activeCategory === "All" || r.category === activeCategory;
    const matchSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (activeResource) {
    const tCfg = typeConfig[activeResource.type];
    return (
      <div className="px-4 pt-3 pb-6">
        <button
          onClick={() => setActiveResource(null)}
          className="flex items-center gap-1 text-[13px] text-[#9585E0] mb-4"
          style={{ fontWeight: 500 }}
        >
          ← Back to Resources
        </button>
        <div
          className="rounded-3xl p-6 relative overflow-hidden mb-5"
          style={{ background: activeResource.gradient, minHeight: 180 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10" style={{ transform: "translate(30%,-30%)" }} />
          <div className="relative">
            <span className="text-[40px]">{activeResource.emoji}</span>
            <h2 className="text-white text-[18px] mt-2" style={{ fontWeight: 700, lineHeight: 1.3 }}>
              {activeResource.title}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="text-[10px] px-2 py-1 rounded-full bg-white/20 text-white flex items-center gap-1"
                style={{ fontWeight: 600 }}
              >
                {tCfg.icon} {tCfg.label}
              </span>
              <span className="text-[10px] text-white/70">{activeResource.duration}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm mb-4">
          <p className="text-[13px] text-[#2D2640]" style={{ fontWeight: 600, lineHeight: 1.5 }}>
            About this resource
          </p>
          <p className="text-[12px] text-[#9B96B0] mt-2" style={{ lineHeight: 1.6 }}>
            {activeResource.description}
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            <Star size={14} color="#F5C96A" fill="#F5C96A" />
            <span className="text-[12px] text-[#2D2640]" style={{ fontWeight: 600 }}>{activeResource.rating}</span>
            <span className="text-[11px] text-[#9B96B0]">rating</span>
          </div>
        </div>
        <button
          className="w-full py-4 rounded-2xl text-white text-[14px] flex items-center justify-center gap-2"
          style={{ background: activeResource.gradient, fontWeight: 600 }}
        >
          {activeResource.type === "video" || activeResource.type === "audio" ? (
            <><Play size={16} fill="white" /> Start Now</>
          ) : activeResource.type === "exercise" ? (
            <><Wind size={16} /> Begin Exercise</>
          ) : activeResource.type === "tool" ? (
            <><Brain size={16} /> Open Tool</>
          ) : (
            <><BookOpen size={16} /> Read Article</>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 pt-3 pb-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-[20px] text-[#2D2640]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
          Resources
        </h1>
        <p className="text-[12px] text-[#9B96B0] mt-0.5">Tools and tips made for you 🌱</p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm mb-4">
        <Search size={16} color="#C9C4DC" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources..."
          className="flex-1 bg-transparent text-[13px] text-[#2D2640] outline-none placeholder:text-[#C9C4DC]"
        />
      </div>

      {/* Featured */}
      {!search && activeCategory === "All" && (
        <div
          className="rounded-3xl p-4 mb-4 flex items-center gap-3 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #9585E0, #68C4A0)" }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10" style={{ transform: "translate(30%,-30%)" }} />
          <span className="text-[36px]">🌬️</span>
          <div className="relative flex-1">
            <span
              className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{ fontWeight: 600 }}
            >
              Featured
            </span>
            <p className="text-white text-[14px] mt-1" style={{ fontWeight: 700 }}>
              4-7-8 Breathing for Focus
            </p>
            <p className="text-white/70 text-[11px]">5 min · Breathing exercise</p>
          </div>
          <button
            onClick={() => setActiveResource(resources[0])}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
          >
            <ChevronRight size={16} color="white" />
          </button>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] transition-all"
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

      {/* Resource Grid */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-[36px]">🔍</p>
            <p className="text-[13px] text-[#9B96B0] mt-2">No results found. Try a different search.</p>
          </div>
        )}
        {filtered.map((r) => {
          const tCfg = typeConfig[r.type];
          return (
            <button
              key={r.id}
              onClick={() => setActiveResource(r)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 text-left"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: r.gradient }}
              >
                <span className="text-[22px]">{r.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#2D2640] truncate" style={{ fontWeight: 600 }}>
                  {r.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-[10px] flex items-center gap-0.5 px-2 py-0.5 rounded-full"
                    style={{ background: tCfg.color + "18", color: tCfg.color, fontWeight: 500 }}
                  >
                    {tCfg.icon} {tCfg.label}
                  </span>
                  <span className="text-[10px] text-[#C9C4DC]">{r.duration}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className="flex items-center gap-0.5">
                  <Star size={11} color="#F5C96A" fill="#F5C96A" />
                  <span className="text-[10px] text-[#9B96B0]">{r.rating}</span>
                </div>
                <ChevronRight size={14} color="#C9C4DC" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
