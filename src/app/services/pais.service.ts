import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Country } from '../models/countries';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }



  getPaises() {
    return this.http.get<Country>(this.serverUrl + 'api_pais/adminPaises/').pipe(
      catchError(this.handleError)
    );
  }

  getCountries() {
    return this.http.get<Country>(this.serverUrl + 'api_pais/countries/').pipe(
      catchError(this.handleError)
    );
  }

  getPaisDetail(code:string){

    return this.http.get<Country>(`${this.serverUrl}api_pais/adminPais/${code}`).pipe(
      catchError(err => of(null))
    )

  }

  getPais(id:number): Observable<Country> {

    return this.http.get<Country>(this.serverUrl + 'api_pais/adminPais/' + id).pipe(
      catchError(this.handleError)
    );
  }


  createPais(pais) {
    return this.http.post<any>(this.serverUrl + 'api_pais/createPais/', pais)
    .pipe(
      catchError(this.handleError)
    );
  }

  updatePais(pais, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_pais/updatePais/' + id, pais)
    .pipe(
      catchError(this.handleError)
    );
  }

  deletePais(id: number) {
    return this.http.delete(this.serverUrl + 'api_pais/deletePais/' + id).pipe(
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
