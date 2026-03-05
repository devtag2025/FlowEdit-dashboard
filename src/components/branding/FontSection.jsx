"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";

const FontSection = () => {
  const fonts = [
    "Inter",
    "Roboto",
    "Times New Roman",
    "Lato",
    "Montserrat",
    "Segoe UI Symbol",
  ];

  const [headingFont, setHeadingFont] = useState("Inter");
  const [bodyFont, setBodyFont] = useState("Inter");
  return (
    <Card className="bg-tertiary rounded-2xl">
      <CardContent className="flex flex-col gap-5">
        <header>
          <h3 className="text-xl md:text-2xl text-accent font-semibold mb-2">
            Fonts
          </h3>

          <p className="font-medium text-slate-600 text-xs md:text-base">
            Choose your preferred display and body fonts for titles, captions,
            and content.
          </p>
        </header>

        {/* Heading Font */}
        <div className="space-y-4">
          <label className="block text-accent font-semibold">
            Heading Font
          </label>
          <select
            value={headingFont}
            onChange={(e) => setHeadingFont(e.target.value)}
            className="w-full p-4 rounded-lg bg-white focus:outline-none text-sm md:text-base"
          >
            {fonts.map((font) => (
              <option key={font} value={font} className="text-slate-600">
                {font}
              </option>
            ))}
          </select>

          <div className="bg-white p-8 rounded-lg">
            <h3
              className="text-xl md:text-2xl text-accent"
              style={{ fontFamily: headingFont }}
            >
              The quick brown fox
            </h3>
          </div>
        </div>

        {/* Body Font */}
        <div className="space-y-4">
          <label className="block text-accent font-semibold">Body Font</label>
          <select
            value={bodyFont}
            onChange={(e) => setBodyFont(e.target.value)}
            className="w-full p-4 rounded-lg bg-white focus:outline-none text-sm md:text-base"
          >
            {fonts.map((font) => (
              <option key={font} value={font} className="text-slate-600">
                {font}
              </option>
            ))}
          </select>

          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-accent" style={{ fontFamily: bodyFont }}>
              The quick brown fox jumps over the lazy dog
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FontSection;
