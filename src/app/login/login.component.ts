import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router,RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSelectModule } from '@angular/material/select'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButton, MatFabButton } from '@angular/material/button';
import { LoginService } from '../login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    MatSlideToggleModule, 
    MatDatepickerModule, 
    MatSelectModule,
    MatMomentDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButton,
    HttpClientModule,
    RouterModule,
    MatFabButton,],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers:[HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router:Router, private login: LoginService) {
    this.login.getLoggedUser().subscribe({
      error: e=> console.log("error: " + e),
      next: u => {
        if(u.email === "null"){
          this.router.navigate(["/login"])
        }
        else {
          this.router.navigate(["/user"])
        }
      }
    })
  }

  fb = inject(FormBuilder);
  

  hide = signal(true)
  form = this.fb.group({
    email: [''],
    password: [''],
  })

  click(email:string, password: string){

    this.login.postLoginInformation({name: "a", department: "a", password:password, email:email})
    .subscribe(
      {error: e=>console.log("error: " + e),
       next: logResp => {console.log("success")
       this.router.navigate(['/user'])
       
    }
    }
    )

    // this.login.getUserByEmail(email, password)
    // .subscribe(
    //   {error: e=> console.log("error: " + e),
    //    next: User=> {
    //     this.router.navigate(['/user'])
        
    //    }
    // }
      

    // )
   // this.router.navigate(['/profile'])
  }
  
}
