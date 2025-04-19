
import { FileType } from "@/types/file";
import { useFileSystem } from "@/hooks/useFileSystem";
import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

interface FileContextMenuProps {
  file: FileType;
  children: React.ReactNode;
}

export function FileContextMenu({ file, children }: FileContextMenuProps) {
  const { deleteFile, addFile } = useFileSystem();
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const handleDelete = () => {
    deleteFile(file.id);
    toast({
      title: "File deleted",
      description: `${file.name} has been deleted`,
    });
  };

  const handleRename = () => {
    deleteFile(file.id);
    addFile({
      ...file,
      id: Date.now().toString(),
      name: newName,
    });
    setIsRenameDialogOpen(false);
    toast({
      title: "File renamed",
      description: `${file.name} has been renamed to ${newName}`,
    });
  };

  const handleNewFolder = () => {
    addFile({
      id: Date.now().toString(),
      name: "New Folder",
      type: "folder",
      parentFolder: file.parentFolder,
    });
    toast({
      title: "Folder created",
      description: "New folder has been created",
    });
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          {file.type === "folder" && (
            <ContextMenuItem onClick={handleNewFolder}>
              New Folder
            </ContextMenuItem>
          )}
          <ContextMenuItem onClick={() => setIsRenameDialogOpen(true)}>
            Rename
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className="text-red-600" onClick={handleDelete}>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename {file.type}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New name"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRename}>Rename</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
