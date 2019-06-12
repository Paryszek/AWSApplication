import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
class FileInfo {
  ETag: string;
  Key: string;
  LastModified: string;
  Size: number;
  StorageClass: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "AWS test application";
  file: File;
  files: FileInfo[] = [];
  constructor(private http: HttpClient) {
    this.initFiles();
  }

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
    this.http.post('http://localhost:4000/upload', formData, { headers }).subscribe((data: any) => this.initFiles());
  }

  initFiles() {
    this.http.post('http://localhost:4000/files', undefined).subscribe((data: any) => {
      this.files.length = 0;
      data.Contents.forEach(file => this.files.push(file));
      console.log(this.files);
    });
  }
}
