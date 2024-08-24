"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { useSettings } from "@/hooks/use-settings";

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My Settings</h2>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
