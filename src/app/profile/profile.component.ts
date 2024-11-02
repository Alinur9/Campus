import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list'
import { style } from '@angular/animations';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatSidenavModule,
            MatToolbarModule,
            RouterModule,
            MatButtonModule,
            MatIconModule,
            FlexLayoutModule,
            MatGridListModule],

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  tiles = [{text:'one', cols: 1, rows: 1},
           {text:'two', cols: 1, rows: 1},
           {text:'three', cols: 1, rows: 1},
           {text:'gap', cols: 1, rows: 1},
           {text:'for further instruction i have told akmam to do a lot of things of choiche.but he doesnot listen to me. \n he listens to sohan and beji always creating so much problem. this is bad for society. this is an upscale society problem dont you understand?', cols: 1, rows: 2}]

}
