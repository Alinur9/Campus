import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from '../login.service';
import { MatCardModule } from '@angular/material/card';
import { NewsfeedComponent } from '../newsfeed/newsfeed.component';
import { PostService } from '../post.service';
import { Post } from '../models';
import { CommonModule, DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatSidenavModule,
            MatToolbarModule,
            RouterModule,
            MatButtonModule,
            MatIconModule,
            FlexLayoutModule,
            CommonModule,
            MatGridListModule,
            MatCardModule,
            RouterOutlet,
            HttpClientModule],

  providers:[HttpClient],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  name: string = ""
  dept: string = ""
  email: string = ""
  


  private cdr = inject(ChangeDetectorRef);
  constructor(private post: PostService, private login: LoginService, private router: Router, 
    @Inject(DOCUMENT) private document : Document){

}

ngOnInit(): void {
  this.login.getLoggedUser()
  .subscribe({
    error: e=> console.log("errror: " + e),
    next: user => {
      if(user.email == "null"){
        this.router.navigate(["/home"])
      }
      this.name = user.name
      this.dept = user.department
      this.email = user.email
     
    }
})
this.buildFeed()

this.cdr.detectChanges()

}

putPost(text: string){

  this.post.putUserPost({
   name: this.name, email: this.email,
    text: text, likes : 0, id: this.name, status: "like", comments: 0
  }).subscribe ({
    error: e=> console.log("error: " + e),
    next: postResp => {
      alert("posted succesfully.. please reload")
      console.log("posted successfully");
    }
  })
  this.cdr.detectChanges()
}


  tiles: NewsfeedComponent[] = new Array()
  postArr:  Post[]= new Array()
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
    if (status === "like"){
    this.post.putLike({email: email, id: id, likes: likes})
    .subscribe({
      error: e=> console.log("error: " + e),
      next: likedArr => {
        alert("liked post succesfully.. please reload")
        this.likedArr = likedArr
        console.log("liked a post successfully")
      }
    })
  }
    else{
      alert("already liked")
    console.log("already liked")
    }
    
    this.cdr.detectChanges()
  }


  comment(id: string){
 
     localStorage.setItem("post", id)
    localStorage.setItem("name", this.name)
    localStorage.setItem("email", this.email)
    this.router.navigate(['/comment'])

    

  }
  
  showNotifications(){
    this.router.navigate(['/notification'])
  }

  logOut(){
    this.login.logOut().subscribe({
      error: e=> console.log("error: " + e),
      next: str => console.log("logged out")
    })
    const localStorage = this.document.defaultView?.localStorage
    localStorage?.clear()
    
    this.router.navigate(["/home"])
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
