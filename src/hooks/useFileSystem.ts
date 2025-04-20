
import { create } from "zustand";
import { FileType, FileStructure } from "@/types/file";

interface FileSystemState {
  fileStructure: FileStructure;
  currentFolder: string;
  folderHistory: string[];
  historyIndex: number;
  currentFiles: FileType[];
  navigateToFolder: (folderId: string) => void;
  navigateBack: () => void;
  navigateForward: () => void;
  addFile: (file: FileType) => void;
  deleteFile: (fileId: string) => void;
  updateFileName: (fileId: string, newName: string) => void;
}

// Demo data
const initialFileStructure: FileStructure = {
  root: [
    { id: "videos", name: "Videos", type: "folder", parentFolder: "root" },
    { id: "music", name: "Music", type: "folder", parentFolder: "root" },
    { id: "documents", name: "Documents", type: "folder", parentFolder: "root" },
    { id: "images", name: "Images", type: "folder", parentFolder: "root" },
  ],
  videos: [
    { 
      id: "video1", 
      name: "Demo Video.mp4", 
      type: "video", 
      size: "15.2 MB", 
      parentFolder: "videos",
      url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" 
    },
  ],
  music: [
    { 
      id: "audio1", 
      name: "Demo Song.mp3", 
      type: "audio", 
      size: "4.8 MB", 
      parentFolder: "music",
      url: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3" 
    },
  ],
  documents: [
    { 
      id: "doc1", 
      name: "README.txt", 
      type: "document", 
      size: "2.1 KB", 
      parentFolder: "documents",
      url: "#" 
    },
  ],
  images: [],
};

export const useFileSystem = create<FileSystemState>((set, get) => ({
  fileStructure: initialFileStructure,
  currentFolder: "root",
  folderHistory: ["root"],
  historyIndex: 0,
  currentFiles: initialFileStructure.root,
  
  navigateToFolder: (folderId: string) => {
    const { folderHistory, historyIndex } = get();
    const newHistory = folderHistory.slice(0, historyIndex + 1);
    newHistory.push(folderId);
    
    set({
      currentFolder: folderId,
      folderHistory: newHistory,
      historyIndex: newHistory.length - 1,
      currentFiles: get().fileStructure[folderId] || [],
    });
  },
  
  navigateBack: () => {
    const { folderHistory, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const prevFolder = folderHistory[newIndex];
      
      set({
        currentFolder: prevFolder,
        historyIndex: newIndex,
        currentFiles: get().fileStructure[prevFolder] || [],
      });
    }
  },
  
  navigateForward: () => {
    const { folderHistory, historyIndex } = get();
    if (historyIndex < folderHistory.length - 1) {
      const newIndex = historyIndex + 1;
      const nextFolder = folderHistory[newIndex];
      
      set({
        currentFolder: nextFolder,
        historyIndex: newIndex,
        currentFiles: get().fileStructure[nextFolder] || [],
      });
    }
  },
  
  addFile: (file: FileType) => {
    const { fileStructure, currentFolder } = get();
    const updatedFiles = [...(fileStructure[file.parentFolder] || []), file];
    
    set({
      fileStructure: {
        ...fileStructure,
        [file.parentFolder]: updatedFiles,
      },
      currentFiles: file.parentFolder === currentFolder ? updatedFiles : get().currentFiles,
    });
  },
  
  deleteFile: (fileId: string) => {
    const { fileStructure, currentFolder } = get();
    const updatedFiles = fileStructure[currentFolder].filter(file => file.id !== fileId);
    
    set({
      fileStructure: {
        ...fileStructure,
        [currentFolder]: updatedFiles,
      },
      currentFiles: updatedFiles,
    });
  },

  updateFileName: (fileId: string, newName: string) => {
    const { fileStructure, currentFolder } = get();
    
    // Find the file to update
    const fileToUpdate = fileStructure[currentFolder].find(file => file.id === fileId);
    
    if (fileToUpdate) {
      // Create updated file list with the renamed file
      const updatedFiles = fileStructure[currentFolder].map(file => 
        file.id === fileId ? { ...file, name: newName } : file
      );
      
      // Update the file structure
      set({
        fileStructure: {
          ...fileStructure,
          [currentFolder]: updatedFiles,
        },
        currentFiles: updatedFiles,
      });
    }
  },
}));
