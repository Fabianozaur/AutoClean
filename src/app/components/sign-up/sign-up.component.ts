import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {
  faAt,
  faBlenderPhone,
  faEnvelope, faEnvelopeOpenText,
  faIdCard,
  faKey,
  faLock,
  faPhone,
  faUser,
  faUserCircle, faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faGoogle, faKeybase} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  faGoogle=faGoogle;
  faCircleUser=faUserCircle;
  faLock=faKey;
  faFb=faFacebook;
  faName=faIdCard;
  faPhone=faPhone;
  faEnvelope=faEnvelope;
  isAlert=true;


  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
}
