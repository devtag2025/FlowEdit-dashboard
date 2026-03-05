import React, { useState } from "react";
import { X, Play, Edit2, Download, Paperclip, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProjectDetailsSection from "./ProjectDetails";
import { SendHorizonal } from "lucide-react";
import { DialogPortal, DialogOverlay } from "@radix-ui/react-dialog";

function ProjectDetailPopUp({ isOpen, onClose, project }) {
  const [message, setMessage] = useState("");

  if (!project) return null;

  const handleSendMessage = () => {
    if (message.trim()) {
      alert(`Message sent: ${message}`);
      setMessage("");
    }
  };

  const messages = [
    {
      id: 1,
      user: "Sarah",
      time: "3:30 PM",
      message: "Just uploaded the latest cut with the new intro sequence!",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      id: 2,
      user: "Editor",
      time: "3:35 PM",
      message: "Just uploaded the latest cut with the new intro sequence!",
      avatar: null,
      isEditor: true,
    },
    {
      id: 3,
      user: "Sarah",
      time: "3:50 PM",
      message: "Just uploaded the latest cut with the new intro sequence!",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <DialogContent
          className="
        fixed 
        left-[50%] 
        top-[50%] 
        z-50 
        -translate-x-1/2 
        -translate-y-1/2
        w-[95vw]
        max-w-7xl
        h-[90vh]
        overflow-y-auto
        overflow-x-hidden
        nice-scrollbar
        p-1
        bg-tertiary
        rounded-3xl
        focus:outline-none
      "
        >
          <DialogHeader className="p-6 pb-4 border-b border-accent/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-xl font-bold text-accent mb-2">
                  {project.name}
                </DialogTitle>

                <div className="flex flex-wrap items-center gap-3 text-xs text-accent/60">
                  <span>Updated on {project.lastUpdated}</span>
                  <span>•</span>
                  <span>{project.platform}</span>
                  <span>•</span>
                  <Badge className="bg-primary text-white border-0 text-xs px-2 py-0">
                    {project.status}
                  </Badge>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-accent/60 hover:text-accent transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-1 h-full">
            <div className="p-6 space-y-4 overflow-hidden">
              <div className="aspect-video bg-accent rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/80 to-accent/60" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-3 mx-auto cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-white/80 text-sm">
                    Video preview coming soon
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-accent/60">Video Project Version: 5</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-tertiary bg-primary rounded-2xl hover:bg-accent/5 gap-2 h-8"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-tertiary bg-primary rounded-2xl hover:bg-accent/5 gap-2 h-8"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-accent/10">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-accent">
                    Project Description
                  </p>
                </div>
                <p className="text-sm text-accent/70 leading-relaxed">
                  Create a dynamic 60-second Instagram Reel showcasing our
                  summer product line. The video should feel energetic, vibrant,
                  and capture the excitement of summer adventures.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-accent">
                    Progress
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-accent/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col h-full">
              <h4 className="text-sm font-semibold text-accent mb-4">
                Project Messages
              </h4>
              <div className="space-y-3 overflow-y-auto pr-2 flex-1 nice-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <Avatar className="w-8 h-8 shrink-0">
                      {msg.avatar ? (
                        <AvatarImage src={msg.avatar} alt={msg.user} />
                      ) : (
                        <AvatarFallback className="bg-accent/20 text-accent text-xs">
                          E
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-accent">
                          {msg.user}
                        </span>
                        <span className="text-xs text-accent/60">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-xs text-accent/80 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <div className="relative">
                  <Input
                    placeholder="Reply..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-white border-accent/20 text-accent placeholder:text-accent/40 focus:border-primary focus:ring-primary py-5 pr-20 rounded-3xl"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      className="p-2 rounded-full hover:bg-accent/5 transition-colors"
                      aria-label="Attach file"
                    >
                      <Paperclip className="w-4 h-4 text-accent" />
                    </button>
                    <button onClick={handleSendMessage} aria-label="Send">
                      <SendHorizonal className="w-4 h-4 text-accent" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-accent/10 pt-4 mt-4 space-y-3">
                  <ProjectDetailsSection />

                  <div className="flex flex-col sm:flex-row sm:justify-end gap-2 w-full">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                    >
                      Request Revision
                    </Button>

                    <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                      Approve Final Video
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default ProjectDetailPopUp;
