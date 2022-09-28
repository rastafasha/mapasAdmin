import { Injectable } from '@angular/core';
import { User } from '../models/users';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User>(this.serverUrl + 'api_user/adminUsers/').pipe(
      catchError(this.handleError)
    );
  }

  getUser(id: number) {
    return this.http.get<User>(this.serverUrl + 'api_user/adminUser/' + id).pipe(
      catchError(this.handleError)
    );
  }


  createUser(user) {
    return this.http.post<any>(this.serverUrl + 'api_user/createUser/', user)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_user/updateUser/' + id, user)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number) {
    return this.http.delete(this.serverUrl + 'api_user/deleteUser/' + id).pipe(
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
