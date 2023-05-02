import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './service/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Open Fabric - Product App';

  ngOnInit(){
    // this.api.getLocalData().subscribe( (data: any) => this.user_data = data)
  }
}
