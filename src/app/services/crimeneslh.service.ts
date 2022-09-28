import { Injectable } from '@angular/core';
import { Crimeneslh } from '../models/crimeneslh';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrimeneslhService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCrimeneslhs() {
    return this.http.get<Crimeneslh>(this.serverUrl + 'api_crimeneslh/adminCrimeneslhs/').pipe(
      catchError(this.handleError)
    );
  }

  getCrimeneslh(id: number) {
    return this.http.get<Crimeneslh>(this.serverUrl + 'api_crimeneslh/adminCrimeneslh/' + id).pipe(
      catchError(this.handleError)
    );
  }


  createCrimeneslh(crimeneslh) {
    return this.http.post<any>(this.serverUrl + 'api_crimeneslh/createCrimeneslh/', crimeneslh)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateCrimeneslh(crimeneslh, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_crimeneslh/updateCrimeneslh/' + id, crimeneslh)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCrimeneslh(id: number) {
    return this.http.delete(this.serverUrl + 'api_crimeneslh/deleteCrimeneslh/' + id).pipe(
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
