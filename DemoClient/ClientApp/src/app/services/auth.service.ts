import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';
import { AuthApiResponse, AuthResponse } from '../models/auth-api-response.model';
import { AppConfig } from "./app.config.service";


@Injectable()
export class AuthService implements CanActivate, CanActivateChild {
  langData: any;
  //IMPORTANT KEY FOR MAKING TOKEN AND DETERMINING ACCESS
  app: string = "Field Assurance";
  authData: AuthResponse;
  protected ApiUrl: string = AppConfig.settings.ConnectionStrings.apiAuthServer;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authApiResponse: AuthApiResponse,
  ) {
    //this.authData = new AuthResponse();
  }


  /***  Determine if Login Credentials are valid by contacting API **/

  public login(userName: string, password: string) {
    var reqData = `username=${userName}&password=${password}&grant_type=password&application=` + this.app;
    var reqHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'Accept': 'application/json' })
    return this.http.post(`${this.ApiUrl}/token`, reqData,
      {
        headers: reqHeaders,
        responseType: 'json',
        observe: 'response'
      });
  }

  public decryptToken() {
    var reqHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('userToken') })
    return this.http.get(`${this.ApiUrl}api/token`, { headers: reqHeaders });
  }








  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // 1 - CHECK FOR TOKEN 
    if (localStorage.getItem('userToken') != null) {
      //TOKEN FOUND
      //1.1 - CHECK TOKEN EXPIRATION DATE -- this is where the token needs to be decrypted...via new API
      //DECRYPT TOKEN - IF NO 401 - UNAUTHORIZED ERROR TOKEN HAS NOT EXPIRED.
      //console.log("XXXXXXXXXXXXXXX ACTIVATE XXXXXXXXXXXXXXX");
      this.authData = new AuthResponse();
      this.decryptToken()
        .subscribe((data: any) => {
          //POPULATE AUTHDATA
          this.authData.Authorized = "yes";
          this.authData.Message = "Authorized";
          this.authData.UserDisplayName = data.UserDisplayName;
          this.authData.LoggedOn = data.LoggedOn;
          this.authData.Admin = data.Admin;
          this.authData.IT = data.IT;
          this.authData.Application = data.Application;
          this.authData.UserEmailAddress = data.UserEmailAddress;
          this.authApiResponse.changeAuthResponse(this.authData);
          //'console.log("XXXXXXXXXXXXXXX ACTIVATE XXXXXXXXXXXXXXX  " + data.UserEmailAddress);
          //CHECK TO SEE IF THIS TOKEN IS FOR THIS APPLICATION GROUP   UserEmailAddress
          if (data.Application == "Field Assurance") {
            return true;
          } else {
            //TOKEN EXPIRED
            //REMOVE EXPIRED TOKEN
            localStorage.removeItem('userToken');
            //FORCE USER TO LOGIN
            this.router.navigate(['/login']);
            return false;
          }
        },
          error => {
            //TOKEN EXPIRED
            //REMOVE EXPIRED TOKEN
            localStorage.removeItem('userToken');
            //FORCE USER TO LOGIN
            this.router.navigate(['/login']);
            return false;
          }
        );
      return true;

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  ///IT ONLY

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authData.IT === "yes") {
      //console.log("DSFDSFDSFDSF2222222");
      return true;
    }
    //this.router.navigate(['/']);
    // return false;
    return true;
  }

}





