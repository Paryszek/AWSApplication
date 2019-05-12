import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AWSApplication';

  onImagePicked($event: any) {
    debugger;
  }

  onImageLoaded($event: any) {
    debugger;
  }
}
