import React from "react";
import { Card, CardContent } from "../ui/card";
import { Plus } from "lucide-react";
import { Button } from "../common/Button";

const ColorSection = () => {
  const colors = ["#6a4dff", "#a5c9e8", "#e888f8", "#ff4d6a", "#2d1b69"];
  return (
    <Card className="bg-tertiary rounded-2xl">
      <CardContent className="flex flex-col gap-5">
        <header>
          <h3 className="text-xl md:text-2xl text-accent font-semibold mb-2">
            Brand Colors
          </h3>

          <p className="font-medium text-slate-600 text-xs md:text-base">
            Set your primary and secondary brand colors. These determine color
            palettes, call-to-actions, and editing.
          </p>
        </header>

        <div className="flex gap-1 md:gap-4 flex-wrap">
          {colors.map((color) => (
            <div key={color} className="flex flex-col items-center gap-3">
              <div
                className="w-11 md:w-32 aspect-square rounded-lg cursor-pointer hover:scale-105 transition"
                style={{ backgroundColor: color }}
              />
              <span className="hidden md:block text-sm uppercase font-semibold text-accent border-2 border-slate-300 p-2 rounded-lg">
                {color}
              </span>
            </div>
          ))}
        </div>

        <div>
          <Button className="flex items-center gap-2 bg-pink-200 px-3 py-2 rounded-lg font-bold text-blue-500 text-xs md:text-base">
            <Plus className="text-purple-500 w-4 h-4" />
            Add Color
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorSection;
