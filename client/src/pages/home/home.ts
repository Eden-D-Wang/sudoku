import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ip: string = 'http://172.31.161.35:8022'

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  sudoku(event) {
    if (event.target && event.target.files && event.target.files.length) {
      const fd = new FormData();
      fd.append('file', event.target.files[0]);
      this.http.post(this.ip + '/sudoku', fd).subscribe();
    }
  }

}
