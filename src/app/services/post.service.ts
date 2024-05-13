import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { POSTS, Post } from "../data/post";

@Injectable()
export class PostService {
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    const posts = of(POSTS);
    return posts;
  }
}