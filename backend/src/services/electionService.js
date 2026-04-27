export const electionTimeline = [
  {
    id: "registration",
    title: "Voter Registration Period",
    description: "Citizens register or update their voter details before the deadline."
  },
  {
    id: "nomination",
    title: "Candidate Nomination",
    description: "Candidates submit documents and are verified by the election authority."
  },
  {
    id: "campaign",
    title: "Campaign Period",
    description: "Candidates present policies and voters compare ideas and manifestos."
  },
  {
    id: "voting",
    title: "Voting Day",
    description: "Eligible voters cast their ballot at polling stations or approved channels."
  },
  {
    id: "counting",
    title: "Vote Counting",
    description: "Votes are counted under supervision with transparency mechanisms."
  },
  {
    id: "results",
    title: "Results Announcement",
    description: "Final outcomes are announced and publicly documented."
  }
];

export const votingSteps = [
  {
    step: 1,
    title: "Check Voter Eligibility",
    explanation: "Confirm age, citizenship, and residency conditions in your region.",
    tips: ["Check official election portal.", "Verify required legal documents."]
  },
  {
    step: 2,
    title: "Register as a Voter",
    explanation: "Submit voter registration form online or at approved registration centers.",
    tips: ["Register early.", "Keep acknowledgment receipt."]
  },
  {
    step: 3,
    title: "Verify Voter ID",
    explanation: "Ensure your voter ID card or approved ID document is valid.",
    tips: ["Match name and address details.", "Report errors before election day."]
  },
  {
    step: 4,
    title: "Find Polling Station",
    explanation: "Locate your assigned polling station and check opening hours.",
    tips: ["Plan transport in advance.", "Visit during less crowded hours."]
  },
  {
    step: 5,
    title: "Cast Your Vote",
    explanation: "Follow polling instructions, verify ballot, and cast your vote privately.",
    tips: ["Follow queue discipline.", "Ask officials for help if needed."]
  },
  {
    step: 6,
    title: "Understand Vote Counting",
    explanation: "Votes are securely collected, counted, and audited by authorized officials.",
    tips: ["Refer to official count updates.", "Understand recount and challenge rules."]
  }
];

export const knowledgeCards = [
  {
    id: "democracy",
    title: "What is Democracy?",
    summary: "A system where citizens choose representatives through free and fair elections.",
    detail: "Democracy gives people a voice in governance. Voting, public debate, and legal protections help ensure governments remain accountable."
  },
  {
    id: "election",
    title: "What is an Election?",
    summary: "A formal decision-making process where voters select leaders or policies.",
    detail: "Elections organize public choice using rules for nomination, campaigning, voting, and counting."
  },
  {
    id: "voting-matters",
    title: "Why Voting Matters",
    summary: "Voting shapes laws, services, and leadership outcomes.",
    detail: "When more citizens participate, elected outcomes better reflect society and strengthen legitimacy."
  },
  {
    id: "types",
    title: "Types of Elections",
    summary: "General, local, by-elections, and referendums are common election formats.",
    detail: "Different elections serve different levels of government or specific policy decisions."
  },
  {
    id: "fair-elections",
    title: "Importance of Fair Elections",
    summary: "Fair elections protect trust, equality, and peaceful transfer of power.",
    detail: "Independent oversight, transparent counting, and equal opportunity for candidates reduce manipulation risk."
  },
  {
    id: "commission",
    title: "Role of Election Commission",
    summary: "An independent authority that manages election rules and conduct.",
    detail: "Commissions set schedules, monitor compliance, train staff, and certify results under legal frameworks."
  }
];

export const quizQuestions = [
  {
    id: "q1",
    question: "Who is generally eligible to vote in national elections?",
    options: [
      "Any resident regardless of age",
      "Citizens who meet the legal voting age and registration rules",
      "Only people with government jobs",
      "Only candidates"
    ],
    correctAnswer: 1,
    explanation: "Eligibility is usually based on citizenship, age, and successful registration according to election law."
  },
  {
    id: "q2",
    question: "Why is voter registration important?",
    options: [
      "It allows election officials to verify and include eligible voters",
      "It decides who wins the election",
      "It is optional and has no impact",
      "It replaces identity checks"
    ],
    correctAnswer: 0,
    explanation: "Registration builds the official voter roll and helps prevent duplicate or invalid voting."
  },
  {
    id: "q3",
    question: "What happens during vote counting?",
    options: [
      "Votes are discarded after polling",
      "Votes are counted and often audited under supervision",
      "Only candidate teams count votes privately",
      "The result is guessed using surveys"
    ],
    correctAnswer: 1,
    explanation: "Vote counting is a controlled process to produce accurate, transparent outcomes."
  }
];

export function evaluateQuizSubmission(answers = []) {
  return quizQuestions.map((item) => {
    const selectedIndex = answers.find((a) => a.id === item.id)?.selectedIndex;
    const isCorrect = selectedIndex === item.correctAnswer;
    return {
      id: item.id,
      question: item.question,
      selectedIndex,
      correctIndex: item.correctAnswer,
      isCorrect,
      explanation: item.explanation,
      feedback: isCorrect
        ? "Great job. You understood this concept."
        : "Review the explanation and try similar questions again."
    };
  });
}
