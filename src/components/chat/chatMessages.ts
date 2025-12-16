export type ChatMessage = {
  id: number;
  text: string;
  sender: 'user' | 'support';
  time: string;
};

// Helper function to get initial messages with translation
export const getInitialMessages = (welcomeMessage: string): ChatMessage[] => [
  {
    id: 1,
    text: welcomeMessage,
    sender: 'support',
    time: '09:00',
  },
];
