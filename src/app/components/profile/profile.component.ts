import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {
  faEnvelope,
  faExclamation,
  faExclamationTriangle,
  faIdCard,
  faKey,
  faPhone,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  faGoogle=faGoogle;
  faCircleUser=faUserCircle;
  faLock=faKey;
  faFb=faFacebook;
  faName=faIdCard;
  faPhone=faPhone;
  faEnvelope=faEnvelope;
  faExclam=faExclamationCircle;
  isAlert=true;
  newDisplayName=''
  newPhoneNumber=''
  editUserMode=false;
  editPhoneMode=false;

  constructor(public authService: AuthService) {}
  ngOnInit(): void {

  }
  editUser() :void{
    this.editUserMode = !this.editUserMode;
  }
  editPhone() :void{
    this.editPhoneMode = !this.editPhoneMode;
  }
  saveUser(): void {
    this.authService.UpdateUserData({
      displayName: this.newDisplayName
    }).then(() => {
      this.editUser()
    })
  }
  savePhone(): void {
    this.authService.UpdateUserData({
      phone:this.newPhoneNumber
    }).then(()=>
    this.editPhone()
    )}

}
