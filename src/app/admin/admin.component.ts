import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  signOutUser() {
    this.authService.signOut();
  }
}
