
import { AppSidebar } from "@/components/AppSidebar";
import FileExplorer from "@/components/FileExplorer";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        <header className="h-14 border-b flex items-center px-4">
          <SidebarTrigger className="mr-4" />
          <h1 className="text-xl font-semibold">Kalimaya Storage</h1>
        </header>
        <main className="flex-1 overflow-auto">
          <FileExplorer />
        </main>
      </div>
    </div>
  );
}
