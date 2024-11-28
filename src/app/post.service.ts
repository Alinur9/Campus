import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Like, Post, PostResponse} from './models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }



  getPosts():Observable<Post[]>{
    return this.httpClient.get<Post[]>(`/api/post`)
  }

  putUserPost(post: Post): Observable<PostResponse>{
    return this.httpClient.put<PostResponse>("/api/post", post)
  }

  putLike(like: Like): Observable<string[]> {
    return this.httpClient.post<string[]>("/api/post", like)
  }
}