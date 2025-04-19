
export type FileType = {
  id: string;
  name: string;
  type: 'folder' | 'document' | 'image' | 'video' | 'audio';
  size?: string;
  url?: string;
  parentFolder: string;
};

export type FileStructure = {
  [key: string]: FileType[];
};
