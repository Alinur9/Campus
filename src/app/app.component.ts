import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
import { LoginService } from './login.service';


@Component({
  selector: 'app-root',
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
    MatFabButton,
    RouterModule],


  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  private cdr = inject(ChangeDetectorRef)
  constructor(private login: LoginService, private router: Router){

  }
  ngOnInit(): void {

  }

}
