

import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-share',
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
  templateUrl: './share.component.html',
  styleUrl: './share.component.css'
})
export class ShareComponent  implements OnInit{

  constructor(private router:Router, private login: LoginService) {
  }


ngOnInit(): void {
  this.login.getLoggedUser().subscribe({
    error: e=> console.log("error : "  + e),
    next: u => {
      if(u.email == "null"){
        this.router.navigate(["/login"])
      }
      else {
        this.router.navigate(["/p2"])
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
     this.router.navigate(['/p2'])
     
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


