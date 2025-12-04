import { Injectable } from '@angular/core';
import { StatisticsData } from '../model/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  getStatisticsData(): StatisticsData {
    return {
      title: 'إحصائيات إنجازات الكلية',
      backgroundImage: './assets/tour2.jpg',
      statistics: [
        {
          id: '1',
          value: 2500,
          label: 'طالب وطالبة مسجلين',
          icon: 'pi pi-users'
        },
        {
          id: '2',
          value: 1200,
          label: 'خريج وخريجة',
          icon: 'pi pi-graduation-cap'
        },
        {
          id: '3',
          value: 85,
          label: 'عضو هيئة تدريس',
          icon: 'pi pi-user'
        },
        {
          id: '4',
          value: 40,
          label: 'شراكة دولية',
          icon: 'pi pi-globe'
        }
      ]
    };
  }
}