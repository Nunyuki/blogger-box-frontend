import { Component } from '@angular/core';
import {PostService} from "../services/post.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Category} from "../data/category";
import {CategoryService} from "../services/category.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {PostCreateInput} from "../data/post";

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent {
  categories: Category[] = [];
  postCreateInput! : PostCreateInput;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private router : Router, private postService: PostService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    })
  }

  addPost= this.formBuilder.group({
    title:['',{
      validators: [Validators.required,Validators.minLength(5),Validators.maxLength(150)],
    },
    ],
    category:['',Validators.required],
    content:['',
      {
        validators: [Validators.required,Validators.maxLength(2500)],
      }]
  })

  get title(){
    return this.addPost.controls['title'];
  }
  get content(){
    return this.addPost.controls['content'];
  }
  get category(){
    return this.addPost.controls['category'];
  }

  onSubmit() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    if (this.addPost.invalid) {
      Toast.fire({
        icon: 'error',
        title: 'Please review your post'
      })
    } else {
      this.postCreateInput = {
        title:this.addPost.value.title ?? '',
        content:this.addPost.value.content ?? '',
        categoryId:this.addPost.value.category ?? ''
      };
      this.postService
        .create(this.postCreateInput)
        .subscribe(() =>
          this.router.navigate(['/']).then((r) => console.log(r)),
        );
      Toast.fire({
        icon: 'success',
        title: 'Post successfully'
      });
    }
  }

  onClose() {
    this.router.navigate(['/']).then((r) => console.log(r));
  }
}