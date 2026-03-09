"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  Loader2,
  Bell,
  NotebookIcon,
  PencilRuler,
  Share2,
  BriefcaseBusiness,
  RadioIcon,
  UserRoundIcon,
  UsersRound,
  House,
  DollarSign,
  FileText,
  FolderOpen,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navigationConfig = {
  client: [
    { name: "Dashboard", href: "/dashboard/client", icon: LayoutDashboard },
    { name: "Notification", href: "/dashboard/client/notification", icon: Bell },
    { name: "Branding", href: "/dashboard/client/branding", icon: PencilRuler },
    { name: "Social", href: "/dashboard/client/social", icon: Share2 },
    { name: "Service", href: "/dashboard/client/service", icon: BriefcaseBusiness },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Broadcasts", href: "/dashboard/admin/broadcasts", icon: RadioIcon },
    { name: "Clients", href: "/dashboard/admin/clients", icon: UserRoundIcon },
    { name: "Contractors", href: "/dashboard/admin/contractors", icon: UsersRound },
  ],
  contractor: [
    { name: "Dashboard", href: "/dashboard/contractor", icon: House },
    { name: "Earnings", href: "/dashboard/contractor/earnings", icon: DollarSign },
    { name: "Contracts", href: "/dashboard/contractor/contracts", icon: FileText },
    { name: "Resources", href: "/dashboard/contractor/resources", icon: FolderOpen },
    { name: "Notifications", href: "/dashboard/contractor/notification", icon: Bell },
  ],
};

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const role = pathname.split("/")[2]; // "client" | "admin" | "contractor"
  const navigation = navigationConfig[role] || navigationConfig.client;

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, avatar_url")
          .eq("id", user.id)
          .single();
        setUserProfile(profile);
        console.log("profile",profile)
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) => {
    if (href === `/dashboard/${role}`) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const onLogout = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-white">
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-72`}
      >
        <div className="h-full flex flex-col bg-linear-to-b bg-primary  backdrop-blur-xl">
          <div className="flex items-center justify-between px-20 pt-8 pb-6 ">
            <Link href={`/dashboard/${role}`} className="flex items-center gap-3 group">
              <span className="text-3xl font-extrabold font-onest">
                FlowEdit
              </span>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 relative left-12 bottom-8 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`relative flex items-center gap-3 px-5 py-2 rounded-xl transition-all duration-300 group
    ${
      active
        ? `
          bg-linear-to-tr from-purple-500/70 to-secondary/50
          text-white
          shadow-lg shadow-primary/25
        `
        : `
          text-accent
          hover:bg-white/30
          hover:shadow-md hover:shadow-purple-500/10
          active:bg-white/10
        `
    }
  `}
                  aria-current={active ? "page" : undefined}
                >
                  <div
                    className={`group flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      active ? "bg-tertiary" : "bg-transparent"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        active
                          ? "text-accent"
                          : "text-white/70 group-hover:text-tertiary/80"
                      }`}
                    />
                  </div>

                  <span
                    className={`font-medium ${
                      active
                        ? "text-accent"
                        : "text-white group-hover:text-tertiary/80"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}

            <button
              disabled={isLoading}
              onClick={onLogout}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl
                hover:bg-white/5 border border-transparent hover:border-purple-500/30
                transition-all duration-300 group text-left active:bg-white/10
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02]"
                }`}
              aria-busy={isLoading}
              aria-label={isLoading ? "Logging out…" : "Logout"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="font-medium text-gray-400">
                    Logging out…
                  </span>
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <span className="font-medium text-gray-400 group-hover:text-white transition-colors">
                    Logout
                  </span>
                </>
              )}
            </button>
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-tertiary">
              <button className="flex-1 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 lg:bg-white lg:text-accent lg:shadow-lg hidden lg:block">
                Desktop
              </button>
              <button className="flex-1 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 lg:text-tertiary lg:hover:text-white lg:hidden bg-white text-accent shadow-lg">
                Mobile
              </button>
              <button className="flex-1 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 text-tertiary hover:text-white hidden lg:block">
                Mobile
              </button>
              <button className="flex-1 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 text-tertiary hover:text-white lg:hidden">
                Desktop
              </button>
            </div>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="lg:ml-72 pb-20 lg:pb-0">
        <header
          className={`sticky top-0 z-20 bg-secondary transition-all duration-300 ${
            isScrolled
              ? "shadow-lg bg-secondary/95"
              : "shadow-none bg-secondary/90"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2  hover:bg-gray-900 border border-tertiary rounded-full transition-colors active:bg-gray-800"
                aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="w-5 h-5 text-accent" />
              </button>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <Link href={`/dashboard/${role}/notification`}>
                <button
                  className="relative sm:flex bg-tertiary p-2.5 lg:p-3 rounded-full hover:bg-purple-500/20 transition-colors active:scale-95 cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="text-accent w-4 h-4 lg:w-5 lg:h-5" />

                  {unreadCount > 0 && (
                    <span
                      className={`absolute -top-1 -right-1 flex items-center justify-center text-[10px] ${
                        unreadCount > 9 ? "min-w-5 h-5 " : "min-w-4.5 h-4.5"
                      } font-bold text-white bg-red-500 rounded-full`}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>
              </Link>

              <Link href={`/dashboard/${role}/profile`}>
                <div className="relative flex items-center gap-2 px-1 py-1 lg:px-3 lg:py-2 rounded-full lg:rounded-full bg-tertiary hover:border-purple-400/70 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.7)] transition-all duration-300 active:scale-95">
                  <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden bg-linear-to-br from-purple-600 to-purple-400 shrink-0">
                    {userProfile?.avatar_url ? (
                      <Image
                        src={userProfile.avatar_url}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                        {userProfile?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>

                  <span className="hidden lg:block text-sm lg:text-base font-semibold text-accent">
                    {userProfile?.name || "User"}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
      </div>
    </div>
  );
}
