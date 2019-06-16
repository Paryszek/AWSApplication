import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
class FileInfo {
  ETag: string;
  Key: string;
  LastModified: string;
  Size: number;
  StorageClass: string;
  Checked: boolean = false;
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
  api: string = "http://ec2-3-121-98-9.eu-central-1.compute.amazonaws.com"
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
    this.http.post(this.api + '/upload', formData, { headers }).subscribe((data: any) => this.initFiles());
  }

  onProcessClick() {
    if (this.files.length === 0) {
      console.log("error, no files");
      return;
    };
    let result = []
    this.files.filter((file: FileInfo) => file.Checked).forEach((file: FileInfo) => {
      result.push(file.Key);
    });

    if (result.length === 0) {
      console.log("error, no files checked");
      return;
    }
    
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.api + '/process', { body: result }, { headers })
    .subscribe((data: any) => {
      console.log(data);
    });
  }

  initFiles() {
    this.http.post(this.api + '/files', undefined).subscribe((data: any) => {
      this.files.length = 0;
      data.Contents.forEach(file => this.files.push(file));
    });
  }
}
