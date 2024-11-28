import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './models';

@Injectable({
    providedIn: 'root'
})

export class FileUploadService {
    constructor(private httpclient : HttpClient){}

    upload(file:File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData()
        formData.append('file', file)

        const req = new HttpRequest('POST', `/upload`, formData, {
            reportProgress: true,
            responseType: 'json'
          });
          return this.httpclient.request(req)
    }

    getFiles(): Observable<any> {
        return this.httpclient.get(`/files`)
    }
}