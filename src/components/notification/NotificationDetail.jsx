import { X } from "lucide-react";
import { Clock } from "lucide-react";
import React from "react";

const NotificationDetail = ({
  notification,
  setSelectedNotification,
  isMobile,
  setMobileDetailOpen,
}) => {
  if (isMobile) {
    return (
      <div className="space-y-6 p-3 relative">
        <div className="absolute top-4 right-3">
          <X
            className="w-4 h-4 text-gray-700 cursor-pointer"
            onClick={() => setMobileDetailOpen(false)}
          />
        </div>
        <div className="mt-4 flex flex-col items-start justify-between space-y-6">
          <h2 className="text-2xl font-semibold text-accent mb-2">
            {notification.title}
          </h2>
          <div className="flex items-center gap-3 mt-4">
            <span className="px-4 py-1 rounded text-sm bg-primary text-white font-semibold capitalize">
              {notification.type} update
            </span>

            <span className=" flex items-center gap-1 font-semibold text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {notification.time}
            </span>
          </div>

          <p className="text-accent font-semibold text-lg">
            {notification.description}
          </p>

          <p className="text-slate-700 whitespace-pre-line">
            {notification.message}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6 p-3 relative">
      <div className="absolute top-0 right-0">
        <X
          className="w-4 h-4 text-gray-700 cursor-pointer"
          onClick={() => setSelectedNotification(null)}
        />
      </div>
      <div className="mt-4 flex flex-col items-start justify-between space-y-6">
        <h2 className="text-2xl font-semibold text-accent mb-2">
          {notification.title}
        </h2>
        <div className="flex items-center gap-3 mt-4">
          <span className="px-4 py-1 rounded text-sm bg-primary text-white font-semibold capitalize">
            {notification.type} update
          </span>

          <span className=" flex items-center gap-1 font-semibold text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            {notification.time}
          </span>
        </div>

        <p className="text-accent font-semibold text-lg">
          {notification.description}
        </p>

        <p className="text-slate-700">{notification.message}</p>
      </div>
    </div>
  );
};

export default NotificationDetail;
