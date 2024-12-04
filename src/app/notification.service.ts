import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Like, Notification, Post, PostResponse} from './models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }


  getNotifications(email: string): Observable<Notification[]> {
    return this.httpClient.post<Notification[]>("/api/notification", email)
  }
}