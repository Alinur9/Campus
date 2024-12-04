import { Component, Inject } from '@angular/core';
import { NotificationService } from '../notification.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Notification } from '../models';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [HttpClientModule,
            CommonModule,
            MatIconModule,
            MatSidenavModule,
            MatButtonModule,
            RouterModule,
            MatToolbarModule],
  providers: [HttpClient],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  constructor(private notification: NotificationService, @Inject(DOCUMENT) private document: Document,
              private login : LoginService, private router: Router){
    const localStorage = document.defaultView?.localStorage
    let email = localStorage?.getItem("email")

    if(email == null){
      email = "null"
    }

    this.buildPage(email)
  }

  notifactionArr: Notification[] = new Array()
  action:string = ""
  buildPage(email: string){
    this.notification.getNotifications(email).subscribe({
      error: e=> console.log("error: " + e),
      next: nArr => {
        this.notifactionArr = nArr
        console.log("notifications fetched succesfully")
      }
    })
    
  }
  logOut(){
    this.login.logOut().subscribe({
      error: e=> console.log("error: " + e),
      next: str => console.log("logged out")
    })
    this.router.navigate(["/home"])
  }
  
}
