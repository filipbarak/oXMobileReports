import {Injectable} from '@angular/core';

import {Observable} from "rxjs/Rx";

import {Response, Headers, Http} from "@angular/http";

@Injectable()
export class AuthService {
  private url: string = "http://10.0.0.164:3001/webapp";
  korisnickoImeFirma: string = '';
  token: string = ''
  selectedClient: any = {};
  constructor(private http: Http) {
  }
  loginFirma(success, firmaId): boolean {
    if (success) {
      localStorage.setItem('firmaId', firmaId);
      return true;
    }
    return false;
  }

  logoutFirma(): any {
    localStorage.removeItem('firmaId');

  }

  getFirma(): any {
    return localStorage.getItem('firmaId');
  }

  isFirmaLoggedIn(): boolean {
    return this.getFirma() != null;
  }

  loginUserFirma(success, token, username): boolean {
    if (success) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  }

  getToken(): Promise<any> {
    return new Promise((resolve)=> {
        var localToken = localStorage.getItem('token');
        var getHeaders: Headers = new Headers({'Content-Type': 'application/json'});
        if (localToken) {
          this.http.post(`${this.url}/webapp/validateToken`, JSON.stringify({token: localToken}), {headers: getHeaders})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
            .subscribe((data: any) => {
              if (data.success) {
                console.log("Successfully Validated Token.");
                resolve(true);
              } else {
                console.log("Token Validation Failed.");
                resolve(false);
              }
            });
        } else {
          resolve(false);

        }
      }
    );
  }


  logoutUserFirma() {
    localStorage.removeItem('firmaId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');

  }

  getUserFirma(): any {
    return localStorage.getItem('username');
  }


  postUsernameLogin(username, password) {
    var body = JSON.stringify({
      "companyIdentifier": this.korisnickoImeFirma,
      "user": {"username": username, "password": password}
    });
    return this.http.post(`${this.url}/login`, body, {headers: new Headers({'Content-Type': 'application/json'})})
      .map(res=>res.json());

  }

  postCompanyLogin(korisnickoImeFirma) {
    var body = JSON.stringify({"companyIdentifier": korisnickoImeFirma});

    return this.http.post(`${this.url}/companyLogin`, body, {headers: new Headers({'Content-Type': 'application/json'})})
      .map(res => res.json());

  }

  isUserFirmaLoggedIn(): boolean {
    if (!this.getFirma()) {
      return false;
    }
    return this.getUserFirma() != null;
  }

  getFakturi(): Observable<any> {
    let headers = new Headers();
    headers.set('x-access-token', this.token);
    console.log(this.token, "DES TOKEn .");
    return this.http.get(
      `${this.url}/fakturiIzvestaj`,
      {headers})
      .map(response => response.json())

  }
  private handleError(error: any): void {
    console.error('An error occurred', error); // for demo purposes only
  }
}
