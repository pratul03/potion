"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MenuProps {
  documentId: Id<"documents">;
}
export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      unstyled: false,
      duration: 700,
      classNames: {
        error: "bg-red-400/40 text-red-600 mb-5 dark:border-none",
        success: "text-red-500 bg-red-400/30 sm:mb-5 dark:border-none",
      },
      loading: "Moving to trash",
      success: "Note moved to trash!",
      error: "Failed to archive!",
    });
    router.push("/documents");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 bg-white/5"
        align="end"
        alignOffset={8}
      >
        <DropdownMenuItem onClick={onArchive} className="hover:bg-red-500/10">
          <div className="hover:text-red-600 flex transition-all ease-linear duration-150 text-sm text-muted-foreground w-full">
            <Trash2 className="h-4 w-4 mr-2" />
            Move to Trash
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-8 w-10" />;
};
