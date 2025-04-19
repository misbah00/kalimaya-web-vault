
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFileSystem } from "@/hooks/useFileSystem";

interface FileUploaderProps {
  currentFolder: string;
}

export default function FileUploader({ currentFolder }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { addFile } = useFileSystem();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    // Determine file type
    let fileType = "document";
    if (file.type.startsWith("video/")) {
      fileType = "video";
    } else if (file.type.startsWith("audio/")) {
      fileType = "audio";
    } else if (file.type.startsWith("image/")) {
      fileType = "image";
    }

    // Create a file URL (In a real app, this would be a server upload)
    const fileUrl = URL.createObjectURL(file);

    // Add the file to the current folder
    addFile({
      id: Date.now().toString(),
      name: file.name,
      type: fileType as any,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      url: fileUrl,
      parentFolder: currentFolder,
    });

    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully`,
    });

    setFile(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>
            Upload a file to your current folder. Supported files include documents, videos, and audio.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              File
            </Label>
            <Input
              id="file"
              type="file"
              className="col-span-3"
              onChange={handleFileChange}
            />
          </div>
          {file && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-1"></div>
              <div className="col-span-3">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
