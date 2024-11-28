import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from '../login.service';
import { MatCardModule } from '@angular/material/card';
import { NewsfeedComponent } from '../newsfeed/newsfeed.component';
import { PostService } from '../post.service';
import { Post } from '../models';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatSidenavModule,
            MatToolbarModule,
            RouterModule,
            MatButtonModule,
            MatIconModule,
            FlexLayoutModule,
            MatGridListModule,
            MatCardModule,
            HttpClientModule],

  providers:[HttpClient],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  name: string = ""
  dept: string = ""
  email: string = ""

  constructor(private post: PostService, private login: LoginService){
    this.login.getLoggedUser()
    .subscribe({
      error: e=> console.log("errror: " + e),
      next: user => {
        this.name = user.name
        this.dept = user.department
        this.email = user.email
       
      }
  })
  this.buildFeed()
}

putPost(text: string){
  this.post.putUserPost({
   name: this.name, email: this.email,
    text: text, likes : 0, id: this.name, status: "like"
  }).subscribe ({
    error: e=> console.log("error: " + e),
    next: postResp => {
      console.log("posted successfully");
    }
  })
}


  tiles: NewsfeedComponent[] = new Array()
  postArr: Post[] = new Array()
  buildFeed(){
     this.post.getPosts()
    .subscribe({
      error: e=> console.log("error: " + e),
      next: postArr => {
       this.postArr = postArr
        console.log("posts fetched successfully")
        
      }
    })


  }

  like( likes: number, email: string, id: string, status: string){
    if (status === "like")
    this.post.putLike({email: email, id: id, likes: likes})
    .subscribe({
      error: e=> console.log("error: " + e),
      next: likedArr => {
        this.likedArr = likedArr
        console.log("liked a post successfully")
      }
    })
    else
    console.log("already liked")


    
  }

  
  
  likedArr: string[] = new Array()
  // getLikedPosts(email: string){
  //   this.post.getLikedPosts(this.email)
  //   .subscribe({
  //     error: e => console.log("error: " + e),
  //     next: likedArr => {
  //       this.likedArr = likedArr
  //       console.log("liked posts fetched successfully")
  //       for (let index = 0; index < likedArr.length; index++) {
  //         let element = likedArr[index];
  //         console.log("liked post id : " + element)
          
  //       }
  //     }
  //   })
  // }


  // tiles = [{text:'one', cols: 1, rows: 1},
  //          {text:'two', cols: 1, rows: 1},
  //          {text:'three', cols: 1, rows: 1},
  //          {text:'gap', cols: 1, rows: 1},
  //          {text:'for further instruction i have told akmam to do a lot of things of choiche.but he doesnot listen to me. \n he listens to sohan and beji always creating so much problem. this is bad for society. this is an upscale society problem dont you understand?', cols: 1, rows: 2}]

  
}
