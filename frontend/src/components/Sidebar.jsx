import { NavLink } from "react-router-dom";
import { LayoutDashboard, Clock, BookOpen, PenTool, Vote } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/timeline", label: "Election Timeline", icon: Clock },
  { path: "/learning", label: "Learning Modules", icon: BookOpen },
  { path: "/quiz", label: "Quiz", icon: PenTool }
];

export default function Sidebar() {
  return (
    <aside className="w-72 hidden md:flex flex-col gap-8 bg-slate-900 text-slate-50 px-6 py-8 relative overflow-hidden border-r border-slate-800 shadow-2xl transition-colors duration-300">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-start">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
            <Vote size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">ElectionGuide</h1>
        </div>
        <p className="text-sm text-slate-400 font-medium ml-[3.25rem]">Learn with confidence</p>
      </div>
      <nav className="flex-1 relative z-10">
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm" 
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
                    }`
                  }
                >
                  <Icon size={20} />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="relative z-10 flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 mt-auto">
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">AI Powered</h4>
          <p className="text-xs text-slate-500">Gemini AI</p>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
