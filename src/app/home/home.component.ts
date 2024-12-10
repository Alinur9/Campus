import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../login.service';
import e from 'express';

@Component({
  selector: 'app-home',
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
    RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private log: LoginService) { }
  title = 'campus';

  ngOnInit(): void {
      this.log.getLoggedUser().subscribe({
        error: e=> console.log("error : "  + e),
        next: u => {
          if(u.email == "null"){
            this.router.navigate(["/home"])
          }
          else {
            this.router.navigate(["/p2"])
          }
        }
      })
  }
  
  login(){
    this.router.navigate(['/login'])
  }
  signup(){
    this.router.navigate(['/signup'])
  }
}
