"use client";

import EmptyNotification from "@/components/notification/EmptyNotification";
import NotificationBar from "@/components/notification/NotificationBar";
import NotificationDetail from "@/components/notification/NotificationDetail";
import React, { useState } from "react";

const NotificationPage = () => {
  const btns = [
    {
      label: "All",
      type: "all",
    },
    {
      label: "Project Updates",
      type: "project",
    },
    {
      label: "System Alerts",
      type: "system",
    },
    {
      label: "Billing",
      type: "billing",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      message:
        "Your project has been updated with the latest changes.The timeline and deliverables were adjusted.Please review the update and share your feedback.Let us know if anything needs revision.",
      type: "project",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Nec nunc aenean orci odio tincidunt odio",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      message:
        "A system update is scheduled for later today.Some features may be temporarily unavailable.We recommend saving your work in advance.Service will resume shortly after completion.",
      type: "system",
      time: "2 hours ago",
    },
    {
      id: 3,
      title: "A bibendum arcu faucibus in. Morbi in",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      message:
        "Your billing invoice has been generated successfully.You can view or download it from your dashboard.Please check the details for accuracy.Contact support if you notice any issue.",
      type: "billing",
      time: "2 hours ago",
    },
    {
      id: 4,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      message:
        "You have received a new message from the support team.It contains important information regarding your account.Please read it carefully when you have time.Feel free to reply if you need assistance.",
      type: "other",
      time: "2 hours ago",
    },
    {
      id: 5,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      message:
        "Your recent payment was processed successfully.The amount has been credited to your account.No further action is required at this time.Thank you for your continued support.",
      type: "billing",
      time: "2 hours ago",
    },
    {
      id: 6,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      message:
        "We have applied a new security update to your account.This helps keep your data safe and protected.No changes are required from your side.Thank you for trusting our platform.",
      type: "system",
      time: "2 hours ago",
    },
    {
      id: 7,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      message:
        "There is a new notification waiting for you.It may require your attention or action.Please review the details when convenient.Reach out if you have any questions.",
      type: "other",
      time: "2 hours ago",
    },
  ];

  const [active, setActive] = useState("All");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const activeBtn = btns.find((b) => b.label === active);

  const filteredNotifications =
    activeBtn?.type === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeBtn?.type);

  return (
    <main className="min-h-screen bg-secondary px-3 md:px-8 py-5 pb-10 ">
      <h1 className="text-accent font-semibold text-2xl md:text-3xl pb-3">
        Notifications
      </h1>

      <div className="bg-tertiary/90 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 rounded-xl">
        <div className="lg:col-span-6">
          {btns.map((btn) => (
            <button
              key={btn.label}
              onClick={() => setActive(btn.label)}
              className={`text-sm px-2 shadow-md md:px-4 py-1 rounded-lg mr-2 mt-4 cursor-pointer  ${
                active === btn.label
                  ? `bg-primary text-white`
                  : `bg-white text-accent hover:bg-gray-300`
              }`}
            >
              {btn.label}
            </button>
          ))}

          <NotificationBar
            notifications={filteredNotifications}
            setSelectedNotification={setSelectedNotification}
            setMobileDetailOpen={setMobileDetailOpen}
          />
        </div>

        <div className="hidden lg:block lg:col-span-6 ">
          <div className="relative bg-white rounded-3xl p-6 min-h-140">
            {selectedNotification ? (
              <NotificationDetail
                notification={selectedNotification}
                setSelectedNotification={setSelectedNotification}
              />
            ) : (
              <EmptyNotification />
            )}
          </div>
        </div>

        <div
          className={`
          lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white border-t border-accent/10 rounded-t-3xl
          transition-transform duration-300 ease-out shadow-2xl
          ${mobileDetailOpen ? "translate-y-0" : "translate-y-full"}
        `}
          style={{ maxHeight: "85vh" }}
        >
          {selectedNotification && (
            <NotificationDetail
              notification={selectedNotification}
              isMobile={true}
              setMobileDetailOpen={setMobileDetailOpen}
            />
          )}
        </div>

        {mobileDetailOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-30"
            onClick={() => setMobileDetailOpen(false)}
          />
        )}
      </div>
    </main>
  );
};

export default NotificationPage;
