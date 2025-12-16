export interface Contact {
  id: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  youTube: string;
  whatsApp: string;
  mapLocation: string;
  webSite: string;
  fax: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  contacts: Contact[];
}
