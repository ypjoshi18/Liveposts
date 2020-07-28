import { Component, OnInit, Testability } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  postForm: FormGroup;
  index: number;
  loggedInEmail : string = '';

  constructor(private postService: PostService ,
    private routeService: ActivatedRoute,
    private routerService: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user)=>{
      this.loggedInEmail = user.email;
    })
    let title: string = '';
    let desc: string = '';
    let imagepath: string = '';

    this.routeService.params.subscribe((params: Params)=>{
      this.index = params['index'];

      if (this.index){
      const post: Post = this.postService.getPost(this.index);
      title = post.title;
      desc = post.desc;
      imagepath = post.imagePath;
      }
    });


    this.postForm = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      desc: new FormControl(desc, [Validators.required, Validators.minLength(10)]),
      imagePath: new FormControl(imagepath , [Validators.required])
    })
  }
  onSubmit() {
    let title: string = '';
    let desc: string = '';
    let imagePath: string = '';

    title = this.postForm.value.title;
    desc = this.postForm.value.desc;
    imagePath = this.postForm.value.imagePath;

    const ob = new Post(title, desc, imagePath, this.loggedInEmail, new Date());
    if (this.index) {
      this.postService.updatePost(this.index,ob);
    }
    else{
    this.postService.addPost(ob);
    }
    this.routerService.navigate(['post-list'])
  }

  onCancel(){
    this.postForm.reset();
    this.routerService.navigate(['post-list'])
  }

}