import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tag, Briefcase, Clock, Mail, Trash2, X, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClientDetail = ({ client, onBack, isMobile }) => {
  if (isMobile) {
    return (
      <div className="bg-tertiary rounded-t-3xl p-4 pb-6 space-y-3">

        <div className="flex justify-center -mt-2 mb-1">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>


        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className={`w-12 h-12 ${client.avatarColor}`}>
              <AvatarFallback className="text-white text-base font-bold">
                {client.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{client.name}</h2>
              <p className="text-xs text-gray-600">{client.email}</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 border-0 px-2.5 py-0.5 text-xs">
            Active
          </Badge>
        </div>

        <div className="space-y-2.5">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-gray-600 text-xs uppercase font-semibold mb-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>PLAN</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-bold text-gray-900">{client.plan}</h3>
              <p className="text-xs text-gray-600">{client.tenure}</p>
            </div>
          </div>


          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-gray-600 text-xs uppercase font-semibold mb-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>ACTIVE PROJECTS</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-bold text-gray-900">{client.activeProjects}</h3>
              <p className="text-xs text-gray-600">Current workload</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-gray-600 text-xs uppercase font-semibold mb-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>TENURE</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-bold text-gray-900">{client.tenure}</h3>
              <p className="text-xs text-gray-600">Member since</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <p className="text-xs font-semibold text-gray-600 uppercase">ACTIONS</p>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white h-11 text-sm font-semibold rounded-xl"
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-2 border-gray-200 text-gray-900 hover:bg-gray-50 h-11 text-sm font-semibold rounded-xl"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Send Custom Offer
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 h-11 text-sm font-semibold rounded-xl"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Client
          </Button>
        </div>
      </div>
    );
  }

  // Desktop view (original design)
  return (
    <div className="bg-tertiary rounded-3xl p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className={`w-16 h-16 ${client.avatarColor}`}>
            <AvatarFallback className="text-white text-xl font-bold">
              {client.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-accent">{client.name}</h2>
            <p className="text-accent/60">{client.email}</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-700 border-0 px-3 py-1">
          {client.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-tertiary rounded-2xl p-6">
          <div className="flex items-center gap-2 text-accent/60 text-sm mb-2">
            <Tag className="w-4 h-4" />
            <span>Plan</span>
          </div>
          <h3 className="text-2xl font-bold text-accent mb-1">{client.plan}</h3>
          <p className="text-xs text-accent/60">{client.memberSince}</p>
        </div>

        <div className="bg-tertiary rounded-2xl p-6">
          <div className="flex items-center gap-2 text-accent/60 text-sm mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Active projects</span>
          </div>
          <h3 className="text-2xl font-bold text-accent mb-1">{client.activeProjects}</h3>
          <p className="text-xs text-accent/60">Current workload</p>
        </div>

        <div className="bg-tertiary rounded-2xl p-6">
          <div className="flex items-center gap-2 text-accent/60 text-sm mb-2">
            <Clock className="w-4 h-4" />
            <span>Tenure</span>
          </div>
          <h3 className="text-2xl font-bold text-accent mb-1">{client.tenure}</h3>
          <p className="text-xs text-accent/60">Member since</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-accent/70 uppercase mb-4">Actions</h4>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex flex-col lg:flex-row gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2 w-full lg:w-auto">
              <Mail className="w-4 h-4" />
              Send Message
            </Button>
            <Button variant="outline" className="border-accent/20 text-accent hover:bg-accent/5 gap-2 w-full lg:w-auto">
              <Tag className="w-4 h-4" />
              Send Custom Offer
            </Button>
          </div>
          <Button variant="ghost" className="text-danger hover:bg-danger/10 hover:text-danger gap-2 w-full lg:w-auto">
            <Trash2 className="w-4 h-4" />
            Delete Client
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;