import ChatContainer from "@/containers/chat";
import HistoryContainer from "@/containers/history";
import { useState } from "react";

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"chat" | "history">("chat");

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-2">
        <h1
          className={`text-xl mb-4 cursor-pointer select-none ${
            selectedTab == "chat" ? "text-2xl font-bold" : ""
          }`}
          onClick={() => setSelectedTab("chat")}
        >
          Chat
        </h1>
        <h1
          className={`text-xl mb-4 cursor-pointer select-none ${
            selectedTab == "history" ? "text-2xl font-bold" : ""
          }`}
          onClick={() => setSelectedTab("history")}
        >
          History
        </h1>
      </div>
      <>
        {selectedTab == "chat" ? (
          <ChatContainer />
        ) : selectedTab == "history" ? (
          <HistoryContainer />
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default Home;
