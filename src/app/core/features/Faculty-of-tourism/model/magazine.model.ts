export interface JournalAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
}

export interface Journal {
  id: string;
  pubishedDate: string;
  title: string;
  description: string;
  journalAttachments: JournalAttachment[];
}

export interface MagazineData {
  title: string;
  subtitle: string;
  journals: Journal[];
}
