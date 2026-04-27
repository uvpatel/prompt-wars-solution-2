import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useKeyboardShortcut } from "./hooks/useKeyboardShortcut";
import DashboardPage from "./pages/DashboardPage";
import LearningPage from "./pages/LearningPage";
import QuizPage from "./pages/QuizPage";
import TimelinePage from "./pages/TimelinePage";
import { focusMainContent } from "./utils/a11y";

export default function App() {
  useKeyboardShortcut("m", (event) => {
    if (event.altKey) {
      focusMainContent();
    }
  });

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
