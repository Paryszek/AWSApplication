import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "AWS test application";
  file: File;

  constructor(private http: HttpClient) {}

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
    this.http.post('http://localhost:4000/', {
      file: this.file
    }).subscribe(data => console.log(data));
    console.log(this.file);
  }
}
