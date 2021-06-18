import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { NewsInfo } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiURL: string;

  constructor(private http: HttpClient) { }

  /**
   * Getting section news via http call
   * @param section - section of news to be fetched
   */
  getSectionNews(section: string): Observable<NewsInfo> {
    this.apiURL = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=YsqYeVFYO3ObhKrbKZhlFcgMxbfpGEDM`;

    return this.http.get<NewsInfo>(this.apiURL)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError) 
      )
  }

  /**
   * Handle error
   * @param err - error in response
   */
  handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
