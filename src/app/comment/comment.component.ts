import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommentService } from '../comment.service';
import { Comment, Notification, Post } from '../models';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NotificationService } from '../notification.service';
import { AsyncLocalStorage } from 'async_hooks';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [HttpClientModule,
            RouterModule,
            RouterOutlet,
            MatSidenavModule,
            CommonModule,
            MatButtonModule,
            MatToolbarModule,
            MatIconModule],
  providers: [HttpClient],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{

  notificationArr: Notification[] = new Array()
  private cdr = inject(ChangeDetectorRef);

  constructor(private comment: CommentService,@Inject(DOCUMENT) private document: Document, 
              private router: Router, private login: LoginService){


  }
  ngOnInit(): void {
      
    const localStorage = document.defaultView?.localStorage;
    if(localStorage){
     let id = localStorage.getItem("post")
     if( id == null){
      id = "null"      
     }
    this.buildPage(id)
    }
    this.cdr.detectChanges()
  }

  comments : Comment[] = new Array()
  post: Post = {email:"", name: "", id: "", likes: 0, text: "randomText", status:"loading", comments: 0}
  comms : number = 0

  buildPage(id: string){
    this.comment.getComments(id).subscribe({
      error: e=> console.log("error: " + e),
      next: cArr=> {
        this.comments = cArr
        console.log("Comments fetched succesfully")
      }
    })
    this.comment.getPost(id).subscribe({
      error: e=> console.log("error: " + e), 
      next: p => {
        this.post = p
        console.log(p.text)
        this.comms = p.comments;
        console.log("post fetched succesfully")
      }
    })
  }

  localStorage = this.document.defaultView?.localStorage
  putComment(text: string){
    this.localStorage = document.defaultView?.localStorage;
    if (localStorage){
    let id = localStorage.getItem("post")
    let email = localStorage.getItem("email")
    let name = localStorage.getItem("name")
    if(id == null){
      id = "null"
    }
    if (email == null){
      email = "null"
    }
    if (name == null){
      name = "null"
    }
    this.comment.putUserComment({id: id, text: text, email: email, name: name, comments:this.comms}).subscribe({
      error: e=> console.log("error: " + e),
      next: s => {
        console.log("successfully placed a comment")
        this.cdr.detectChanges()
      }
    })
  }
  }

  showNotifications(){
    this.router.navigate(['/notification'])
  }

  logOut(){
    this.login.logOut().subscribe({
      error: e=> console.log("error: " + e),
      next: str => console.log("logged out")
    })
    this.localStorage?.clear()
    this.router.navigate(["/home"])
  }
}
