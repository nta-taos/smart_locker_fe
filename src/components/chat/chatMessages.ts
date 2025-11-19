export type ChatMessage = {
  id: number;
  text: string;
  sender: 'user' | 'support';
  time: string;
};

export const mockMessages: ChatMessage[] = [
  {
    id: 1,
    text: 'Xin chào! Bạn cần hỗ trợ gì không?',
    sender: 'support',
    time: '09:00',
  },
];
