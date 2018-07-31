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
  statusData: any;

  constructor(private apiService: ApiService) { }

  enshort() {
    this.apiService.enshort(this.targetUrl).subscribe(
      (data: any) => {
        this.shortedUrl = data.shortedUrl;
      },
      error => {
        alert(error.message);
      });
  }

  delete() {
    this.apiService.enshort(this.targetUrl).subscribe(
      (data: any) => {
        alert('deleted');
        this.shortedUrl = '';
      },
      error => {
        alert(error.message);
      });
  }

  status() {
    this.apiService.enshort(this.targetUrl).subscribe(
      (data: any) => {
        this.statusData = data;
        console.log(data);
      },
      error => {
        alert(error.message);
      });
  }

}
