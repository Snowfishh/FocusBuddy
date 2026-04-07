import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function MobileShell() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:py-8"
      style={{
        background: "linear-gradient(160deg, #2D2640 0%, #1E3A5F 55%, #1A3D2E 100%)",
        minHeight: "100dvh",
      }}
    >
      <div
        className="relative flex flex-col"
        style={{
          width: "100%",
          maxWidth: 390,
          height: "100dvh",
          maxHeight: 844,
          borderRadius: 44,
          background: "#F4F1FC",
          overflow: "hidden",
          boxShadow:
            "0 48px 96px rgba(0,0,0,0.6), 0 12px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute z-50"
          style={{
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 126,
            height: 36,
            background: "#0A0A0A",
            borderRadius: 20,
          }}
        />

        {/* Status bar */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-6 bg-[#F4F1FC] z-10 relative"
          style={{ paddingTop: 16, paddingBottom: 6 }}
        >
          <span className="text-[#2D2640] text-[12px]" style={{ fontWeight: 700 }}>
            9:41
          </span>
          {/* Spacer for Dynamic Island */}
          <div style={{ width: 130 }} />
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <div className="flex gap-[2px] items-end">
              <div className="w-[3px] h-[5px] bg-[#2D2640] rounded-[1px] opacity-40" />
              <div className="w-[3px] h-[7px] bg-[#2D2640] rounded-[1px] opacity-60" />
              <div className="w-[3px] h-[9px] bg-[#2D2640] rounded-[1px] opacity-80" />
              <div className="w-[3px] h-[11px] bg-[#2D2640] rounded-[1px]" />
            </div>
            {/* WiFi icon */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <path d="M7.5 2.2C5.3 2.2 3.3 3.1 1.8 4.6L0.2 2.9C2.2 1.1 4.7 0 7.5 0s5.3 1.1 7.3 2.9L13.2 4.6C11.7 3.1 9.7 2.2 7.5 2.2z" fill="#2D2640" opacity="0.4"/>
              <path d="M7.5 5.2c-1.5 0-2.8.6-3.8 1.5L2.2 5.2C3.6 3.9 5.5 3.1 7.5 3.1s3.9.8 5.3 2.1L11.3 6.7C10.3 5.8 9 5.2 7.5 5.2z" fill="#2D2640" opacity="0.7"/>
              <path d="M9.3 8.3L7.5 10.1 5.7 8.3C6.2 7.8 6.8 7.5 7.5 7.5s1.3.3 1.8.8z" fill="#2D2640"/>
            </svg>
            {/* Battery */}
            <div className="flex items-center gap-[1px]">
              <div
                className="rounded-[3px] border border-[#2D2640] relative flex items-center"
                style={{ width: 24, height: 12 }}
              >
                <div
                  className="absolute bg-[#2D2640] rounded-[2px]"
                  style={{ left: 2, top: 2, bottom: 2, right: 6 }}
                />
              </div>
              <div
                className="bg-[#2D2640] rounded-r-[2px]"
                style={{ width: 2, height: 5 }}
              />
            </div>
          </div>
        </div>

        {/* Page content */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          <Outlet />
        </div>

        {/* Bottom navigation */}
        <BottomNav />

        {/* Home indicator */}
        <div className="flex-shrink-0 flex justify-center py-1.5 bg-white">
          <div className="w-28 h-1 bg-[#2D2640]/15 rounded-full" />
        </div>
      </div>
    </div>
  );
}
