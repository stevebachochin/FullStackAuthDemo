import { Component, OnInit } from '@angular/core';
import { QuotesService, Quote } from '../../services/quotes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formpg',
  templateUrl: './formpg.component.html',
  styleUrls: ['./formpg.component.css']
})
export class FormpgComponent implements OnInit {

  qid: string;
  formData: Quote;

  constructor(
    private route: ActivatedRoute,
    private quoteService: QuotesService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      params => {
        let id = params['id'];
        this.getFormData(id);
      }
    );

  }

  getFormData(qid: string): void {
    this.quoteService.getQuote(qid)
      .subscribe((data: any) => {
        this.formData = data;
        console.log('It works');
      }, error => {
        console.log('Error retriving data from quote record');
      }
      );
  }

}
