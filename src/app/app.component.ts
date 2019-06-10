import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "AWS test application";
  file: File;
  onImageLoaded(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
  }
  onUploadClick() {
    if(!this.file) {
      console.log("error no file selected");
      return;
    }

    console.log(this.file);
  }
}
