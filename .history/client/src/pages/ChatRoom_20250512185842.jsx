import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:5000/api/messages");
    setMessages(res.data);
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/api/messages", { text });
    setText("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // pseudo canlılık
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="border h-80 overflow-y-auto mb-4 p-2">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">{msg.text}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} className="border flex-1 p-2" />
        <button onClick={sendMessage} className="bg-green-500 text-white p-2">Gönder</button>
      </div>
    </div>
  );
}
