import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";

import { /*POSTS,*/ Post } from "../data/post";
import { environment } from "../environment/environment";

@Injectable()
export class PostService {
  //private postsUrl = 'http://localhost:8080/v1/categories';
  private postsUrl = `${environment.apiUrl}v1/posts`;

  constructor(private http: HttpClient) { }

  /**getPosts(): Observable<Post[]> {
    const posts = of(POSTS);
    return posts;
  }**/

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(catchError(this.handleError<Post[]>('getPosts')));
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`, error); // log to console
    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
}