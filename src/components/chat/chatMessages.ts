export type ChatMessage = {
  id: number;
  text: string;
  sender: 'user' | 'support';
  time: string;
};

export const mockMessages: ChatMessage[] = [
  {
    id: 1,
    text: 'Xin chào! Mình là ZIPBOX Care Bot. Bạn muốn hỏi về chính sách tủ, thanh toán hay cần hướng dẫn sử dụng PWA?',
    sender: 'support',
    time: '09:00',
  },
];
