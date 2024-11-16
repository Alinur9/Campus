import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegResponse, User } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  postSignupInformation(user : User): Observable<RegResponse>{
    return this.httpClient.post<RegResponse>("/api/reg", user)
    
  
  }

  getUserById(id:number):Observable<User>{
    return this.httpClient.get<User>(`/api/reg/get_user/${id}`)
  }
}
