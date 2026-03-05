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
      title: "Project Deadline approaching",
      description: "Brand Refresh Assets is due in 2 days - Submit for review",
      message: `The deadline for the Brand Refresh Assets project is approaching quickly. Only two days remain to finalize and submit the deliverables for review. Please ensure all assets meet the required guidelines and quality standards. Review feedback from previous iterations before submission. Reach out if you need any clarification or additional time.Timely submission will help avoid project delays.`,
      type: "project",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Payment Recieved",
      description: "$2,500 deposited for Social Media Campaign project",
      message: `We have successfully received your payment of $2,500. The amount has been deposited for the Social Media Campaign project. This payment has been securely processed and recorded in your account. You can view the transaction details in your billing dashboard. No further action is required at this time. Thank you for your prompt payment.`,
      type: "billing",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "New project assigned",
      description:
        "Website Redesign for Startup Labs - Review the brief and start planing",
      message: `A new project has been assigned to your workspace. The Website Redesign for Startup Labs is now ready for review. Please go through the project brief and requirements carefully. Start outlining the design approach and key milestones. Make sure to align timelines with the client’s expectations. Contact the project manager if you have any questions.`,
      type: "project",
      time: "1 day ago",
    },
    {
      id: 4,
      title: "New message from client",
      description:
        "Acme Corp sent feedbak on Product Launch Video - 3 new comments",
      message: `You have received new feedback from Acme Corp. The client has shared three comments on the Product Launch Video. Please review each comment carefully for required revisions. Address the feedback to improve overall quality and clarity. Update the client once the changes are completed. Timely response will help keep the project on track.`,
      type: "other",
      time: "2 day ago",
    },
    {
      id: 5,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      message: `Your billing information has been updated successfully. This plan offers flexibility based on your content requirements. All services include professional editing and quick turnaround times. Please review the plan details to ensure it fits your needs. You can upgrade or modify your plan at any time. Reach out to support if you need assistance.`,
      type: "billing",
      time: "2 hours ago",
    },
    {
      id: 6,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      message: `A system update has been applied to improve performance. This update enhances stability and overall user experience. Some features may appear slightly different after the update. No action is required from your side at this time. Your data and settings remain fully secure. Thank you for your patience and trust.`,
      type: "system",
      time: "2 hours ago",
    },
    {
      id: 7,
      title: "Pharetra pharetra eget enim massa et",
      description:
        "Choose the plan that best fits your content needs. All plans include professional editing and fast delivery.",
      message: `There is a new notification available in your account. It may contain important information or updates for you. Please review the details at your earliest convenience. Some notifications may require your response or action. Staying updated helps ensure smooth project progress. Contact support if you need further clarification.`,
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
