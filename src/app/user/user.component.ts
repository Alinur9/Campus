import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { User } from '../models';


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
export class UserComponent {
  name: string = ""
  dept: string = "";
  email: string = ""
 

  constructor(private login: LoginService) {

    
    this.login.getLoggedUser()
    .subscribe({
      error: e=> console.log("errror: " + e),
      next: user => {
        this.name = user.name
        this.dept = user.department
        this.email = user.email
       
      }

    })
    
  }





}
