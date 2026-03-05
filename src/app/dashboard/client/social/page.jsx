"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { socialPlatforms } from "@/utils/social";
import { SocialCard } from "@/components/Social/SocialCard";
import { Lock } from "lucide-react";
export default function SocialConnections() {
  return (
    <div className="min-h-screen p-6 bg-secondary">
      <div className="max-w-7xl mx-auto space-y-5">
        <Card className="border rounded-3xl shadow-none bg-tertiary">
          <CardContent className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-3xl text-accent font-bold font-onest mb-2 sm:mb-3">
              Social Connections
            </h1>

            <p className="text-sm sm:text-md font-extralight font-onest text-accent tracking-wide leading-relaxed max-w-3xl">
              Connect your social accounts so FlowEdit can upload and publish
              videos on your behalf. All connections use secure OAuth — FlowEdit
              never sees your passwords.
            </p>
          </CardContent>
        </Card>

        <Card className="border rounded-3xl shadow-none bg-tertiary">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl text-accent font-bold font-onest mb-2">
                  Publishing not included in your plan
                </h3>

                <p className="text-sm sm:text-md font-extralight font-onest text-accent tracking-wide leading-relaxed">
                  Connect accounts now and upgrade to unlock automatic posting
                  to YouTube, Instagram, Facebook, and TikTok.
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  Auto-posting is available on FlowEdit Growth and Pro plans
                </p>
              </div>

              <Button className="w-full sm:w-auto bg-primary text-white font-bold px-6 h-11 rounded-2xl text-base sm:text-lg font-onest">
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialPlatforms.map((platform) => (
            <SocialCard key={platform.platform} {...platform} />
          ))}
        </div>

        <Card className="border rounded-3xl shadow-none bg-tertiary">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-green-50 rounded-full p-2 sm:p-2.5 flex-shrink-0">
                <Lock className="w-6 h-6 sm:w-10 sm:h-10 text-green-600" />
              </div>

              <div>
                <h3 className="font-semibold text-lg sm:text-2xl text-accent font-onest mb-1 sm:mb-1.5">
                  Security & Permissions
                </h3>

                <p className="text-sm font-light font-onest text-accent tracking-wide leading-relaxed">
                  All social connections use Official APIs from Google, Meta,
                  and TikTok. You can revoke access at any time from your social
                  account settings. FlowEdit never stores your passwords — only
                  secure access tokens with limited permissions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
