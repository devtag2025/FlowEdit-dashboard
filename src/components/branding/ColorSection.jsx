"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Plus, X } from "lucide-react";

const ColorSection = ({ colors, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [newColor, setNewColor] = useState("#6a4dff");

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      onChange([...colors, newColor]);
    }
    setNewColor("#6a4dff");
    setShowPicker(false);
  };

  const removeColor = (color) => {
    onChange(colors.filter((c) => c !== color));
  };

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
            <div key={color} className="flex flex-col items-center gap-3 group relative">
              <div
                className="w-11 md:w-32 aspect-square rounded-lg cursor-pointer hover:scale-105 transition"
                style={{ backgroundColor: color }}
              />
              <button
                onClick={() => removeColor(color)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              <span className="hidden md:block text-sm uppercase font-semibold text-accent border-2 border-slate-300 p-2 rounded-lg">
                {color}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {showPicker ? (
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={newColor}
                onInput={(e) => setNewColor(e.target.value)}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                maxLength={7}
                className="w-24 text-sm font-semibold text-accent uppercase border-2 border-slate-300 p-2 rounded-lg bg-white"
              />
              <button
                onClick={addColor}
                className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer"
              >
                Add
              </button>
              <button
                onClick={() => setShowPicker(false)}
                className="text-slate-500 text-sm font-semibold hover:text-accent cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-2 bg-pink-200 px-3 py-2 rounded-lg font-bold text-blue-500 text-xs md:text-base cursor-pointer"
            >
              <Plus className="text-purple-500 w-4 h-4" />
              Add Color
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorSection;
