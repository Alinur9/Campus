import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { UserComponent } from './user/user.component';


export const routes: Routes =
 [{path:'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'home', component: HomeComponent},
  {path: 'notification',component:NotificationComponent},
   {path: 'newsfeed',component: NewsfeedComponent},
  {path: "user", component: UserComponent}];
