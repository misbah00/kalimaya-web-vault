
import { useState } from "react";
import { 
  Sidebar, 
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { File, Folder, FolderOpen, Music, Video } from "lucide-react";
import { useFileSystem } from "@/hooks/useFileSystem";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { currentFolder, navigateToFolder, fileStructure } = useFileSystem();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-kalimaya-500 flex items-center justify-center">
            <FolderOpen className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold">Kalimaya Storage</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={cn(
                    "flex items-center space-x-2",
                    currentFolder === "root" && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => navigateToFolder("root")}
                >
                  <Folder className="h-5 w-5" />
                  <span>All Files</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={cn(
                    "flex items-center space-x-2",
                    currentFolder === "videos" && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => navigateToFolder("videos")}
                >
                  <Video className="h-5 w-5" />
                  <span>Videos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={cn(
                    "flex items-center space-x-2",
                    currentFolder === "music" && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => navigateToFolder("music")}
                >
                  <Music className="h-5 w-5" />
                  <span>Music</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={cn(
                    "flex items-center space-x-2",
                    currentFolder === "documents" && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => navigateToFolder("documents")}
                >
                  <File className="h-5 w-5" />
                  <span>Documents</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {fileStructure && showMenu && (
          <SidebarGroup>
            <SidebarGroupLabel>Folders</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Object.keys(fileStructure).map((folder) => (
                  <SidebarMenuItem key={folder}>
                    <SidebarMenuButton
                      className={cn(
                        "flex items-center space-x-2",
                        currentFolder === folder && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => navigateToFolder(folder)}
                    >
                      <FolderOpen className="h-5 w-5" />
                      <span className="capitalize">{folder}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? "Hide Folders" : "Show Folders"}
          </Button>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
