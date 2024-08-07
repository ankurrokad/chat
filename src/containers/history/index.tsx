import axios from "axios";
import { useEffect, useState } from "react";
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
    <div className="bg-gray-100 p-4  overflow-y-auto mb-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Chat Questions and Answers</h1>
        <ul className="space-y-4 max-h-96 overflow-y-auto">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              onClick={() =>
                setSelectedChatId(selectedChatId === chat.id ? null : chat.id)
              }
            >
              <div className="font-semibold">
                <strong>Question:</strong> {chat.user_message}
              </div>
              {selectedChatId === chat.id && (
                <div className="mt-2">
                  <strong>Answer:</strong> {chat.assistant_response}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>{" "}
    </div>
  );
};

export default HistoryContainer;
