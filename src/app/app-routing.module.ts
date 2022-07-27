import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/admin/auth/auth.component';
import { BannerComponent } from './components/admin/banner/banner.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { NewsComponent } from './components/admin/news/news.component';
import { PortfolioComponent } from './components/admin/portfolio/portfolio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:"home",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: AuthComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: 'full',
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'banner',
    component: BannerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'portfolio/:id',
    component: PortfolioComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
