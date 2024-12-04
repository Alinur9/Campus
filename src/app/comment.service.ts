import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post ,Comment, PostResponse} from './models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }


  getPost(id: string):Observable<Post>{
    let p = new HttpParams().append(id, id)
    return this.httpClient.get<Post>(`/api/comment/`,{params: p })
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