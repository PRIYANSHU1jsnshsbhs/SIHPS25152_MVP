import React from "react";

export default function SchemeSkeleton() {
  return (
    <div className="animate-pulse rounded-xl bg-white ring-1 ring-gray-200 p-5 space-y-4">
      <div className="h-4 w-2/3 bg-gray-200 rounded" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
      </div>
      <div className="h-8 w-24 bg-gray-200 rounded" />
    </div>
  );
}
