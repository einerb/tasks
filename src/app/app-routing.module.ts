import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './pages/task/task.component';

import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {
    path: `login`,
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: `register`,
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: `home`,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/task/task.module').then((m) => m.TaskModule),
  },
  {
    path: `home/profile`,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: ``, redirectTo: `home`, pathMatch: `full` },
  { path: '**', component: TaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
