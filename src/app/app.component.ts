import { Component } from '@angular/core';
import { Storage } from 'aws-amplify'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AWSApplication';

  onImagePicked($event: any) {
  }

  onImageLoaded(e: any) {
    const file = e;
      Storage.put('example.png', file, {
          contentType: 'image/png',
          level: 'protected',
          progressCallback(progress) {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          }
      })
      .then (result => console.log(result))
      .catch(err => console.log(err));
  }
}
