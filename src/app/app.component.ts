import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    let formData = new FormData();
    formData.append('file', this.file);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.http.post('http://localhost:4000/', formData, { headers }).subscribe(data => console.log(data));
    console.log(this.file);
  }
}
