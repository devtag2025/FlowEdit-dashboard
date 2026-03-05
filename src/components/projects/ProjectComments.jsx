"use client";

import { useState } from "react";
import { ChevronDown, SendHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialMessages = [
  {
    id: 1,
    user: "Sarah Mitchell",
    time: "2 hours ago",
    message: `Love the transitions in the latest version! The color grading really pops now. Just one note: can we adjust the timing on slide 3?`,
    avatar: null,
  },
  {
    id: 2,
    user: "James Chen",
    time: "4 hours ago",
    message:
      "Working on the timing adjustment for slide 3. Will also tweak the audio fade between clips 7-8. Should have the update ready in an hour.",
    avatar: null,
    isEditor: true,
  },
  {
    id: 3,
    user: "James Chen",
    time: "5 hours ago",
    message:
      "Updated the music track per your feedback. Also increased the text size on the CTA screen for better readability.",
    avatar: null,
  },
];

export default function ProjectComments() {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [openSort, setOpenSort] = useState(false);

  const sortedMessages = [...messages].sort((a, b) => {
    if (sortBy === "newest") return a.id - b.id;
    if (sortBy === "oldest") return b.id - a.id;
    return 0;
  });

  const options = [
    { key: "newest", label: "Newest first" },
    { key: "oldest", label: "Oldest first" },
    { key: "relevant", label: "Most relevant" },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      {
        id: Date.now(),
        user: "You",
        time: "Just now",
        message,
        avatar: null,
      },
      ...prev,
    ]);

    setMessage("");
  };

  return (
    <div className="p-3 md:p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h4 className="md:text-lg font-semibold">Comments</h4>

        <div className="relative text-xs md:text-sm">
          <button
            onClick={() => setOpenSort(!openSort)}
            className="flex items-center gap-1 text-gray-600 hover:text-black"
          >
            Sort by ·{" "}
            <span className="font-semibold">
              {sortBy === "newest"
                ? "Newest first"
                : sortBy === "oldest"
                  ? "Oldest first"
                  : "Most relevant"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {openSort && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg z-50">
              {options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSortBy(opt.key);
                    setOpenSort(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center"
                >
                  {opt.label}
                  {sortBy === opt.key && (
                    <span className="text-primary">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pb-6">
        <div className="relative">
          <Input
            placeholder="Add a comment..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="text-sm md:text-base pr-20 py-5 border-0 border-b"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              onClick={handleSendMessage}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-5 overflow-y-auto pr-2 flex-1">
        {sortedMessages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <Avatar className="md:w-10 md:h-10 shrink-0">
              {msg.avatar ? (
                <AvatarImage src={msg.avatar} />
              ) : (
                <AvatarFallback className="bg-blue-600 text-white font-bold">
                  {msg.user[0]}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:gap-2 mb-1">
                <span className="font-semibold text-sm md:text-base">
                  {msg.user}
                </span>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-500">
                    {msg.time}
                  </span>

                  {msg.isEditor && (
                    <span className="text-xs text-gray-500 md:px-2 py-0.5">
                      Internal
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {msg.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
