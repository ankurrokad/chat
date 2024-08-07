import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Chat {
  id: number;
  user_message: string;
  assistant_response: string;
}
const HistoryContainer: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("/api/getChats");
        setChats(response.data);
      } catch (err) {
        setError("Failed to fetch chat data");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="space-y-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 border border-gray-200 hover:border-gray-600 rounded-lg cursor-pointer transition"
            onClick={() =>
              setSelectedChatId(selectedChatId === chat.id ? null : chat.id)
            }
          >
            <div className="font-semibold">
              <strong>Question:</strong> {chat.user_message}
            </div>
            {selectedChatId === chat.id && (
              <div className="mt-2">
                <strong>Answer:</strong>
                <ReactMarkdown>{chat.assistant_response}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryContainer;
