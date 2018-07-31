import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {

  shortlyBaseUrl: string = 'http://localhost:3000/';
  targetUrl: string = '';
  shortedUrl: string;
  statsData: any;
  history: string[] = [];

  constructor(private apiService: ApiService) { }

  enshort() {
    this.apiService.enshort(this.targetUrl).subscribe(
      (data: any) => {
        this.shortedUrl = data.shortedUrl;
        this.history.push(this.shortedUrl);
      },
      error => {
        alert(error.error.message);
      });
  }

  delete() {
    this.apiService.enshort(this.targetUrl).subscribe(
      (data: any) => {
        alert('deleted');
        this.shortedUrl = '';
      },
      error => {
        alert(error.error.message);
      });
  }

  stats() {
    this.apiService.stats(this.targetUrl).subscribe(
      (data: any) => {
        this.statsData = data;
      },
      error => {
        alert(error.error.message);
      });
  }

}
