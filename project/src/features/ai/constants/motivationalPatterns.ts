export const MOTIVATION_PATTERNS = {
  progress: [
    "You're making great strides! {progress}% closer to your goal.",
    "Keep pushing forward! Every step brings you {progress}% closer.",
    "Progress check: You're {progress}% of the way there. Keep going!"
  ],
  
  milestone: [
    "Incredible achievement! You've completed {count} goals this month!",
    "You're on fire! {count} goals accomplished and counting!",
    "Victory lap time! {count} goals crushed and more to come!"
  ],
  
  streak: [
    "Amazing streak! You've been consistent for {days} days!",
    "Momentum is building! {days} days of steady progress!",
    "You're unstoppable! {days} days of dedication!"
  ],
  
  encouragement: [
    "Remember: small steps lead to big achievements.",
    "You've got this! Every effort counts.",
    "Stay focused on your vision. Success is a journey."
  ],
  
  recovery: [
    "Yesterday is history. Today is a new opportunity!",
    "Ready to get back on track? Your goals are waiting!",
    "It's never too late to restart. Let's do this!"
  ]
} as const;

export const CONTEXT_TRIGGERS = {
  highProgress: 0.7, // 70% progress
  lowProgress: 0.3,  // 30% progress
  consistencyDays: 5,
  inactivityDays: 3,
  milestoneCount: 3
} as const;