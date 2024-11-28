import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, Post, PostResponse, User } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  postLoginInformation(user : User): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>("/api/login", user)
    
  
  }

  getLoggedUser():Observable<User>{
    return this.httpClient.get<User>(`/api/login`)
  }

  putUserPost(post: Post): Observable<PostResponse>{
    return this.httpClient.put<LoginResponse>("/api/login", post)
  }
}
