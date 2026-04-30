"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  X, ChevronDown, CheckSquare, Square,
  AlignJustify, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline as UnderlineIcon,
  List, ListOrdered, Heading2,
  RotateCcw, RotateCw, Clock, SendHorizonal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

const RECIPIENTS = ["All", "Clients", "Contractors"];

const RECIPIENT_COLORS = {
  All:         "bg-accent/10 text-accent",
  Clients:     "bg-pink-100 text-pink-600",
  Contractors: "bg-primary/10 text-primary",
};

const ToolbarBtn = ({ onClick, active, children, title }) => (
  <button
    type="button"
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    title={title}
    className={`p-1.5 rounded-md transition-colors ${
      active
        ? "bg-primary text-white"
        : "text-accent/50 hover:bg-accent/10 hover:text-accent"
    }`}
  >
    {children}
  </button>
);
const Divider = () => <div className="w-px h-4 bg-accent/15 mx-1" />;

// ── Recipient dropdown ────────────────────────────────────────────────────────
const RecipientDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-accent/15 bg-secondary hover:border-accent/30 transition-colors"
      >
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${RECIPIENT_COLORS[value]}`}>
          {value}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-accent/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-[calc(100%+6px)] left-0 min-w-44 bg-tertiary border border-accent/15 rounded-xl shadow-2xl p-1">
          {RECIPIENTS.map((option) => {
            const isSelected = value === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => { onChange(option); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                  isSelected ? "bg-primary/8" : "hover:bg-accent/5"
                }`}
              >
                {isSelected
                  ? <CheckSquare className="w-3.5 h-3.5 text-primary shrink-0" />
                  : <Square className="w-3.5 h-3.5 text-accent/25 shrink-0" />
                }
                <span className={`text-sm font-medium flex-1 ${isSelected ? "text-primary" : "text-accent"}`}>
                  {option}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${RECIPIENT_COLORS[option]}`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Toggle switch ─────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
      checked ? "bg-primary" : "bg-accent/20"
    }`}
  >
    <span
      className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
        checked ? "translate-x-4.5" : "translate-x-0.5"
      }`}
    />
  </button>
);

// ── Main component ────────────────────────────────────────────────────────────
const NewBroadcast = ({ onCancel, onCreate, creating }) => {
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [formData, setFormData] = useState({
    title:      "",
    recipients: "All",
    content:    "",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: "Write your message here..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) =>
      setFormData((prev) => ({ ...prev, content: editor.getHTML() })),
  });

  const handleSend = () => {
    if (!formData.title.trim()) {
      alert("Please enter a broadcast title.");
      return;
    }
    if (!formData.content || formData.content === "<p></p>") {
      alert("Please enter broadcast content.");
      return;
    }
    let scheduledFor = null;
    if (isScheduled) {
      if (!scheduleDate || !scheduleTime) {
        alert("Please select both a date and time for scheduling.");
        return;
      }
      const dt = new Date(`${scheduleDate}T${scheduleTime}`);
      if (dt <= new Date()) {
        alert("Scheduled time must be in the future.");
        return;
      }
      scheduledFor = dt.toISOString();
    }
    onCreate?.({
      title:       formData.title.trim(),
      message:     formData.content,
      audience:    formData.recipients,
      scheduledFor,
    });
  };

  const charCount = formData.content.replace(/<[^>]*>/g, "").length;

  return (
    <div className="flex flex-col h-full gap-0 animate-in fade-in duration-200">

      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-5 mb-5 border-b border-accent/10">
        <div>
          <h2 className="text-lg font-bold text-accent">New Broadcast</h2>
          <p className="text-xs text-accent/45 mt-0.5">Compose and send to your users</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 hover:bg-accent/8 rounded-xl transition-colors text-accent/40 hover:text-accent"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Subject line ── */}
      <Input
        placeholder="Broadcast title..."
        className="bg-secondary border-accent/15 h-12 text-lg font-bold text-accent placeholder:text-accent/25 focus:border-primary/50 focus-visible:ring-0 rounded-xl mb-4"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      {/* ── Metadata row (recipients + schedule) ── */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-accent/50">
          <span className="text-xs font-medium">To:</span>
          <RecipientDropdown
            value={formData.recipients}
            onChange={(v) => setFormData({ ...formData, recipients: v })}
          />
        </div>

        <div className="w-px h-6 bg-accent/10" />

        <div className="flex items-center gap-2.5">
          <Clock className="w-3.5 h-3.5 text-accent/40" />
          <span className="text-xs text-accent/50 font-medium">Schedule</span>
          <Toggle checked={isScheduled} onChange={setIsScheduled} />
        </div>

        {isScheduled && (
          <>
            <div className="w-px h-6 bg-accent/10" />
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="h-8 w-36 border-accent/15 bg-secondary text-accent text-xs rounded-lg focus:border-primary/50 focus-visible:ring-0"
              />
              <Input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="h-8 w-28 border-accent/15 bg-secondary text-accent text-xs rounded-lg focus:border-primary/50 focus-visible:ring-0"
              />
            </div>
          </>
        )}
      </div>

      {/* ── Rich text editor ── */}
      <div className="flex-1 flex flex-col rounded-xl border border-accent/15 bg-secondary overflow-hidden focus-within:border-primary/40 transition-colors mb-5">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-accent/8">
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")} title="Bold"><Bold className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")} title="Italic"><Italic className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive("underline")} title="Underline"><UnderlineIcon className="w-3.5 h-3.5" /></ToolbarBtn>
          <Divider />
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive("heading", { level: 2 })} title="Heading"><Heading2 className="w-3.5 h-3.5" /></ToolbarBtn>
          <Divider />
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")} title="Bullet list"><List className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")} title="Ordered list"><ListOrdered className="w-3.5 h-3.5" /></ToolbarBtn>
          <Divider />
          <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("left").run()} active={editor?.isActive({ textAlign: "left" })} title="Left"><AlignLeft className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("center").run()} active={editor?.isActive({ textAlign: "center" })} title="Center"><AlignCenter className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("right").run()} active={editor?.isActive({ textAlign: "right" })} title="Right"><AlignRight className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("justify").run()} active={editor?.isActive({ textAlign: "justify" })} title="Justify"><AlignJustify className="w-3.5 h-3.5" /></ToolbarBtn>
          <Divider />
          <ToolbarBtn onClick={() => editor?.chain().focus().undo().run()} active={false} title="Undo"><RotateCcw className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().redo().run()} active={false} title="Redo"><RotateCw className="w-3.5 h-3.5" /></ToolbarBtn>
        </div>

        {/* Editor area */}
        <EditorContent
          editor={editor}
          className="flex-1 px-4 py-3 min-h-52 text-accent text-sm [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-44 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_h2]:text-lg [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:text-accent [&_.ProseMirror_h2]:mt-3 [&_.ProseMirror_h2]:mb-1 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-accent/25 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
        />

        {/* Character count */}
        <div className="flex items-center justify-end px-4 py-1.5 border-t border-accent/6">
          <span className={`text-[10px] ${charCount > 1000 ? "text-amber-500" : "text-accent/25"}`}>
            {charCount} chars
          </span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={creating}
          className="text-accent/40 hover:text-accent hover:bg-accent/5 rounded-xl"
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={handleSend}
          disabled={creating || !formData.title.trim()}
          className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 px-5 disabled:opacity-50 transition-all"
        >
          {creating ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {isScheduled ? "Scheduling..." : "Sending..."}
            </>
          ) : isScheduled ? (
            <><Clock className="w-4 h-4" /> Schedule Broadcast</>
          ) : (
            <><SendHorizonal className="w-4 h-4" /> Send Broadcast</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewBroadcast;
