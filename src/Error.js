import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WarningBannerProps {
  confirmLabel?: string;
  headerText?: string;
  bodyText?: string;
}

export default function WarningBanner({
  confirmLabel = "Step Inside",
  headerText = "A Final Warning",
  bodyText = "Marked by code, driven by design. Enter if you dare to witness the lair.",
}: WarningBannerProps) {
  const [confirmed, setConfirmed] = useState(false);

  const toggleConfirmed = () => {
    setConfirmed((prev) => !prev);
  };

  const backgroundClasses = confirmed
    ? "bg-purple-700"
    : "bg-gradient-to-r from-black via-gray-900 to-purple-900";

  return (
    <div className="flex justify-center items-center min-h-[220px] p-4">
      <div className="relative max-w-lg rounded-3xl p-5">
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gray-900 shadow-lg"
          animate={{ scale: confirmed ? 0.96 : 1 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
          }}
        />

        <div
          className="relative z-10 flex flex-col items-center text-center cursor-pointer select-none"
          onClick={toggleConfirmed}
        >
          {/* Custom anime/horror inspired icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-3 text-violet-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C7 7 3 12 12 22c9-10 5-15 0-20z"
            />
          </svg>

          {/* Header */}
          <h2 className="text-2xl font-extrabold text-violet-400 tracking-wide">
            {headerText}
          </h2>

          {/* Description with glitch effect */}
          <p className="mt-2 text-indigo-300 glitch-text max-w-xs">
            {bodyText}
          </p>

          {/* Toggle button */}
          <div
            className={cn(
              "mt-5 relative flex w-4/5 h-12 rounded-xl px-3 py-1 items-center transition-colors duration-300",
              backgroundClasses,
            )}
          >
            {/* Toggle slider */}
            <div
              className={`h-10 w-1/2 rounded-lg bg-gray-100 shadow-md transition-transform duration-500 ${
                confirmed ? "translate-x-full" : ""
              }`}
            />

            {/* Confirm label */}
            <span
              className={`absolute right-5 font-semibold text-violet-800 transition-opacity duration-500 ${
                confirmed ? "opacity-0" : "opacity-100"
              } flex items-center gap-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {confirmLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
