import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from "./app.config.service";

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  protected ApiUrl: string = AppConfig.settings.ConnectionStrings.apiServer;

  constructor(
    private http: HttpClient,
  ) { }



  public getAllQuotes(): Observable<Quote[]> {
    return this.http
      .get<Quote[]>(`${this.ApiUrl}/api/Quotes`);

  }

  public getQuote(RecordId: string) {
    return this.http.get(`${this.ApiUrl}/api/Quotes/${RecordId}`);
  };
}
export class Quote {
  public qid: number = 0;
  public Quote1: string = "";
}
