import {Injectable, NgZone} from '@angular/core';
import {User} from '../services/user';
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get theError(): string {
    return this._theError;
  }

  set theError(value: string) {
    this._theError = value;
  }
  get isAlert() {
    return this._isAlert;
  }

  set isAlert(value) {
    this._isAlert = value;
  }
  userData: any; // Save logged in user data
  userFirestoreData: any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.getUserFirestoreData().subscribe((users) => {
          if (users.length > 0) {
            this.userFirestoreData = users[0]
          }
        })
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  public _isAlert!: boolean;
  private _theError!: string;
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch(async (error) => {
        this._isAlert = true;
        this._theError = error.message;
        setTimeout(() =>{
          if(this.isAlert){this._isAlert=false;}
        }, 5000);
        // window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string, name: string, phoneNr: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserDataRegister(result.user, name.toString(), phoneNr.toString());
      })
      .catch((error) => {
        this._isAlert = true;
        this._theError = error.message;
        setTimeout(() =>{
          if(this.isAlert){this._isAlert=false;}
        }, 5000);      });

  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        this._isAlert = true;
        this._theError = error.message;
        setTimeout(() =>{
          if(this.isAlert){this._isAlert=false;}
        }, 5000);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['home']);
      }
    });
  }
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['home']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserDataProviders(result.user);
      })
      .catch((error) => {
        this._isAlert = true;
        this._theError = error.message;
        setTimeout(() =>{
          if(this.isAlert){this._isAlert=false;}
        }, 5000);

      });
  }

  getUserName(uid:any){
    return new Promise<any>((resolve)=> {
      this.afs.collection('users', ref => ref.where('uid', '==', uid)).valueChanges().subscribe(users => resolve(users))
    })
  }

  getUserFirestoreData() {
    return this.afs.collection('users', ref => ref.where('uid', '==', this.userData.uid)).valueChanges()
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserDataRegister(user: any, name: string, phoneNr: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      employee: false ?? false,
      phone: phoneNr
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      employee: user.employee ?? false,
      phone: user.phone
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  UpdateUserData(user: Partial<User>) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${this.userData.uid}`
    )

    return userRef.set(<User>user, {
      merge: true
    })
  }
  SetUserDataProviders(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    userRef.get().subscribe(document => {
      if(!document.exists){
        const userData: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          employee: user.employee ?? false,
          phone: user.phone ?? ""
        };
        userRef.set(userData, {
          merge: true,
        }).then();
      }
    })

  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
