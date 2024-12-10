import { DOCUMENT, XhrFactory } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from '../login.service';
import e from 'express';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NotificationService } from '../notification.service';
import { MatButtonModule } from '@angular/material/button';
import { FetchService } from '../fetch.service';
import { Post } from '../models';

@Component({
  selector: 'app-profile2',
  standalone: true,
  imports: [MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterModule],
  templateUrl: './profile2.component.html',
  styleUrl: './profile2.component.css'
})
export class Profile2Component  implements OnInit{

  logOut() { 
    this.login.logOut().subscribe({
      error: e=> console.log("error: " + e),
      next: str => console.log("logged out")
    })
    const localStorage = this.document.defaultView?.localStorage
    localStorage?.clear()
    
    this.router.navigate(["/home"])
  }
  showNotifications() { 
    this.router.navigate(['/notification'])
  }

  name: string = ""
  email: string =""
  dept : string =""

  private cdr = inject(ChangeDetectorRef)
  constructor(public login:LoginService, private notification: NotificationService,
              @Inject(DOCUMENT) private document : Document, private router: Router,
              private fetch: FetchService){}

  ngOnInit(): void {

    this.login.getLoggedUser().subscribe({
      error: e=> console.log("error: " + e),
      next: u=> {
        if(u.email == "null"){
          this.router.navigate(["/home"])
        }
        this.name = u.name
        this.email = u.email
        this.dept = u.department


      }
    })
    this.getPosts()
    this.cdr.detectChanges()
  }

  uploadPicture(event: any) {
    const file = event.target.files[0];


    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const profilePicture: any = document.getElementById('profilePicture');
        profilePicture.src = e?.target?.result;
      };
      reader.readAsDataURL(file);
    }


    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         alert("picture is uploaded")
        console.log("File is uploaded")
      }
    }

    xhttp.open("POST", "/api/files", true);
    xhttp.setRequestHeader("File-Name", file.Name)
    
    // const email = this.login.user.getValue()?.email
    // xhttp.setRequestHeader("User-Email", email)


    xhttp.send(file);


  }

  postArr: Post[] = new Array()
  getPosts(){
    this.fetch.getUserPost().subscribe({
      error: e=> console.log("error: " + e),
      next: pArr => {
        this.postArr = pArr
        console.log("posts fetched successfully")
      }
    })
  }


//"https://via.placeholder.com/100"



}
