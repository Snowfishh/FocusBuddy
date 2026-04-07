import { createBrowserRouter } from "react-router";
import { MobileShell } from "./components/MobileShell";
import { Home } from "./pages/Home";
import { TodoList } from "./pages/TodoList";
import { Reminders } from "./pages/Reminders";
import { MoodTracker } from "./pages/MoodTracker";
import { Affirmations } from "./pages/Affirmations";
import { Collaboration } from "./pages/Collaboration";
import { Resources } from "./pages/Resources";
import { Gamification } from "./pages/Gamification";
import { More } from "./pages/More";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileShell,
    children: [
      { index: true, Component: Home },
      { path: "tasks", Component: TodoList },
      { path: "reminders", Component: Reminders },
      { path: "mood", Component: MoodTracker },
      { path: "more", Component: More },
      { path: "affirmations", Component: Affirmations },
      { path: "collaboration", Component: Collaboration },
      { path: "resources", Component: Resources },
      { path: "gamification", Component: Gamification },
    ],
  },
]);
