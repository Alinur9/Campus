import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoginResponse, Post, PostResponse, User } from './models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { once } from 'node:events';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  constructor(private httpClient: HttpClient) { 
    this.ngOnInit()
  }
  ngOnInit(): void {
    this.getLoggedUser().subscribe(
      {
        next: u=>console.log("user received: " + u),
        error: e=>console.log("getLoggedUserError: " + e)
      }

    );
    
  }

  user = new BehaviorSubject<User| undefined>(undefined)



  postLoginInformation(user : User): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>("/api/login", user)
    
  
  }

  getLoggedUser():Observable<User>{
    return this.httpClient.get<User>(`/api/login`,{"withCredentials":true})
    .pipe(tap(u=>this.user.next(u)))
  }

  putUserPost(post: Post): Observable<PostResponse>{
    return this.httpClient.put<LoginResponse>("/api/login", post)
  }

  logOut():Observable<LoginResponse> {
    return this.httpClient.delete<LoginResponse>("/api/login")
  }
}
