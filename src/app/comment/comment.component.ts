import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommentService } from '../comment.service';
import { Comment, Post } from '../models';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [HttpClientModule,
            RouterModule,
            RouterOutlet,
            MatSidenavModule,
            CommonModule,
            MatToolbarModule,
            MatIcon],
  providers: [HttpClient],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  constructor(private comment: CommentService,@Inject(DOCUMENT) private document: Document){
    const localStorage = document.defaultView?.localStorage;
    if(localStorage){
     let id = localStorage.getItem("post")
     if( id == null){
      id = "null"      
     }
    this.buildPage(id)
    }

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
    this.comment.getPost().subscribe({
      error: e=> console.log("error: " + e), 
      next: p => {
        this.post = p
        console.log(p.text)
        this.comms = p.comments;
        console.log("post fetched succesfully")
      }
    })
  }

  putComment(text: string){
    const localStorage = document.defaultView?.localStorage;
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
      next: s => console.log("successfully placed a comment")
    })
  }
  }
}
