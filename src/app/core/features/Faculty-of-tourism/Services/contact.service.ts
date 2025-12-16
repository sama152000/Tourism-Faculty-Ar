import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Contact, ContactData } from '../model/contact.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getContactData(): Observable<ContactData> {
    return this.http.get<any>(`${environment.apiUrl}contacts/getall`).pipe(
      map(res => {
        const contacts: Contact[] = res.data.map((c: any) => ({
          id: c.id,
          address: c.address,
          phone: c.phone,
          email: c.email,
          facebook: c.facebook,
          twitter: c.twitter,
          instagram: c.instagram,
          linkedIn: c.linkedIn,
          youTube: c.youTube,
          whatsApp: c.whatsApp,
          mapLocation: c.mapLocation,
          webSite: c.webSite,
          fax: c.fax
        }));

        return {
          title: 'اتصل بنا',
          subtitle: 'يمكنك التواصل مع الكلية عبر البيانات التالية',
          contacts: contacts
        } as ContactData;
      })
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.getContactData().pipe(map(data => data.contacts));
  }
}
