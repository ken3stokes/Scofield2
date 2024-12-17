export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CompletionResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}