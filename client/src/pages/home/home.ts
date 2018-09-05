import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ip: string = 'http://172.31.161.35:8022';

  count = 1;

  quality = '50';

  constructor(public navCtrl: NavController, public http: HttpClient, public camera: Camera) {

  }

  sudoku(event) {
    if (event.target && event.target.files && event.target.files.length) {
      const fd = new FormData();
      fd.append('file', event.target.files[0]);
      this.http.post(this.ip + '/sudoku', fd).subscribe();
    }
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  takePhoto() {
    this.camera.getPicture({
      quality: Number(this.quality) || 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 800,
      targetHeight: 800,
      correctOrientation: true,
      cameraDirection: this.camera.Direction.BACK,
    }).then((imageData) => {
      const file = this.dataURLtoFile('data:image/jpeg;base64,' + imageData, `${this.count++}.jpg`);
      const fd = new FormData();
      fd.append('file', file);
      this.http.post(this.ip + '/sudoku', fd).subscribe();
    }, (err) => {
      console.log(err);
    })
  }

}
