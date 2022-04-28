import { Component, OnInit } from '@angular/core';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faCoffee, faLock } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../shared/services/auth.service";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']

})
export class SignInComponent implements OnInit {



  faCoffee = faCoffee;
  faGoogle=faGoogle;
  faCircleUser=faUserCircle;
  faLock=faLock;
  faFb=faFacebook;

  constructor(
    public authService: AuthService

  ) { }
  ngOnInit() { }
}
