import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/database';
import { analyzeMotivationContext, generateMotivationalMessage } from '../utils/motivationEngine';

type NudgeType = 'success' | 'warning' | 'info';

interface MotivationalNudge {
  message: string;
  type: NudgeType;
}

export const useMotivationalNudges = () => {
  const [nudge, setNudge] = useState<MotivationalNudge | null>(null);
  const goals = useLiveQuery(() => db.goals.toArray());

  useEffect(() => {
    if (!goals) return;

    const generateNudge = (): MotivationalNudge => {
      const context = analyzeMotivationContext(goals);
      return generateMotivationalMessage(context);
    };

    const newNudge = generateNudge();
    setNudge(newNudge);

    // Refresh nudge every 5 minutes
    const interval = setInterval(() => {
      setNudge(generateNudge());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [goals]);

  return nudge || { message: '', type: 'info' as NudgeType };
};