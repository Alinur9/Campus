import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSelectModule } from '@angular/material/select'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButton, MatFabButton } from '@angular/material/button';
import { RegistrationService } from '../registration.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet, 
    MatSlideToggleModule, 
    MatDatepickerModule, 
    MatSelectModule,
    MatMomentDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButton,
    MatFabButton,
    HttpClientModule,
    RouterModule,
    MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers:[HttpClient],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router: Router, private regService: RegistrationService) { }
 fb = inject(FormBuilder);
  

  form = this.fb.group({
    name: [''],
    department: [''],
    dateOfbirth: [''],
    password: [''],
    confirmPassword: [''],
    email: ['']
  })
  
  
  showDetails(name:string, department: string, password: string, email: string){
    console.log('name: ' + name + ', dept: ' + department + ', email: ' + email );

    this.regService.postSignupInformation({name:name, department: department, password: password, email: email})
    .subscribe(
      {error:e=>console.log("error: ", e),
      
      next: regResp=>{
        console.log("success!!")
     this.router.navigate(['/login'])
      }
    }, 
    )
  }

  hide= signal(true)
  // clickEvent(event: MouseEvent){
  //   this.hide.set( !this.hide())
  //   event.stopPropagation();
  // }
}
