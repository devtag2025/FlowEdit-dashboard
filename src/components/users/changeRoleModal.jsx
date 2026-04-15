"use client";
import { useState, useEffect } from "react";
import { X, Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkUserAssociations, updateUserRole } from "@/lib/queries/users";

const ROLES = [
  { value: "client", label: "Client", description: "Can submit projects and manage branding" },
  { value: "contractor", label: "Contractor", description: "Can work on assigned projects" },
];

const ChangeRoleModal = ({ user, onClose, onSuccess }) => {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [associations, setAssociations] = useState(null);

  useEffect(() => {
    checkUserAssociations(user.id)
      .then(setAssociations)
      .catch((err) => setError(err.message))
      .finally(() => setChecking(false));
  }, [user.id]);

  const canChange = associations?.canChange ?? false;

  const handleSave = async () => {
    if (selectedRole === user.role) {
      onClose();
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await updateUserRole(user.id, selectedRole);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update role.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-5 animate-in fade-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-accent">Change Role</h2>
            <p className="text-sm text-accent/60 mt-0.5">{user.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-accent" />
          </button>
        </div>

        {/* Loading check */}
        {checking ? (
          <div className="flex items-center justify-center py-8 gap-2 text-accent/50">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Checking associations...</span>
          </div>
        ) : !canChange ? (
          /* Cannot change - has associations */
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-800">
                  Role cannot be changed
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  This user has existing data in the system. Remove all
                  associations first before changing their role.
                </p>
                <ul className="mt-2 space-y-1">
                  {associations.reasons.map((reason, i) => (
                    <li
                      key={i}
                      className="text-xs text-yellow-700 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-yellow-600 shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Can change - show role options */
          <div className="space-y-3">
            <p className="text-sm text-accent/60">
              Current role:{" "}
              <span className="font-semibold text-accent capitalize">
                {user.role}
              </span>
            </p>

            <div className="space-y-2">
              {ROLES.map((role) => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    selectedRole === role.value
                      ? "border-primary bg-primary/5"
                      : "border-accent/10 hover:border-accent/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedRole === role.value
                        ? "border-primary"
                        : "border-accent/30"
                    }`}
                  >
                    {selectedRole === role.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-accent">
                      {role.label}
                      {role.value === user.role && (
                        <span className="text-xs text-accent/40 font-normal ml-2">
                          (current)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-accent/50">
                      {role.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {selectedRole !== user.role && (
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  Changing role to{" "}
                  <span className="font-semibold capitalize">
                    {selectedRole}
                  </span>{" "}
                  will update their dashboard access and permissions immediately.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-accent/10">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={saving}
            className="text-accent/50 hover:text-accent rounded-xl"
          >
            {canChange ? "Cancel" : "Close"}
          </Button>
          {canChange && (
            <Button
              onClick={handleSave}
              disabled={saving || selectedRole === user.role}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 px-6 disabled:opacity-50"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Updating...
                </span>
              ) : (
                "Update Role"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeRoleModal;
