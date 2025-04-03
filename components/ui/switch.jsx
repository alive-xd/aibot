import { useState } from "react";

export function Switch({ checked, onCheckedChange }) {
  return (
    <label className="flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={() => onCheckedChange(!checked)} className="hidden" />
      <div className={`w-10 h-5 rounded-full ${checked ? "bg-green-500" : "bg-gray-300"}`}></div>
    </label>
  );
}
