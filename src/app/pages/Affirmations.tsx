import { useState } from "react";
import { Heart, RefreshCw, Bookmark, Share2, ChevronLeft, ChevronRight } from "lucide-react";

interface Affirmation {
  id: number;
  text: string;
  author?: string;
  category: string;
  gradient: string;
  accent: string;
  emoji: string;
}

const affirmations: Affirmation[] = [
  {
    id: 1,
    text: "You are capable of amazing things. Every small step counts and adds up.",
    category: "Strength",
    gradient: "linear-gradient(135deg, #9585E0 0%, #6B9BD2 100%)",
    accent: "rgba(255,255,255,0.15)",
    emoji: "✨",
  },
  {
    id: 2,
    text: "Having ADHD means you think differently — and that is a superpower, not a flaw.",
    category: "Identity",
    gradient: "linear-gradient(135deg, #68C4A0 0%, #4AB5C4 100%)",
    accent: "rgba(255,255,255,0.15)",
    emoji: "🌱",
  },
  {
    id: 3,
    text: "You don't have to be perfect. Progress is enough. Rest is enough. You are enough.",
    category: "Acceptance",
    gradient: "linear-gradient(135deg, #F5A07A 0%, #F5C96A 100%)",
    accent: "rgba(255,255,255,0.15)",
    emoji: "🌸",
  },
  {
    id: 4,
    text: "Your brain is working hard every day. Give yourself credit for showing up.",
    category: "Self-Compassion",
    gradient: "linear-gradient(135deg, #C4A7E7 0%, #9585E0 100%)",
    accent: "rgba(255,255,255,0.15)",
    emoji: "💜",
  },
  {
    id: 5,
    text: "It's okay to ask for help. Seeking support is a sign of wisdom, not weakness.",
    category: "Support",
    gradient: "linear-gradient(135deg, #7ECFB6 0%, #6B9BD2 100%)",
    accent: "rgba(255,255,255,0.15)",
    emoji: "🤝",
  },
  {
    id: 6,
    text: "Each time you try again after struggling, you are building resilience. Keep going.",
    category: "Resilience",
    gradient: "linear-gradient(135deg, #F5C96A 0%, #F5A07A 100%)",
    accent: "rgba(255,255,255,0.15)",
    emoji: "🔥",
  },
  {
    id: 7,
    text: "You are worthy of love, understanding, and patience — especially from yourself.",
    category: "Self-Love",
    gradient: "linear-gradient(135deg, #E8A0BF 0%, #9585E0 100%)",
    accent: "rgba(255,255,255,0.15)",
    emoji: "💗",
  },
  {
    id: 8,
    text: "Your unique perspective brings value to the world that no one else can offer.",
    category: "Uniqueness",
    gradient: "linear-gradient(135deg, #A0C4F5 0%, #68C4A0 100%)",
    accent: "rgba(255,255,255,0.15)",
    emoji: "🌈",
  },
];

const categories = ["All", "Strength", "Identity", "Acceptance", "Self-Compassion", "Support", "Resilience", "Self-Love"];

