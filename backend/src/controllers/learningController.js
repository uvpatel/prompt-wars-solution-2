import {
  electionTimeline,
  knowledgeCards,
  votingSteps
} from "../services/electionService.js";

export function getTimelineController(_req, res) {
  res.json({ success: true, data: electionTimeline });
}

export function getVotingGuideController(_req, res) {
  res.json({ success: true, data: votingSteps });
}

export function getKnowledgeCardsController(_req, res) {
  res.json({ success: true, data: knowledgeCards });
}
