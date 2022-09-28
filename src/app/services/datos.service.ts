import { Injectable } from '@angular/core';
import { Datosvictima } from '../models/datos';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosvictimaService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getDatosvictimas() {
    return this.http.get<Datosvictima>(this.serverUrl + 'api_datosvictima/adminDatosvictimas/').pipe(
      catchError(this.handleError)
    );
  }

  getDatosvictima(id: number) {
    return this.http.get<Datosvictima>(this.serverUrl + 'api_datosvictima/adminDatosvictima/' + id).pipe(
      catchError(this.handleError)
    );
  }


  createDatosvictima(datosvictima) {
    return this.http.post<any>(this.serverUrl + 'api_datosvictima/createDatosvictima/', datosvictima)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateDatosvictima(datosvictima, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_datosvictima/updateDatosvictima/' + id, datosvictima)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteDatosvictima(id: number) {
    return this.http.delete(this.serverUrl + 'api_datosvictima/deleteDatosvictima/' + id).pipe(
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
