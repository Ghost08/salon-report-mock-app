import { Component, OnInit } from '@angular/core';
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  private width: number;
  private height: number;
  private imgDescription:string;
  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  
  constructor() {
    this.height=300;
    this.width=500;
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
    this.showCamera()
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


  public sendReport(){
    console.log('email sent !!')
  }
}
