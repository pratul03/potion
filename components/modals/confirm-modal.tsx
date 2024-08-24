"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

export const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
  const handleConfirm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onConfirm();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are sure about it ?</AlertDialogTitle>
          <AlertDialogDescription>
            The file will be deleted permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => e.stopPropagation()}
            className="hover:bg-blue-500/30 hover:text-blue-600"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="outline outline-neutral-200 outline-1 bg-transparent text-black hover:text-red-600 hover:bg-red-400/40 dark:text-white dark:hover:text-red-600 dark:hover:bg-red-400 dark:hover:outline-none"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
