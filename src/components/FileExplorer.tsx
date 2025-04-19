
import { useState } from "react";
import { 
  File, 
  Folder, 
  FileVideo, 
  FileAudio, 
  ArrowLeft, 
  ArrowRight, 
  FolderOpen 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useFileSystem } from "@/hooks/useFileSystem";
import { cn } from "@/lib/utils";
import { FileType } from "@/types/file";
import MediaPlayer from "./MediaPlayer";
import DocumentViewer from "./DocumentViewer";
import FileUploader from "./FileUploader";

export default function FileExplorer() {
  const { 
    currentFiles, 
    currentFolder, 
    navigateToFolder, 
    folderHistory, 
    navigateBack, 
    navigateForward 
  } = useFileSystem();
  
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const getFileIcon = (file: FileType) => {
    switch (file.type) {
      case "video":
        return <FileVideo className="file-icon" />;
      case "audio":
        return <FileAudio className="file-icon" />;
      case "folder":
        return <FolderOpen className="file-icon" />;
      default:
        return <File className="file-icon" />;
    }
  };

  const handleFileOpen = (file: FileType) => {
    if (file.type === "folder") {
      navigateToFolder(file.id);
    } else {
      setSelectedFile(file);
      setPreviewOpen(true);
    }
  };
  
  const renderFilePreview = () => {
    if (!selectedFile) return null;
    
    switch (selectedFile.type) {
      case "video":
        return <MediaPlayer file={selectedFile} type="video" />;
      case "audio":
        return <MediaPlayer file={selectedFile} type="audio" />;
      default:
        return <DocumentViewer file={selectedFile} />;
    }
  };

  const breadcrumbItems = folderHistory.slice(0, folderHistory.indexOf(currentFolder) + 1);

  return (
    <div className="w-full p-6 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={navigateBack} 
              disabled={folderHistory.indexOf(currentFolder) === 0}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={navigateForward} 
              disabled={folderHistory.indexOf(currentFolder) === folderHistory.length - 1}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigateToFolder("root")}>
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbItems.slice(1).map((folder, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbLink 
                    onClick={() => navigateToFolder(folder)}
                    className="capitalize"
                  >
                    {folder}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </div>
          
          <FileUploader currentFolder={currentFolder} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {currentFiles.map((file) => (
            <Tooltip key={file.id}>
              <TooltipTrigger asChild>
                <div 
                  className={cn(
                    "file-card animate-slide-up cursor-pointer",
                    file.type === "folder" && "bg-secondary/50"
                  )}
                  onClick={() => handleFileOpen(file)}
                >
                  {getFileIcon(file)}
                  <span className="text-sm font-medium truncate w-full text-center">
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {file.type !== "folder" && (file.size || "Unknown size")}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.type === "folder" ? "Folder" : `${file.type.toUpperCase()} File`}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
          
          {currentFiles.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
              <Folder className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">This folder is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Upload files using the button in the top right corner
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
          </DialogHeader>
          <div className="min-h-[300px] flex items-center justify-center">
            {renderFilePreview()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
