import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post ,Comment, PostResponse, User} from './models';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private httpClient: HttpClient) { }



  getPost(post: Post):Observable<Post>{
    return this.httpClient.post<Post>("/api/fetch", post)
  }

  putUserComment(comment: Comment): Observable<PostResponse>{
    return this.httpClient.put<PostResponse>("/api/comment", comment)
  }

  getUserPost():Observable<Post[]>{
    return this.httpClient.get<Post[]>("/api/fetch")
  }
}