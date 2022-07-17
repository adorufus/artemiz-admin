import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { SidenavComponent } from './components/admin/sidenav/sidenav.component';
import { BannerComponent } from './components/admin/banner/banner.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { NewsComponent } from './components/admin/news/news.component';
import { PortfolioComponent } from './components/admin/portfolio/portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule } from './modules/http/http.module';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    SidenavComponent,
    BannerComponent,
    CategoryComponent,
    NewsComponent,
    PortfolioComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule.forRoot({
      environment
    }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
