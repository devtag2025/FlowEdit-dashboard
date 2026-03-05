import { Circle, CircleCheck } from "lucide-react";
import React from "react";
import Image from "next/image";

const VideoCard = ({
  title,
  status,
  time,
  description,
  thumbnail,
  onClick,
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Completed":
        return "bg-green-200 text-green-700 border-green-700";
      case "In Progress":
        return "bg-orange-200 text-orange-700 border-orange-700";
      default:
        return "bg-gray-200 text-gray-600 border-gray-600";
    }
  };

  return (
    <div
      className="bg-white/70 p-3 rounded-lg flex flex-col md:flex-row cursor-pointer gap-4 mb-3 shadow-md hover:shadow-lg transition"
      onClick={onClick}
    >
      <div className="relative w-full md:w-56 aspect-video flex-shrink-0 overflow-hidden rounded shadow-md">
        <Image src={thumbnail} fill alt={title} className="object-cover" />
        <span className="absolute bottom-1 right-2 bg-black/50 text-white text-[9px] md:text-xs px-2 py-0.5 rounded backdrop-blur-sm">
          {time}
        </span>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-accent font-semibold text-sm md:text-lg">
            {title}
          </h3>
          <div
            className={`text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusStyles()}`}
          >
            {status}
          </div>
        </div>

        <p className="text-xs md:text-sm text-accent/50 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between border-t pt-2">
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-gray-400" />
            <p className="text-sm md:text-base text-accent/70">
              {status === "Completed" ? time : status}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <CircleCheck
              className={`w-4 h-4 ${status === "Completed" ? "text-green-400" : status === "In Progress" ? "text-orange-400" : "text-gray-400"}`}
            />
            <p className="text-xs md:text-sm text-accent/70">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
