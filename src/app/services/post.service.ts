import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";
import { POSTS, Post, PostCreateInput } from "../data/post";
import { environment } from "../environment/environment";
import {Category, CategoryCreateInput} from "../data/category";

@Injectable()
export class PostService {
  private postsUrl = `${environment.apiUrl}v1/posts`;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(catchError(this.handleError<Post[]>('getPosts')));
  }

  create(post: PostCreateInput): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(this.postsUrl, post)
      .pipe(
        catchError(this.handleError<Post>('update', post))
      )
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error); // log to console
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  delete(post: Post): Observable<boolean> {
    return this.http.delete<boolean>(`${this.postsUrl}/${post.id}`);
  }
}