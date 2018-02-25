import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BaseApi {
  private basUrl = 'http://localhost:3000/';

  constructor(public http: Http) {
  }

  private gerUrl(url: string = ''): string {
    return this.basUrl + url;
  }

  get(url: string = ''): Observable<any> {
    return this.http.get(this.gerUrl(url))
      .map((response: Response) => response.json());
  }

  post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.gerUrl(url), data)
      .map((response: Response) => response.json());
  }

  put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.gerUrl(url), data)
      .map((response: Response) => response.json());
  }

}
