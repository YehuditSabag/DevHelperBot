import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import "./BotSocket.scss";
import ImgChatbot from "../../images/chatbot.svg";

// Types definitions
type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  message: string;
  loading: boolean;
}

interface SocketData {
  message: string;
}

interface SocketConnectProps {}

// Socket connection
const socket = io("http://localhost:5000", {
  path: "/api/socket.io",
});

export const SocketConnect: React.FC<SocketConnectProps> = () => {
  const [message, setMessage] = useState<string>("");
  const [chatList, setChatList] = useState<ChatMessage[]>([]);

  // Socket event handlers
  useEffect(() => {
    const handleConnect = (): void => {
      console.log("Connected");
    };

    const handleReceiveMessage = (data: SocketData): void => {
      setChatList((prevChatList) => {
        const newList: ChatMessage[] = [...prevChatList];
        if (newList.length > 0) {
          const lastIndex = newList.length - 1;
          newList[lastIndex] = {
            ...newList[lastIndex],
            message: data.message,
            loading: false
          };
        }
        return newList;
      });
    };

    socket.on("connect", handleConnect);
    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup function
    return () => {
      socket.off("connect", handleConnect);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  const handleSubmit = (): void => {
    if (!message.trim()) return;

    socket.emit("sendMessage", { message });
    
    const userMessage: ChatMessage = {
      role: "user",
      message: message,
      loading: false
    };
    
    const assistantMessage: ChatMessage = {
      role: "assistant",
      message: "",
      loading: true
    };

    setChatList((prevList) => [...prevList, userMessage, assistantMessage]);
    setMessage("");
  };

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          <h2 className="title">AI assistant</h2>
        </div>
        
        <div className="chat-body">
          {chatList.map((chat: ChatMessage, index: number) => (
            <div key={`message-${index}`} className="message-item">
              {chat.role !== "user" && (
                <img 
                  src={ImgChatbot} 
                  className="img-chatbot" 
                  alt="AI Chatbot Avatar"
                />
              )}

              <div
                className={`message ${
                  chat.role === "user" ? "sender-message" : "receiver-message"
                }`}
              >
                {chat.loading ? (
                  <p className="typing-message">
                    <span></span>
                    <span></span>
                    <span></span>
                  </p>
                ) : (
                  <p>{chat.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <input
            className="form-control"
            type="text"
            value={message}
            placeholder="Type your message"
            onChange={handleInputText}
            onKeyPress={handleKeyPress}
            autoComplete="off"
          />
          <div>
            <button 
              className="send-btn" 
              onClick={handleSubmit}
              disabled={!message.trim()}
              type="button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocketConnect;
