import React from "react";
import { Card, CardContent } from "../ui/card";

const BrandVoiceSection = () => {
  return (
    <Card className="bg-tertiary rounded-2xl">
      <CardContent className="flex flex-col gap-5">
        <header>
          <h3 className="text-xl md:text-2xl text-accent font-semibold mb-2">
            Brand Voice
          </h3>

          <p className="font-medium text-slate-600 text-xs md:text-base">
            Describe your brand voice, style, or messaging preferences for
            consistent storytelling.
          </p>
        </header>

        <textarea
          placeholder="Example: Innovation, drive vision, modern excellence. Always keep a pitch tone."
          className="w-full h-40 md:h-30 resize-none rounded-lg bg-white px-3 py-2
         focus:outline-none text-sm"
        ></textarea>
      </CardContent>
    </Card>
  );
};

export default BrandVoiceSection;
