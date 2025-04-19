
import { useEffect, useState } from "react";
import { FileType } from "@/types/file";

interface DocumentViewerProps {
  file: FileType;
}

export default function DocumentViewer({ file }: DocumentViewerProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file.url) {
      setError("File URL is missing");
      setLoading(false);
      return;
    }

    // For this demo, we're simulating content loading
    // In a real app, you would fetch the actual file content
    const timer = setTimeout(() => {
      setContent("This is a simulated document preview. In a real application, this would render the actual document content.");
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [file]);

  if (loading) {
    return (
      <div className="doc-viewer-container flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p>Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doc-viewer-container flex items-center justify-center">
        <div className="text-center text-destructive">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="doc-viewer-container p-6">
      <div className="border-b pb-4 mb-4">
        <h3 className="text-lg font-medium">{file.name}</h3>
        <p className="text-sm text-muted-foreground">{file.size}</p>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        {content}
      </div>
    </div>
  );
}
