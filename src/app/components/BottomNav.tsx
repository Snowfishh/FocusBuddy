import { useNavigate, useLocation } from "react-router";
import { Home, CheckSquare, Bell, Smile, Grid3X3 } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/tasks", icon: CheckSquare, label: "Tasks" },
  { path: "/reminders", icon: Bell, label: "Reminders" },
  { path: "/mood", icon: Smile, label: "Mood" },
  { path: "/more", icon: Grid3X3, label: "More" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="flex-shrink-0 bg-white border-t border-[#EDE9FB]/80"
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = isActive(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all duration-200 relative"
              style={{
                minWidth: 56,
              }}
            >
              {active && (
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "#EDE9FB" }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <Icon
                  size={21}
                  color={active ? "#9585E0" : "#B0ADCA"}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                <span
                  className="text-[10px]"
                  style={{
                    color: active ? "#9585E0" : "#B0ADCA",
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
