import React from "react";

export default function SchemeCard({ scheme, onApply }) {
  return (
    <article
      className="group relative flex flex-col rounded-xl bg-white ring-1 ring-gray-200 shadow-sm hover:shadow-md hover:ring-indigo-200 transition overflow-hidden"
      aria-labelledby={`scheme-${scheme._id}`}
    >
      <div className="p-5 flex-1 flex flex-col">
        <h3
          id={`scheme-${scheme._id}`}
          className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition"
        >
          {scheme.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {scheme.description}
        </p>
        <p className="mt-3 text-xs font-medium text-gray-500">
          Eligibility: <span className="font-normal">{scheme.eligibility}</span>
        </p>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onApply(scheme._id)}
            className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Apply
          </button>
          <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100">
            {scheme.fee ? `₹${scheme.fee}` : "Free"}
          </span>
        </div>
      </div>
    </article>
  );
}
