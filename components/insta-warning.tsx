"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog-without-close";
import { EllipsisVertical } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const InstaWarning = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    const isInstagram = /Instagram/.test(ua);
    if (isInstagram) {
      setShowWarning(true);
    }
  }, []);

  if (!showWarning) return null;

  return (
    <Dialog open={showWarning} onOpenChange={setShowWarning}>
      <VisuallyHidden>
        <DialogTitle></DialogTitle>
      </VisuallyHidden>
      <DialogContent
        className="p-8 rounded-xl w-[84%] font-[family-name:var(--font-geist-sans)]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <p>⚠️</p>
        <p>Instagram&apos;s in-app browser does not support all features.</p>
        <p>
          Please open in your browser using the{" "}
          <EllipsisVertical
            className="h-5 w-5 inline-block"
            strokeWidth={1.5}
          />{" "}
          menu (top-right).
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default InstaWarning;
