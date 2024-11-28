import { HttpClient, HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from '../upload.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [HttpClientModule],
  providers:[HttpClient]  ,        
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
