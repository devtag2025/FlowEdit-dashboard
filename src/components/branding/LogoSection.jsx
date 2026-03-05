import React from "react";
import { Card, CardContent } from "../ui/card";
import { Image } from "lucide-react";
import { Button } from "../common/Button";

const LogoSection = () => {
  const logos = ["Primary Logos", "Secondary Logos"];
  return (
    <Card className="bg-tertiary rounded-2xl">
      <CardContent className="flex flex-col gap-5">
        <header>
          <h3 className="text-xl md:text-2xl text-accent font-semibold mb-2">
            Logos
          </h3>

          <p className="font-medium text-slate-600 text-xs md:text-base">
            Upload your logo files in all orientations. These are your primary
            all-purpose visuals.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          {logos.map((logo) => (
            <div
              className="border-slate-300 border-dashed border md:border-2 rounded-lg md:rounded-xl bg-white py-8 px-10 md:px-20 md:py-18 hover:border-primary transition"
              key={logo}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <Image className="text-slate-400 md:h-8 w-8" />
                <h5 className="text-accent font-semibold md:text-xl text-base">
                  {logo}
                </h5>
                <Button className="text-slate-600 font-medium">
                  Click to upload
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-slate-600 text-xs text-center md:text-sm md:text-left">
          File Size: Under 25MB • PNG Recommended
        </p>
      </CardContent>
    </Card>
  );
};

export default LogoSection;
