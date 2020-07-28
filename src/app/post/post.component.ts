import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import  { PostService } from '../post.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;
  isLoggedIn = false;
  //@Output() deleteClicked = new EventEmitter<number>();


  constructor(private postService: PostService ,
    private routerService: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user)=>{
      this.isLoggedIn = !!user;
    })
  }
  onDelete(){
    //this.deleteClicked.emit(this.index);
    this.postService.deletePost(this.index);
  }

  onEdit(){
this.routerService.navigate([this.index,"post-edit"]);
  }

}
