import { Component, OnInit, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  listOfPosts: Post[] = [];
  constructor(private postService: PostService)  {}

  ngOnInit(): void {
    this.postService.listChanged.subscribe((listOfPosts: Post[])=>{
      this.listOfPosts = listOfPosts;
    });
    this.listOfPosts = this.postService.getPosts();
  }

  deletePost(index: number){
    this.listOfPosts.splice(index,1);
  }
}
