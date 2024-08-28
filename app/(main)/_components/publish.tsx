"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

interface PublishProp{
    initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProp) => {
    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied, setCopied] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true,
        })
            .finally(() => setSubmitting(false));
        
        toast.promise(promise, {
          unstyled: false,
          duration: 700,
          classNames: {
            error: "bg-red-400/40 text-red-600 mb-5 dark:border-none",
            success:
              "text-emerald-600 bg-emerald-300/40 sm:mb-5 dark:border-none",
          },
          loading: "Publishing new Note..",
          success: "Note Published Successfully!",
          error: "Failed to Publish!",
        });
    }
    const onUnPublish = () => {
        setSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false,
        })
            .finally(() => setSubmitting(false));
        
        toast.promise(promise, {
          unstyled: false,
          duration: 700,
          classNames: {
            error: "bg-red-400/40 text-red-600 mb-5 dark:border-none",
            success:
              "text-emerald-600 bg-emerald-300/40 sm:mb-5 dark:border-none",
          },
          loading: "Unpublished Note..",
          success: "Note Unpublished Successfully!",
          error: "Failed to unpublished!",
        });
    }
    return (
        <div className="">
            Publish
        </div>
    )
}