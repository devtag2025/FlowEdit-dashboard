import React, { useState } from "react";
import {
  X,
  CheckSquare,
  Square,
  Check,
  TextAlignJustify,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  LinkIcon,
  ImageIcon,
  Bold,
  Italic,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";

const NewBroadcast = ({ onCancel }) => {
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    recipients: "All",
    priority: "Normal",
    content: "",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write your broadcast message here...",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      Link,
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) =>
      setFormData((prev) => ({ ...prev, content: editor.getHTML() })),
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-accent">New Broadcast</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-accent/5 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-accent" />
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-5">
        <div>
          <label className="font-bold text-accent mb-2 block">Title</label>
          <Input
            placeholder="Enter broadcast title..."
            className="bg-tertiary border-accent/20 h-10 font-medium"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-bold text-accent mb-2 block">Recipients</label>
          <Select
            value={formData.recipients}
            onValueChange={(value) =>
              setFormData({ ...formData, recipients: value })
            }
          >
            <SelectTrigger className="w-full h-12 border-accent/20 text-accent transition-all">
              <SelectValue placeholder="Select recipient..." />
            </SelectTrigger>

            <SelectContent className="border-accent/20 shadow-lg p-1 overflow-hidden">
              {["All", "Management", "Contractors"].map((option) => {
                const isSelected = formData.recipients === option;

                return (
                  <SelectItem
                    key={option}
                    value={option}
                    showCheckIcon={false}
                    className={`flex items-center gap-3 px-2 py-2 cursor-pointer transition-colors ${isSelected ? "bg-primary/10 text-primary" : "text-accent hover:bg-accent/5"}`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-primary" />
                      ) : (
                        <Square className="w-5 h-5 text-accent/50" />
                      )}
                      <span className="font-medium text-base">{option}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="font-bold text-accent">Scheduled</label>

            <input
              type="checkbox"
              checked={!isScheduled}
              onChange={() => setIsScheduled((prev) => !prev)}
              className="w-4 h-4 accent-primary"
            />

            <span className="text-sm text-accent/70">Send immediately</span>
          </div>

          {isScheduled && (
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="h-10 rounded-lg cursor-pointer border-accent/20"
                />
              </div>

              <div className="flex-1">
                <Input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="h-10 rounded-lg cursor-pointer border-accent/20"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="font-bold text-accent mb-2 block">Content</label>
          <div className="rounded-xl border border-accent/10 bg-tertiary/80 p-3">
            <div className="flex gap-2 lg:gap-3 border-b border-accent/10 text-accent pb-2">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="cursor-pointer"
              >
                <Bold className="w-4 h-4" />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="cursor-pointer"
              >
                <Italic className="w-4 h-4" />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className="cursor-pointer"
              >
                <UnderlineIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className="cursor-pointer"
              >
                <TextAlignStart className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className="cursor-pointer"
              >
                <TextAlignCenter className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className="cursor-pointer"
              >
                <TextAlignEnd className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                className="cursor-pointer"
              >
                <TextAlignJustify className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const url = prompt("Enter image URL");
                  if (url) editor.chain().focus().setImage({ src: url }).run();
                }}
                className="cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const url = prompt("Enter URL");
                  if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
                className="cursor-pointer"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="">
              <EditorContent
                editor={editor}
                className="mt-2 min-h-[100px] text-accent focus:outline-none focus:border-none text-sm lg:text-base"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row pt-4 justify-between">
        <Button
          className="bg-accent/10 text-primary rounded-xl hover:bg-accent/40 hover:text-white"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 px-4">
          Send Broadcast
          <Check className="w-4 h-4 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default NewBroadcast;
