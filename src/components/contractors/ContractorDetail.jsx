import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Edit, Mail, Upload, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContractorDetail = ({ contractor, onBack, isMobile }) => {
  const onboardingSteps = [
    { id: 1, label: "Start", completed: true },
    { id: 2, label: "Account", completed: true },
    { id: 3, label: "Profile", completed: true },
    { id: 4, label: "Training", completed: false },
    { id: 5, label: "Contract", completed: false },
    { id: 6, label: "Signed", completed: false },
    { id: 7, label: "Ready", completed: false },
    { id: 8, label: "End", completed: false },
  ];

  const accessPermissions = [
    { id: 1, label: "Email", active: true, color: "bg-blue-500" },
    { id: 2, label: "Partner", active: true, color: "bg-purple-500" },
    { id: 3, label: "Frame.io", active: false, color: "bg-gray-300" },
  ];

  if (isMobile) {
    return (
      <div className="bg-tertiary rounded-t-3xl p-4 pb-6 space-y-3">
        <div className="flex justify-center -mt-2 mb-1">
          <div className="w-12 h-1 bg-tertiary rounded-full" />
        </div>

        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <Avatar className={`w-12 h-12 ${contractor.avatarColor}`}>
              <AvatarFallback className="text-tertiary text-base font-bold">
                {contractor.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold text-accent">
                {contractor.name}
              </h2>
              <p className="text-xs text-accent">{contractor.email}</p>
            </div>
          </div>
          <Badge
            className={`${contractor.statusColor} border-0 px-2.5 py-0.5 text-xs`}
          >
            {contractor.status}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="bg-tertiary rounded-lg p-2.5">
            <div className="flex items-center gap-1 text-accent text-xs mb-1">
              <CheckCircle2 className="w-3 h-3" />
            </div>
            <p className="text-base font-bold text-accent">
              {contractor.projectsCompleted || "0"}
            </p>
            <p className="text-xs text-accent">Projects completed</p>
          </div>

          <div className="bg-tertiary rounded-lg p-2.5">
            <div className="flex items-center gap-1 text-accent text-xs mb-1">
              <Clock className="w-3 h-3" />
            </div>
            <p className="text-base font-bold text-accent">
              {contractor.avgDeliveryTime || "--"}
            </p>
            <p className="text-xs text-accent">Avg. delivery time</p>
          </div>

          <div className="bg-tertiary rounded-lg p-2.5">
            <div className="flex items-center gap-1 text-accent text-xs mb-1">
              <Edit className="w-3 h-3" />
            </div>
            <p className="text-base font-bold text-accent">
              {contractor.revisionRate || "--"}
            </p>
            <p className="text-xs text-accent">Revision rate</p>
          </div>
        </div>

        <div className="bg-tertiary rounded-xl p-3">
          <p className="text-xs font-semibold text-accent uppercase mb-2">
            Onboarding Progress
          </p>
          <div className="relative">
            <div
              className="absolute top-3 left-0 right-0 h-0.5 bg-tertiary"
              style={{ left: "5%", right: "5%" }}
            >
              <div className="h-full bg-primary" style={{ width: "37.5%" }} />
            </div>

            <div className="flex justify-between relative">
              {onboardingSteps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                      step.completed
                        ? "bg-primary text-white"
                        : "bg-tertiary border-2 border-gray-300 text-accent"
                    }`}
                  >
                    {step.completed ? "✓" : step.id}
                  </div>
                  <span className="text-xs text-accent">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-tertiary rounded-xl p-3">
          <p className="text-xs font-semibold text-accent uppercase mb-2">
            Access & Permissions
          </p>
          <div className="flex gap-2">
            {accessPermissions.map((permission) => (
              <div
                key={permission.id}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                  permission.active
                    ? "bg-tertiary text-accent border border-tertiary"
                    : "bg-tertiary text-accent"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${permission.color}`}
                />
                {permission.label}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-tertiary rounded-xl p-3">
          <p className="text-xs font-semibold text-accent uppercase mb-2">
            Contract Management
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-2 border-tertiary text-accent hover:bg-tertiary h-9 text-xs font-semibold rounded-lg"
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              Upload Contract
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-tertiary h-9 text-xs font-semibold rounded-lg">
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Send Contract
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-tertiary rounded-3xl p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className={`w-16 h-16 ${contractor.avatarColor}`}>
            <AvatarFallback className="text-tertiary text-xl font-bold">
              {contractor.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-accent">
              {contractor.name}
            </h2>
            <p className="text-accent/60">{contractor.email}</p>
          </div>
        </div>
        <Badge className={`${contractor.statusColor} border-0 px-4 py-1.5`}>
          {contractor.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-tertiary rounded-2xl p-6">
          <div className="flex items-center gap-2 text-accent/60 text-sm mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Projects completed</span>
          </div>
          <h3 className="text-3xl font-bold text-accent mb-1">
            {contractor.projectsCompleted || "0"}
          </h3>
          <p className="text-xs text-accent/60">Total delivered</p>
        </div>

        <div className="bg-tertiary rounded-2xl p-6">
          <div className="flex items-center gap-2 text-accent/60 text-sm mb-2">
            <Clock className="w-4 h-4" />
            <span>Avg. delivery time</span>
          </div>
          <h3 className="text-3xl font-bold text-accent mb-1">
            {contractor.avgDeliveryTime || "--"}
          </h3>
          <p className="text-xs text-accent/60">Per project</p>
        </div>

        <div className="bg-tertiary rounded-2xl p-6">
          <div className="flex items-center gap-2 text-accent/60 text-sm mb-2">
            <Edit className="w-4 h-4" />
            <span>Revision rate</span>
          </div>
          <h3 className="text-3xl font-bold text-accent mb-1">
            {contractor.revisionRate || "--"}
          </h3>
          <p className="text-xs text-accent/60">Of all projects</p>
        </div>
      </div>

      <div className="bg-tertiary rounded-2xl p-6">
        <h4 className="text-sm font-semibold text-accent/70 uppercase mb-4">
          Onboarding Progress
        </h4>
        <div className="relative">
          <div
            className="absolute top-4 left-0 right-0 h-1 bg-accent/10"
            style={{ left: "2%", right: "2%" }}
          >
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: "37.5%" }}
            />
          </div>

          <div className="flex justify-between relative">
            {onboardingSteps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                    step.completed
                      ? "bg-primary text-tertiary"
                      : "bg-tertiary border-2 border-accent/20 text-accent/40"
                  }`}
                >
                  {step.completed ? "✓" : step.id}
                </div>
                <span className="text-xs text-accent/60">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-tertiary rounded-2xl p-6">
        <h4 className="text-sm font-semibold text-accent/70 uppercase mb-4">
          Access & Permissions
        </h4>
        <div className="flex gap-3">
          {accessPermissions.map((permission) => (
            <div
              key={permission.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                permission.active
                  ? "bg-accent/5 text-accent border border-accent/20"
                  : "bg-accent/5 text-accent/40"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${permission.color}`} />
              {permission.label}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-tertiary rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-accent/70 uppercase">
            Contract Management
          </h4>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-accent/20 text-accent hover:bg-accent/5 gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload New Contract
            </Button>

            <Button className="bg-primary hover:bg-primary/90 text-tertiary gap-2">
              <Send className="w-4 h-4" />
              Send Contract
            </Button>
          </div>
        </div>

        <div className="p-4 bg-accent/5 rounded-lg">
          <button className="flex items-center gap-2 text-primary hover:text-primary/80">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Message Contractor</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractorDetail;
