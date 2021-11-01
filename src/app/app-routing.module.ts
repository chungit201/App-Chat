import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screen/home/home.component';
import { LoginComponent } from './screen/login/login.component';
import { AuthGuard } from './until/auth.goard';
import {MainComponent} from "./screen/main/main.component";
import {BoxChatComponent} from "./screen/main/box-chat/box-chat.component";


const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
        {path:'t/:id', component:BoxChatComponent,
          canActivate:[AuthGuard]
        }
      ]
  },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
