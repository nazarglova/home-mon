import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscrOnRefresh: Subscription;
  isLoaded: Boolean = false;

  bill: Bill;
  currency: any;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency(),
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }


  onRefresh() {
    this.isLoaded = false;
    this.subscrOnRefresh = this.billService.getCurrency()
      .delay(2000)
      .subscribe((data: [Bill, any]) => {
        this.currency = data;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscrOnRefresh.unsubscribe();
  }
}
