import { AI_CONFIG, configSchema } from '../config/aiConfig';
import type { ChatMessage } from '../types/chat';

export class MistralClient {
  private static validateConfig() {
    const result = configSchema.safeParse(AI_CONFIG);
    if (!result.success) {
      throw new Error('Invalid AI configuration');
    }
  }

  static async generateCompletion(messages: ChatMessage[]) {
    this.validateConfig();

    try {
      const response = await fetch(AI_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          model: AI_CONFIG.model,
          messages,
          temperature: AI_CONFIG.temperature,
          max_tokens: AI_CONFIG.maxTokens
        })
      });

      if (!response.ok) {
        throw new Error(`AI API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Mistral API Error:', error);
      throw error;
    }
  }
}