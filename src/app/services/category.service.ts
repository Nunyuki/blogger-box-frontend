import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";
import { environment } from "../environment/environment";

import { POSTS, Post } from "../data/post";
import { Category } from "../data/category";

@Injectable()
export class CategoryService {
  //private categoriesUrl = 'http://localhost:8080/v1/categories';
  private categoriesUrl = '${environment.apiUrl}v1/categories';

  constructor(private http: HttpClient){}

  getAll() : Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(catchError(this.handleError<Category[]>('getAll')));
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`, error); // log to console
    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
}