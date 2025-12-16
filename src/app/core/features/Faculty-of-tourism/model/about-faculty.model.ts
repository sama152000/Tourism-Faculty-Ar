export interface AboutSection {
  id: string;
  title: string;
  content: string;
  additionalInfo?: string;
  image?: string;
}

export interface AboutInfo {
  title: string;
  overlayImage: string;
}

export interface AboutTabsData {
  title: string;
  subtitle: string;
  sections: AboutSection[];
}

// تعريف الـ Attachment الخاص بكلمة العميد
export interface DeanSpeechAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
}

// تعريف كلمة العميد
export interface DeanSpeech {
  id: string;
  memberName: string;
  memberPosition: string;
  speech: string;
  deanSpeechAttachments?: DeanSpeechAttachment[]; // هنا بقى صحيح
}
