import Image from "next/image";

import { Creator, MesssageProps } from "./types";
import chatgptPic from "../public/chatgptPic.jpeg";
import userPic from "../public/user.png";

const ChatMessage = ({ text, from }: MesssageProps) => {
  return (
    <>
      {from === Creator.Me && (
        <div className="bg-white p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
          <Image src={userPic} alt="user" width={40} />
          <p className="text-gray-700">{text}</p>
        </div>
      )}
      {from === Creator.Bot && (
        <div className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
          <Image src={chatgptPic} alt="user" width={40} />
          <p className="text-gray-700">{text}</p>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
