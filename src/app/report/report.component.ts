import { Component, OnInit } from '@angular/core';
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  private width: number;
  private height: number;
  private imgDescription: string;
  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  constructor() {
    this.height = 300;
    this.width = 500;
  }

  showWebcam: boolean = false;

  ngOnInit(): void {}

  public handleInitError(error: WebcamInitError): void {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === 'NotAllowedError'
    ) {
      console.warn('Camera access was not allowed by user!');
    }
  }

  public showCamera() {
    this.showWebcam = !this.showWebcam;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.showCamera();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public async sendReport() {
    if (this.imgDescription) {
      console.log('email sent !!');
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = this.webcamImage.imageAsDataUrl;

      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, this.width, this.height);

      var dataURL = canvas.toDataURL('image/png');

      console.log(dataURL);

      let docDefinition = {
        header: 'Sample Report',
        content: [
          {
            text: this.imgDescription,
            fontSize: 20,
          },
          {
            image: dataURL,
          },
        ],
      };

      pdfMake.createPdf(docDefinition).download();
    }else{
      console.warn("image description required");
    }
  }
}
