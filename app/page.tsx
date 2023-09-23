"use client";
import useState from "react-usestateref";

import { Creator, MesssageProps } from "./types";
import ChatMessage from "./chatMessage";
import ChatInput from "./chatInput";

export default function Home() {
  const [messages, setMessages, messagesRef] = useState<MesssageProps[]>([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (input: string) => {
    setLoading(true);

    const myMessage: MesssageProps = {
      text: input,
      from: Creator.Me,
      key: new Date().getTime(),
    };

    setMessages([...messagesRef.current, myMessage]);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      }),
    }).then((response) => response.json());
    setLoading(false);

    if (response.text) {
      const botMessage: MesssageProps = {
        text: response.text,
        from: Creator.Bot,
        key: new Date().getDate(),
      };
      setMessages([...messagesRef.current, botMessage]);
    } else {
      // show error
    }
  };

  return (
    <main className="relative max-w-2xl mx-auto">
      <div className="sticky top-0 w-full pt-10 px-4">
        <ChatInput onSend={(input) => callApi(input)} disabled={loading} />
      </div>

      <div className="mt-10 px-4">
        {messages.map((msg: MesssageProps) => (
          <ChatMessage key={msg.key} text={msg.text} from={msg.from} />
        ))}
      </div>
    </main>
  );
}
