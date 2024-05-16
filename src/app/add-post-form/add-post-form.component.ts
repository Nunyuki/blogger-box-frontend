import { Component } from '@angular/core';
import {PostService} from "../services/post.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrl: './add-post-form.component.css'
})
export class AddPostFormComponent {
  constructor(private formBuilder: FormBuilder) { }
  addPost= this.formBuilder.group({
    title:['',{
      validators: [Validators.required,Validators.minLength(5),Validators.maxLength(150)],
      updateOn: 'blur'
    },
    ],
    category:[''],
    content:['']
  })

}