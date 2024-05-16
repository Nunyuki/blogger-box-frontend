import { Component } from '@angular/core';
import {PostService} from "../services/post.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Category} from "../data/category";
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrl: './add-post-form.component.css'
})
export class AddPostFormComponent {
  categories: Category[] = [];
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService) { }
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
    category:[''],
    content:['',
      {
        validators: [Validators.required,Validators.maxLength(2500)],
      }]
  })

  get title(){
    console.log(this.addPost.controls['title']);
    return this.addPost.controls['title'];
  }
  get content(){
    return this.addPost.controls['content'];
  }

  get category(){
    return this.addPost.controls['category'];
  }
  protected readonly onsubmit = onsubmit;

  onSubmit() {

  }
}