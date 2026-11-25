"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog-without-close";
import { Ellipsis, EllipsisVertical, Globe2 } from "lucide-react";

const InstaWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    setIsAndroid(/Android/i.test(ua));
    const isInstagram = /Instagram/.test(ua);
    if (isInstagram) {
      setShowWarning(true);
    }
  }, []);

  if (!showWarning) return null;

  const MenuIcon = isAndroid ? EllipsisVertical : Ellipsis;

  return (
    <Dialog open={showWarning}>
      <DialogContent
        className="w-[calc(100%-2rem)] max-w-sm gap-6 rounded-3xl border-black/5 p-6 font-[family-name:var(--font-geist-sans)] sm:rounded-3xl sm:p-8"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-600">
            <Globe2 className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-xl leading-snug">
              Open in your browser
            </DialogTitle>
            <DialogDescription className="leading-relaxed">
              For the best Wordamour experience, switch from Instagram to your
              usual browser.
            </DialogDescription>
          </div>
        </div>
        <ol className="space-y-3 rounded-2xl bg-stone-50 p-4 text-sm leading-relaxed text-stone-600">
          <li className="flex items-start gap-3">
            <span aria-hidden="true" className="font-medium text-stone-400">
              1
            </span>
            <span>
              Tap the{" "}
              <MenuIcon
                className="inline-block h-4 w-4 align-text-bottom text-stone-700"
                strokeWidth={1.5}
                aria-hidden="true"
              />{" "}
              menu at the top right.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden="true" className="font-medium text-stone-400">
              2
            </span>
            <span>
              Choose the option to{" "}
              <span className="font-medium text-stone-800">
                open in your browser
              </span>.
            </span>
          </li>
        </ol>
      </DialogContent>
    </Dialog>
  );
};

export default InstaWarning;
