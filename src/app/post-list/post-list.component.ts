import { Component, OnInit } from "@angular/core";
import { PostService } from "../services/post.service";
import { Post } from "../data/post";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private PostService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.PostService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
