import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {Observable} from 'rxjs/Observable';

import {Http} from '@angular/http';
import {WFMEvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {

  constructor(public http: Http) {
    super(http);
  }

  addEvent(event: WFMEvent): Observable<WFMEvent> {
    return this.post('events', event);
  }
}
