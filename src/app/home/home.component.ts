import { Component, OnInit } from '@angular/core';
import { UtilsModule } from '../utils/utils.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private utility: UtilsModule) {}

  reports = [];

  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      const unqId = this.utility.getUniqueId() + i;
      this.reports.push({
        id: unqId,
        createdBy: 'Sagar B',
        createdDate: new Date(),
      });
    }
  }
}
