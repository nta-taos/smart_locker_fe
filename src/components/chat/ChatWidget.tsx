import { useEffect, useRef, useState } from 'react';

import {
  CloseOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { FloatButton, message } from 'antd';

import { chatApi } from '@/api/chatApi';

import styles from './ChatWidget.module.scss';
import { ChatMessage, mockMessages } from './chatMessages';

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messageRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const text = input.trim();
    const newMsg: ChatMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatApi.ask(text);
      const replyContent =
        response.data?.reply ||
        'ZIPBOX đang kiểm tra thêm thông tin cho bạn, vui lòng chờ trong giây lát nhé!';

      const reply: ChatMessage = {
        id: Date.now() + 1,
        text: replyContent,
        sender: 'support',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error(err);
      message.error('Không thể kết nối trợ lý ZIPBOX. Vui lòng thử lại sau.');
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages, open]);

  return (
    <>
      {!open && (
        <FloatButton
          type="primary"
          icon={<MessageOutlined />}
          onClick={() => setOpen(true)}
          style={{ right: 24, bottom: 24, width: 56, height: 56 }}
          tooltip="Chat Hỗ Trợ"
        />
      )}

      {open && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <div className={styles.title}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CustomerServiceOutlined /> Hỗ trợ khách hàng
              </span>
              <span className={styles.status}>Đang hoạt động</span>
            </div>
            <CloseOutlined className={styles.close} onClick={() => setOpen(false)} />
          </div>

          <div className={styles.messages} ref={messageRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.msg} ${msg.sender === 'user' ? styles.user : styles.support}`}
              >
                <p>{msg.text}</p>
                <span className={styles.time}>{msg.time}</span>
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.msg} ${styles.support}`}>
                <p>ZIPBOX đang soạn phản hồi…</p>
              </div>
            )}
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} disabled={!input.trim() || isTyping}>
              <SendOutlined />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
