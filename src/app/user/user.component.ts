import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { User } from '../models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatCardModule, 
            MatButtonModule,
            HttpClientModule,
            MatIconModule,
            MatSidenavModule,
            MatToolbarModule,
            RouterModule],
  providers: [HttpClient] ,         
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit, OnDestroy{
  name: string = ""
  dept: string = "";
  email: string = ""
  user? :User
 
 sub?: Subscription
  private cdr = inject(ChangeDetectorRef);

  constructor(public login: LoginService, private router: Router) {
 
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }



  ngOnInit(): void {
    this.user = this.login.user.getValue()
    
    this.sub = this.login.user.subscribe(u=>{
      this.user = u
      this.cdr.detectChanges()
    })
    this.login.getLoggedUser().subscribe(
      u=>this.user = u
    );

    this.cdr.detectChanges()

    // this.login.getLoggedUser()
    // .subscribe({
    //   error: e=> console.log("errror: " + e),
    //   next: user => {

    //     this.name = user.name
    //     this.dept = user.department
    //     this.email = user.email
    //     this.cdr.detectChanges()
    //     console.log("detect change ..")
        
    //   }

    // })
  }

  showNotifications(){
    this.router.navigate(['/notification'])
  }

  logOut(){
    this.login.logOut().subscribe({
      error: e=> console.log("error: " + e),
      next: str => console.log("logged out")
    })
    this.router.navigate(["/home"])
  }


}
