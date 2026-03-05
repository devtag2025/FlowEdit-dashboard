import { Bell } from "lucide-react";

const EmptyNotification = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full min-h-125">
      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
        <Bell className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-accent mb-2">
        Select a Notification
      </h3>
      <p className="text-accent/60 max-w-md">
        Choose a notification from the list to view its details.
      </p>
    </div>
  );
};

export default EmptyNotification;
