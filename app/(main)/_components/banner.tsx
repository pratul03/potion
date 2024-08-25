"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { FileClock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      unstyled: false,
      duration: 500,
      classNames: {
        error: "bg-red-400/40 text-red-600",
        success: "text-orange-600 bg-orange-400/40",
      },
      loading: "Removing note..",
      success: "Note removed!",
      error: "Failed to remove!",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      unstyled: false,
      duration: 500,
      classNames: {
        error: "bg-red-400/40 text-red-600",
        success: "text-blue-600 bg-blue-400/40",
      },
      loading: "Restoring note..",
      success: "Note restored!",
      error: "Failed to restore!",
    });
  };
  return (
    <div className="w-full bg-slate-200/30 text-center justify-center text-sm p-2 text-rose-500 flex items-center gap-x-2 font-semibold dark:text-orange-600 dark:bg-white/5 overflow-hidden">
      <p>This page is in the Trash-Box.</p>
      <Button
        size="sm"
        variant="outline"
        onClick={onRestore}
        className="border-gray-400/30 bg-transparent hover:bg-blue-300/30 hover:text-blue-600 text-black/40 p-1 px-1 h-auto font-normal border-2 dark:border-slate-200/40 dark:text-white/40 hover:border-white/0 hover:scale-125 transition-all duration-100 ease-linear dark:hover:border-white/0 dark:hover:text-blue-500 dark:hover:bg-blue-400/40 "
      >
        <FileClock className="h-4 w-4" />
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-gray-400/30 bg-transparent hover:text-red-600 text-black/40 p-1 px-1 h-auto font-normal border-2 dark:border-slate-200/40 dark:text-white/40
          hover:bg-red-300/20 hover:border-white/0 hover:scale-125 transition-all duration-100 ease-linear dark:hover:border-white/0 dark:hover:text-red-500 dark:hover:bg-red-400/30
          "
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
