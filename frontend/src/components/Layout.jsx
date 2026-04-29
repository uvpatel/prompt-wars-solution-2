import Sidebar from "./Sidebar.jsx";
import { ThemeProvider } from "./ThemeProvider";
import { UserProgressProvider } from "../context/UserProgressContext";
import ProgressHeader from "./ProgressHeader";

export default function Layout({ children }) {
  return (
    <ThemeProvider defaultTheme="light">
      <UserProgressProvider>
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-50 selection:bg-emerald-200 dark:selection:bg-emerald-900 transition-colors duration-300">
          <a className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" href="#main-content">
            Skip to main content
          </a>
          <Sidebar />
          <main className="flex-1 relative w-full h-screen overflow-y-auto" id="main-content" tabIndex={-1}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 dark:from-emerald-900/20 via-slate-50 dark:via-slate-900 to-slate-50 dark:to-slate-900 -z-10 transition-colors duration-300" />
            <div className="max-w-6xl mx-auto p-6 md:p-10 lg:p-12">
              <ProgressHeader />
              {children}
            </div>
          </main>
        </div>
      </UserProgressProvider>
    </ThemeProvider>
  );
}