export function Affirmations() {
  const [current, setCurrent] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);

  const filtered = affirmations.filter(
    (a) => activeCategory === "All" || a.category === activeCategory
  );

  const displayed = showFavorites
    ? affirmations.filter((a) => favorites.includes(a.id))
    : filtered;

  const clampedIdx = Math.min(current, Math.max(0, displayed.length - 1));
  const affirmation = displayed[clampedIdx];

  const next = () => setCurrent((i) => (i + 1) % displayed.length);
  const prev = () => setCurrent((i) => (i - 1 + displayed.length) % displayed.length);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const random = () => {
    const idx = Math.floor(Math.random() * displayed.length);
    setCurrent(idx);
  };

  const isFav = affirmation ? favorites.includes(affirmation.id) : false;

  return (
    <div className="px-4 pt-3 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] text-[#2D2640]" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            Affirmations
          </h1>
          <p className="text-[12px] text-[#9B96B0] mt-0.5">Kind words for a kind mind 💜</p>
        </div>
        <button
          onClick={() => { setShowFavorites(!showFavorites); setCurrent(0); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] transition-all"
          style={{
            background: showFavorites ? "#EDE9FB" : "white",
            color: showFavorites ? "#9585E0" : "#9B96B0",
            fontWeight: showFavorites ? 600 : 400,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <Heart size={13} fill={showFavorites ? "#9585E0" : "none"} color={showFavorites ? "#9585E0" : "#9B96B0"} />
          Saved ({favorites.length})
        </button>
      </div>

      {/* Category pills */}
      {!showFavorites && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrent(0); }}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] transition-all"
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
      )}

      {/* Main Card */}
      {affirmation ? (
        <div>
          <div
            className="rounded-3xl p-6 relative overflow-hidden mb-4"
            style={{
              background: affirmation.gradient,
              minHeight: 220,
            }}
          >
            {/* Decorative circles */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full"
              style={{ background: affirmation.accent, transform: "translate(30%, -30%)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-28 h-28 rounded-full"
              style={{ background: affirmation.accent, transform: "translate(-30%, 30%)" }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[24px]">{affirmation.emoji}</span>
                <span
                  className="text-[10px] px-2.5 py-1 rounded-full text-white uppercase tracking-wider"
                  style={{ background: "rgba(255,255,255,0.2)", fontWeight: 600 }}
                >
                  {affirmation.category}
                </span>
              </div>
              <p
                className="text-white text-[18px]"
                style={{ fontWeight: 500, lineHeight: 1.55 }}
              >
                "{affirmation.text}"
              </p>
              <div className="flex items-center gap-2 mt-5">
                <button onClick={prev} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ChevronLeft size={16} color="white" />
                </button>
                <div className="flex gap-1 flex-1 justify-center">
                  {displayed.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className="rounded-full transition-all"
                      style={{
                        width: i === clampedIdx ? 16 : 6,
                        height: 6,
                        background: i === clampedIdx ? "white" : "rgba(255,255,255,0.4)",
                      }}
                    />
                  ))}
                </div>
                <button onClick={next} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ChevronRight size={16} color="white" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <button
              onClick={() => toggleFavorite(affirmation.id)}
              className="bg-white rounded-2xl py-3 flex flex-col items-center gap-1 shadow-sm"
            >
              <Heart
                size={18}
                color={isFav ? "#E87070" : "#C9C4DC"}
                fill={isFav ? "#E87070" : "none"}
              />
              <span className="text-[10px]" style={{ color: isFav ? "#E87070" : "#9B96B0", fontWeight: isFav ? 600 : 400 }}>
                {isFav ? "Saved!" : "Save"}
              </span>
            </button>
            <button
              onClick={random}
              className="bg-white rounded-2xl py-3 flex flex-col items-center gap-1 shadow-sm"
            >
              <RefreshCw size={18} color="#9585E0" />
              <span className="text-[10px] text-[#9B96B0]">Random</span>
            </button>
            <button className="bg-white rounded-2xl py-3 flex flex-col items-center gap-1 shadow-sm">
              <Share2 size={18} color="#6B9BD2" />
              <span className="text-[10px] text-[#9B96B0]">Share</span>
            </button>
          </div>

          {/* Mini Cards Grid */}
          <p className="text-[13px] text-[#2D2640] mb-3" style={{ fontWeight: 600 }}>
            More for you
          </p>
          <div className="space-y-2.5">
            {displayed
              .filter((_, i) => i !== clampedIdx)
              .slice(0, 3)
              .map((a) => (
                <button
                  key={a.id}
                  onClick={() => setCurrent(displayed.findIndex((d) => d.id === a.id))}
                  className="w-full bg-white rounded-2xl p-4 shadow-sm text-left flex items-center gap-3"
                >
                  <span className="text-[22px] flex-shrink-0">{a.emoji}</span>
                  <p
                    className="text-[12px] text-[#2D2640] line-clamp-2 flex-1"
                    style={{ fontWeight: 500 }}
                  >
                    "{a.text}"
                  </p>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: "#EDE9FB", color: "#9585E0", fontWeight: 500 }}
                  >
                    {a.category}
                  </span>
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[40px] mb-3">💜</p>
          <p className="text-[14px] text-[#9B96B0]">No saved affirmations yet.</p>
          <p className="text-[12px] text-[#C9C4DC] mt-1">Tap the heart on any card to save it here.</p>
        </div>
      )}
    </div>
  );
}
