"use client";
import { useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const [hidden, setHidden] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Привет! Свяжитесь с нами, если у вас есть вопросы или предложения!",
      isBot: true,
    },
  ]);

  const { isSignedIn, user } = useUser();

  const handleSendMessage = (message: string) => {
    setMessages([
      ...messages,
      { id: messages.length, text: message, isBot: false },
    ]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Спасибо за ваше сообщение!",
          isBot: true,
        },
      ]);

      setTimeout(() => {
        setHidden(true);
      }, 3000);
    }, 1000);
  };

  return (
    <div className={clsx("fixed bottom-4 right-4 z-50", hidden && "hidden")}>
      {/* Chat bubble */}
      {!isOpen && (
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#BE1E2D] text-white cursor-pointer shadow-lg hover:bg-[#a81a26] transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#BE1E2D] px-4 py-3 text-white flex justify-between items-center">
            <h3 className="font-medium">Чат поддержки</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col-reverse">
            <div className="flex flex-col gap-2 mb-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[80%] mb-3 p-3 rounded-lg ${
                    message.isBot
                      ? "bg-gray-100 text-gray-800 mr-auto"
                      : "bg-[#BE1E2D] text-white ml-auto"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </div>

          {/* Input or Sign In */}
          <div className="border-t p-3">
            {isSignedIn ? (
              <div className="flex items-center h-fit">
                <textarea
                  autoFocus
                  placeholder="Напишите сообщение..."
                  className="flex-1 border rounded-l-md py-1 h-10 px-3 resize-none focus:outline-none ring-2 ring-[#BE1E2D] focus:border-transparent disabled:opacity-50"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={messages.length > 1}
                />
                <button
                  className="bg-[#BE1E2D] text-white cursor-pointer flex items-center justify-center !h-10 px-4 rounded-r-md hover:bg-[#a81a26] ring-[#BE1E2D] ring-2 disabled:opacity-50"
                  onClick={async () => {
                    if (message.trim() === "") return;
                    const response = await fetch("/api/addReview", {
                      method: "POST",
                      body: JSON.stringify({
                        email: user?.emailAddresses[0].emailAddress,
                        message: message.trim(),
                      }),
                    });
                    if (response.ok) {
                      setMessage("");
                      handleSendMessage(message.trim());
                    }
                  }}
                  disabled={messages.length > 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-2">
                <p className="text-sm text-gray-600 mb-3 text-center">
                  Пожалуйста, войдите в аккаунт, чтобы оставить сообщение
                </p>
                <SignInButton>
                  <Button className="bg-[#BE1E2D] text-white cursor-pointer hover:bg-[#a81a26]">
                    Войти
                  </Button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
