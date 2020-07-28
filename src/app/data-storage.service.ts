import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private postService: PostService,
        private HttpClientService: HttpClient) { }

    saveData() {
        const listOfPosts: Post[] = this.postService.getPosts();

        this.HttpClientService.put(
            'https://live-posts-e1a6a.firebaseio.com/posts.json',
         listOfPosts
         ).subscribe(res=>{console.log(res);
    });

    }
    fetchData() {
        this.HttpClientService.get(
            'https://live-posts-e1a6a.firebaseio.com/posts.json'
        ).pipe(
            tap((listOfPosts: Post[])=>{
                this.postService.setPosts(listOfPosts);
            })
        ).subscribe();

    }
}