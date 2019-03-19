import { Component, OnInit } from '@angular/core';
import { QuotesService, Quote } from '../../services/quotes.service';
import { Observable } from 'rxjs';
import { AuthResponse, AuthApiResponse } from 'src/app/models/auth-api-response.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-viewpg',
  templateUrl: './viewpg.component.html',
  styleUrls: ['./viewpg.component.css']
})
export class ViewpgComponent implements OnInit {

  authData: any;
  allQuotes: Observable<Quote[]>;

  constructor(
    private quoteService: QuotesService,
    private authApiResponse: AuthApiResponse,
    private router: Router,
  ) { }

  ngOnInit() {
    this.quoteService.getAllQuotes().subscribe(
      (data: any) => {
        this.allQuotes = data;
      }
    )
  }

  Logout() {
    this.authData = new AuthResponse();
    localStorage.removeItem('userToken');
    this.authData.Authorized == 'no';
    this.authApiResponse.changeAuthResponse(this.authData);
    this.router.navigate(['/login']);
  }

}
