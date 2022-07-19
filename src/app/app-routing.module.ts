import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from './components/admin/banner/banner.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { NewsComponent } from './components/admin/news/news.component';
import { PortfolioComponent } from './components/admin/portfolio/portfolio.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"home",
    component: DashboardComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'banner',
    component: BannerComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'portfolio/:id',
    component: PortfolioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
