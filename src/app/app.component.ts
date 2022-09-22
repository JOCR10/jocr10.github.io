import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MOFrontEnd';

  uploadedFiles: any[] = [];

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  onUpload(event: { files: any }) {
    this.http
      .get('http://localhost:22597/api/files/download', {
        observe: 'response',
        responseType: 'blob',
      })
      .subscribe((response) => this.downLoadFile(response));

    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'Files Uploaded',
    });
  }

  downLoadFile(data: any) {
    let filename = data.headers
      .get('content-disposition')
      ?.split(';')[1]
      .split('=')[1];
    let blob: Blob = data.body as Blob;
    let a = document.createElement('a');
    a.download = filename;
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.click();
  }
}
