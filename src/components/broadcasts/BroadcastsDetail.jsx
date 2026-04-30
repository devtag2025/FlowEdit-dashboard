import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Trash2, X, Loader2, Pencil, Check, Megaphone,
  Eye, Users, Clock, BarChart2, SendHorizonal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteBroadcast, updateBroadcast, sendScheduledBroadcast } from "@/lib/queries/broadcast";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
  AlignJustify, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline as UnderlineIcon,
  List, ListOrdered, Heading2, RotateCcw, RotateCw,
} from "lucide-react";

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
const TDivider = () => <div className="w-px h-4 bg-accent/15 mx-1" />;

// ── Inline edit form ─────────────────────────────────────────────────────────
const EditForm = ({ broadcast, onSave, onCancel, saving }) => {
  const [title, setTitle] = useState(broadcast.title || "");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: broadcast.content || broadcast.message || "",
    immediatelyRender: false,
  });

  const handleSave = () => {
    const content = editor?.getHTML() || "";
    if (!title.trim()) { alert("Title is required."); return; }
    if (!content || content === "<p></p>") { alert("Message is required."); return; }
    onSave({ title: title.trim(), message: content });
  };

  return (
    <div className="space-y-5 flex-1 flex flex-col">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Broadcast title..."
        className="bg-secondary border-accent/15 h-12 text-lg font-bold text-accent placeholder:text-accent/30 focus:border-primary focus-visible:ring-0 rounded-xl"
      />

      <div className="flex-1 flex flex-col rounded-xl border border-accent/15 bg-secondary overflow-hidden focus-within:border-primary/50 transition-colors">
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-accent/10">
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")} title="Bold"><Bold className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")} title="Italic"><Italic className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive("underline")} title="Underline"><UnderlineIcon className="w-3.5 h-3.5" /></ToolbarBtn>
          <TDivider />
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive("heading", { level: 2 })} title="Heading"><Heading2 className="w-3.5 h-3.5" /></ToolbarBtn>
          <TDivider />
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")} title="Bullet list"><List className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")} title="Numbered list"><ListOrdered className="w-3.5 h-3.5" /></ToolbarBtn>
          <TDivider />
          <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("left").run()} active={editor?.isActive({ textAlign: "left" })} title="Left"><AlignLeft className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("center").run()} active={editor?.isActive({ textAlign: "center" })} title="Center"><AlignCenter className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("right").run()} active={editor?.isActive({ textAlign: "right" })} title="Right"><AlignRight className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("justify").run()} active={editor?.isActive({ textAlign: "justify" })} title="Justify"><AlignJustify className="w-3.5 h-3.5" /></ToolbarBtn>
          <TDivider />
          <ToolbarBtn onClick={() => editor?.chain().focus().undo().run()} active={false} title="Undo"><RotateCcw className="w-3.5 h-3.5" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor?.chain().focus().redo().run()} active={false} title="Redo"><RotateCw className="w-3.5 h-3.5" /></ToolbarBtn>
        </div>
        <EditorContent
          editor={editor}
          className="flex-1 px-4 py-3 min-h-40 text-accent text-sm [&_.ProseMirror]:outline-none [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_h2]:text-lg [&_.ProseMirror_h2]:font-bold"
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={saving} className="text-accent/40 hover:text-accent rounded-xl">
          Cancel
        </Button>
        <Button type="button" onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 px-5 disabled:opacity-60">
          {saving
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            : <><Check className="w-4 h-4" /> Save changes</>
          }
        </Button>
      </div>
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────────────────
const BroadcastDetail = ({ broadcast, onBack, onDeleted, onUpdated, isMobile }) => {
  const [deleting, setDeleting]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editing, setEditing]         = useState(false);
  const [saving, setSaving]           = useState(false);
  const [sending, setSending]         = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteBroadcast(broadcast.id);
      onDeleted?.();
      onBack?.();
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete broadcast. Please try again.");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const handleSave = async ({ title, message }) => {
    try {
      setSaving(true);
      await updateBroadcast(broadcast.id, { title, message });
      setEditing(false);
      onUpdated?.();
    } catch (err) {
      console.error("Failed to update:", err);
      alert("Failed to update broadcast. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSendNow = async () => {
    try {
      setSending(true);
      await sendScheduledBroadcast(broadcast.id, broadcast.audience);
      onDeleted?.();
      onBack?.();
    } catch (err) {
      console.error("Failed to send broadcast:", err);
      alert("Failed to send broadcast. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const readRate =
    broadcast.recipientCount > 0
      ? Math.round((broadcast.views / broadcast.recipientCount) * 100)
      : 0;

  const Content = () => (
    <div
      className="prose prose-sm max-w-none text-accent/80 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-accent [&_h2]:mt-4 [&_h2]:mb-2 [&_p]:mb-3 [&_p:last-child]:mb-0"
      dangerouslySetInnerHTML={{ __html: broadcast.content || broadcast.message || "" }}
    />
  );

  // ── Mobile ──────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="pt-2 pb-6 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge className={`${broadcast.audienceColor} border-0 text-xs`}>{broadcast.audience}</Badge>
              {broadcast.status === "scheduled"
                ? <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                    <Clock className="w-3 h-3" />{broadcast.scheduledFor}
                  </span>
                : <span className="text-xs text-accent/50">Sent {broadcast.sentAt}</span>
              }
            </div>
            <h2 className="text-xl font-bold text-accent leading-snug">{broadcast.title}</h2>
          </div>
          <button onClick={onBack} className="p-2 hover:bg-accent/8 rounded-xl transition-colors shrink-0">
            <X className="w-5 h-5 text-accent/60" />
          </button>
        </div>

        {/* Scheduled notice */}
        {broadcast.status === "scheduled" && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800">Scheduled broadcast</p>
              <p className="text-xs text-amber-600">Will send on {broadcast.scheduledFor}</p>
            </div>
          </div>
        )}

        {/* Content */}
        {editing
          ? <EditForm broadcast={broadcast} onSave={handleSave} onCancel={() => setEditing(false)} saving={saving} />
          : <div className="rounded-2xl bg-secondary p-4"><Content /></div>
        }

        {/* Stats for sent */}
        {!editing && broadcast.status === "sent" && (
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-secondary rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-accent">{broadcast.views}</p>
              <p className="text-[10px] text-accent/50 mt-0.5">Views</p>
            </div>
            <div className="bg-secondary rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-accent">{broadcast.recipientCount ?? 0}</p>
              <p className="text-[10px] text-accent/50 mt-0.5">Recipients</p>
            </div>
            <div className="bg-secondary rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-accent">{readRate}%</p>
              <p className="text-[10px] text-accent/50 mt-0.5">Read rate</p>
            </div>
          </div>
        )}

        {/* Delete confirm */}
        {showConfirm && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            <p className="text-sm text-red-600 font-medium flex-1">Delete this broadcast?</p>
            <button onClick={() => setShowConfirm(false)} className="text-xs text-red-400 hover:text-red-600 px-2 py-1">Cancel</button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 disabled:opacity-60 flex items-center gap-1"
            >
              {deleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
              Delete
            </button>
          </div>
        )}

        {/* Actions */}
        {!editing && (
          <div className="flex gap-2 flex-wrap">
            {broadcast.status === "scheduled" && (
              <Button onClick={handleSendNow} disabled={sending} className="flex-1 bg-primary hover:bg-primary/90 text-white h-10 rounded-xl gap-2 text-sm">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendHorizonal className="w-4 h-4" />}
                Send Now
              </Button>
            )}
            <Button variant="outline" onClick={() => setEditing(true)} className="flex-1 border-accent/15 text-accent h-10 rounded-xl gap-2 text-sm">
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Button>
            <Button variant="ghost" onClick={() => setShowConfirm(true)} disabled={deleting} className="flex-1 text-red-500 hover:bg-red-50 h-10 rounded-xl gap-2 text-sm">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </Button>
          </div>
        )}
      </div>
    );
  }

  // ── Desktop ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full min-h-0 gap-0">

      {/* ── Top bar ── */}
      <div className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-accent/10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <Badge className={`${broadcast.audienceColor} border-0 text-xs`}>{broadcast.audience}</Badge>
            {broadcast.status === "scheduled"
              ? <span className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                  <Clock className="w-3 h-3" />Scheduled · {broadcast.scheduledFor}
                </span>
              : <span className="text-xs text-accent/45">Sent {broadcast.sentAt}</span>
            }
          </div>
          <h2 className="text-2xl font-bold text-accent leading-tight">{broadcast.title}</h2>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {!editing && broadcast.status === "scheduled" && (
            <Button
              onClick={handleSendNow}
              disabled={sending}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 px-3 h-8 text-xs mr-1"
            >
              {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <SendHorizonal className="w-3.5 h-3.5" />}
              Send Now
            </Button>
          )}

          {!editing && (
            <button
              onClick={() => { setEditing(true); setShowConfirm(false); }}
              className="p-2 hover:bg-accent/8 rounded-xl transition-colors group"
              title="Edit"
            >
              <Pencil className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors" />
            </button>
          )}

          {!editing && (
            showConfirm ? (
              <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-xl px-2 py-1">
                <span className="text-xs text-red-600 font-medium">Delete?</span>
                <button onClick={() => setShowConfirm(false)} className="text-[10px] text-red-400 hover:text-red-600 px-1">Cancel</button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-lg hover:bg-red-600 disabled:opacity-60 flex items-center gap-1"
                >
                  {deleting ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Trash2 className="w-2.5 h-2.5" />}
                  Delete
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirm(true)}
                disabled={deleting}
                className="p-2 hover:bg-red-50 rounded-xl transition-colors group"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-accent/40 group-hover:text-red-500 transition-colors" />
              </button>
            )
          )}

          <button
            onClick={onBack}
            className="p-2 hover:bg-accent/8 rounded-xl transition-colors"
            title="Close"
          >
            <X className="w-4 h-4 text-accent/50 hover:text-accent transition-colors" />
          </button>
        </div>
      </div>

      {/* ── Scheduled notice banner ── */}
      {broadcast.status === "scheduled" && !editing && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200/70 rounded-2xl px-4 py-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">Scheduled broadcast</p>
            <p className="text-xs text-amber-600">This will be sent on {broadcast.scheduledFor}. Click "Send Now" to release immediately.</p>
          </div>
        </div>
      )}

      {/* ── Content area ── */}
      <div className="flex-1">
        {editing
          ? <EditForm broadcast={broadcast} onSave={handleSave} onCancel={() => setEditing(false)} saving={saving} />
          : <Content />
        }
      </div>

      {/* ── Stats footer ── */}
      {!editing && broadcast.status === "sent" && (
        <div className="mt-6 pt-5 border-t border-accent/10 flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-base font-bold text-accent leading-none">{broadcast.views}</p>
              <p className="text-[10px] text-accent/45 mt-0.5">views</p>
            </div>
          </div>
          <div className="w-px h-8 bg-accent/10" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <p className="text-base font-bold text-accent leading-none">{broadcast.recipientCount ?? 0}</p>
              <p className="text-[10px] text-accent/45 mt-0.5">recipients</p>
            </div>
          </div>
          <div className="w-px h-8 bg-accent/10" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
              <BarChart2 className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div>
              <p className="text-base font-bold text-accent leading-none">{readRate}%</p>
              <p className="text-[10px] text-accent/45 mt-0.5">read rate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BroadcastDetail;
