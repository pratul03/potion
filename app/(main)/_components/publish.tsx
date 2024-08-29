"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, CopyIcon, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PublishProp {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProp) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      unstyled: false,
      duration: 700,
      classNames: {
        error: "bg-red-400/40 text-red-600 mb-5 dark:border-none",
        success: "text-emerald-600 bg-emerald-300/40 sm:mb-5 dark:border-none",
      },
      loading: "Publishing new Note..",
      success: "Note Published Successfully!",
      error: "Failed to Publish!",
    });
  };
  const onUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      unstyled: false,
      duration: 700,
      classNames: {
        error: "bg-red-400/40 text-red-600 mb-5 dark:border-none",
        success: "text-emerald-600 bg-emerald-300/40 sm:mb-5 dark:border-none",
      },
      loading: "Unpublished Note..",
      success: "Note Unpublished Successfully!",
      error: "Failed to unpublished!",
    });
  };

  // const onCopy = () => {
  //   navigator.clipboard.writeText(url);

  //   setCopied(true);
  //   setTimeout(() => {
  //     setCopied(false);
  //   }, 1000);
  // };
  const onCopy = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          alert("Copying to clipboard is not supported on this device.");
        });
    } else {
      // Fallback method for older browsers or unsupported devices
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
        alert("Copying to clipboard is not supported on this device.");
      }

      document.body.removeChild(textArea);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className="h-4 w-4 ml-2 text-sky-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex i-c gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-sky-500">
                This note is live!
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              className="w-full text-xs"
              size="sm"
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 to-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note.</p>
            <span className="text-xs to-muted-foreground mb-4">
              Share your work with others
            </span>
            <Button
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onPublish}
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
