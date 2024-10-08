"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { FileClock, Search, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");
  const filterDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();

    const promise = restore({ id: documentId });
    toast.promise(promise, {
      unstyled: false,
      duration: 700,
      classNames: {
        error: "bg-red-400/40 text-red-600",
        success:
          "text-blue-600 bg-blue-400/40 dark:text-blue-500 dark:border-none dark:bg-blue-300/30 text-medium font-lg",
      },
      loading: "Restoring note..",
      success: "Note restored!",
      error: "Failed to restore!",
    });
  };
  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      unstyled: false,
      duration: 700,
      position: "bottom-left",
      classNames: {
        error: "bg-red-400/40 text-red-600 mb-4",
        success:
          "text-red-600 bg-red-400/40 dark:border-none dark:bg-red-300/30 font-semibold text-md dark:text-red-500 mb-5",
      },
      loading: "Removing note..",
      success: "Note removed!",
      error: "Failed to remove!",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-2 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filterDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                className="rounded-sm p-2 hover:bg-green-400/30  transition-all"
                role="button"
                onClick={(e) => onRestore(e, document._id)}
              >
                <FileClock className="h-4 w-4 text-muted-foreground hover:text-green-600" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  className="rounded-sm p-2 hover:bg-red-300/30"
                  role="button"
                >
                  <Trash className="h-4 w-4 text-muted-foreground hover:text-red-400" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
