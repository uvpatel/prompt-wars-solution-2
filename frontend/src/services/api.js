import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  timeout: 12000
});

export async function askElectionAI(question, mode = "guide") {
  const { data } = await api.post("/ai/ask", { question, mode });
  return data.data;
}

export async function fetchTimeline() {
  const { data } = await api.get("/learning/timeline");
  return data.data;
}

export async function fetchVotingGuide() {
  const { data } = await api.get("/learning/voting-guide");
  return data.data;
}

export async function fetchKnowledgeCards() {
  const { data } = await api.get("/learning/knowledge-cards");
  return data.data;
}

export async function fetchQuizQuestions() {
  const { data } = await api.get("/quiz/questions");
  return data.data;
}

export async function submitQuiz(answers) {
  const { data } = await api.post("/quiz/submit", { answers });
  return data.data;
}
