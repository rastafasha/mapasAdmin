import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Slider } from '../models/slider';


@Injectable({
  providedIn: 'root'
})
export class SliderService {

  public slider: Slider;

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }



  getSliders() {
    return this.http.get<Slider>(this.serverUrl + 'api_slider/adminSliders/').pipe(
      catchError(this.handleError)
    );
  }




  getSlider(id:number): Observable<Slider> {

    return this.http.get<Slider>(this.serverUrl + 'api_slider/adminSlider/' + id).pipe(
      catchError(this.handleError)
    );
  }


  creatSlider(slider) {
    return this.http.post<any>(this.serverUrl + 'api_slider/createSlider/', slider)
    .pipe(
      catchError(this.handleError)
    );
  }

  updatSlider(slider, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_slider/updateSlider/' + id, slider)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteSlider(id: number) {
    return this.http.delete(this.serverUrl + 'api_slider/deleteSlider/' + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
