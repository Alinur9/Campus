import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post ,Comment, PostResponse} from './models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }


  getPost():Observable<Post>{
    return this.httpClient.get<Post>(`/api/comment`)
  }
  getComments(id: string):Observable<Comment[]>{
    return this.httpClient.post<Comment[]>(`/api/comment`, id)
  }

  putUserComment(comment: Comment): Observable<PostResponse>{
    return this.httpClient.put<PostResponse>("/api/comment", comment)
  }

//   putComment(comment: Comment): Observable<PostResponse> {
//     return this.httpClient.post<PostResponse>("/api/comment", comment)
//   }
}