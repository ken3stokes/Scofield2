import { z } from 'zod';

export const AI_CONFIG = {
  apiKey: import.meta.env.VITE_MISTRAL_API_KEY || '',
  endpoint: 'https://api.mistral.ai/v1/chat/completions',
  model: 'mistral-tiny',
  temperature: 0.7,
  maxTokens: 500
} as const;

export const configSchema = z.object({
  apiKey: z.string().min(1, 'API key is required'),
  endpoint: z.string().url('Valid endpoint URL is required'),
  model: z.string(),
  temperature: z.number().min(0).max(1),
  maxTokens: z.number().positive()
});

export type AIConfig = z.infer<typeof configSchema>;