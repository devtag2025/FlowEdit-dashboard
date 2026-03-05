import React from "react";
import { Card, CardContent } from "../ui/card";
import { Acesses, tools } from "@/utils/resource";
import { StatusBadge } from "./StatusBadges";

const AccessTools = () => {
  return (
    <Card className="bg-tertiary md:rounded-3xl">
      <CardContent className="flex flex-col gap-5 p-3 md:px-6">
        <div className="flex flex-col gap-4">
          <h3 className="text-accent text-xl md:text-2xl font-semibold md:font-bold">
            Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {Acesses.map((access) => (
              <Card className="flex border-none rounded-lg md:rounded-3xl">
                <CardContent className="flex justify-between items-center ">
                  <h4 className="text-accent font-medium md:font-semibold text-base md:text-lg">
                    {access.title}
                  </h4>
                  <StatusBadge status={access.status} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-accent text-xl md:text-2xl font-semibold md:font-bold">
            Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {tools.map((tool) => (
              <Card className="flex border-none rounded-lg md:rounded-3xl">
                <CardContent className="flex justify-between items-center">
                  <h4 className="text-accent font-medium md:font-semibold text-base md:text-lg">
                    {tool.title}
                  </h4>
                  <StatusBadge status={tool.status} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <p className="text-slate-700 text-center md:text-left text-sm md:text-base">
          Contact support if any access looks incorrect.
        </p>
      </CardContent>
    </Card>
  );
};

export default AccessTools;
