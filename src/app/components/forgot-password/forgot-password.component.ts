import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  faCircleUser=faUserCircle;
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() {
  }
}
