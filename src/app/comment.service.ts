import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post ,Comment, PostResponse, User} from './models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }


  getComments(post: Post):Observable<Comment[]>{
    return this.httpClient.post<Comment[]>("/api/comment", post)
  }

  putUserComment(comment: Comment): Observable<PostResponse>{
    return this.httpClient.put<PostResponse>("/api/comment", comment)
  }

//   putComment(comment: Comment): Observable<PostResponse> {
//     return this.httpClient.post<PostResponse>("/api/comment", comment)
//   }
}