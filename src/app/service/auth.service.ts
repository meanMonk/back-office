import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      this.authState = user;
    });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.authState = res.user;
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate([''])
        .then(() => {});
    });
  }

}


export class EmailValidator {
  static isValid(control: FormControl) {
    const reg = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = reg.test(control.value);
    if (valid) {
      return null;
    }
    return {'invalidEmail': true};
  }
}
