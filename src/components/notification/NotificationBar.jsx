import {
  Clock,
  DollarSign,
  FileExclamationPoint,
  MessageCircle,
} from "lucide-react";
import React from "react";

const NotificationBar = ({
  notifications,
  setSelectedNotification,
  setMobileDetailOpen,
}) => {
  const typeToIcon = {
    project: Clock,
    billing: DollarSign,
    system: FileExclamationPoint,
    other: MessageCircle,
  };

  return (
    <div className="space-y-3 mt-4">
      {notifications.map((notification) => {
        const Icon = typeToIcon[notification.type] || MessageCircle;
        return (
          <div
            key={notification.id}
            className="hidden bg-white rounded-lg p-3 lg:flex justify-between hover:bg-accent/10 cursor-pointer"
            onClick={() => setSelectedNotification(notification)}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="bg-primary p-3 rounded-full">
                <Icon size={18} />
              </div>

              <div className="flex flex-col">
                <h4 className="text-accent font-bold text-lg mb-1">
                  {notification.title}
                </h4>
                <p className="text-slate-600 text-sm">
                  {notification.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="lg:hidden bg-white rounded-xl p-4 flex flex-col hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            setSelectedNotification(notification);
            setMobileDetailOpen(true);
          }}
        >
          <span className="text-xs text-slate-600 whitespace-nowrap">
            {notification.time}
          </span>
          <h4 className="text-accent font-semibold text-lg mb-1">
            {notification.title}
          </h4>
          <p className="text-slate-600 text-sm">{notification.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;
