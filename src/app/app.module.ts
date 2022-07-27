import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { SidenavComponent } from './components/admin/sidenav/sidenav.component';
import { BannerComponent } from './components/admin/banner/banner.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { NewsComponent } from './components/admin/news/news.component';
import { PortfolioComponent } from './components/admin/portfolio/portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogCategoryDelete } from './components/admin/category/category.component';
import { HttpModule } from './modules/http/http.module';
import { environment } from 'src/environments/environment';
import { CreateCategoryDialogComponent } from './components/admin/category/dialog/create-category-dialog/create-category-dialog.component';
import { CustomHttpInterceptor } from './helper/http-interceptor';
import { CreateEditDialogComponent } from './components/admin/news/dialogs/create-edit-dialog/create-edit-dialog.component';
import { DeleteNewsDialogComponent } from './components/admin/news/dialogs/delete-news-dialog/delete-news-dialog.component';
import { CreateTierComponent } from './components/admin/portfolio/create-tier/create-tier/create-tier.component';
import { DeleteTierComponent } from './components/admin/portfolio/delete-tier/delete-tier/delete-tier.component';
import { CreateBannerDialogComponent } from './components/admin/banner/create-banner-dialog/create-banner-dialog.component';
import { DeleteBannerDialogComponent } from './components/admin/banner/delete-banner-dialog/delete-banner-dialog.component';
import { AuthComponent } from './components/admin/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    SidenavComponent,
    BannerComponent,
    CategoryComponent,
    NewsComponent,
    PortfolioComponent,
    DashboardComponent,
    DialogCategoryDelete,
    CreateCategoryDialogComponent,
    CreateEditDialogComponent,
    DeleteNewsDialogComponent,
    CreateTierComponent,
    DeleteTierComponent,
    CreateBannerDialogComponent,
    DeleteBannerDialogComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule.forRoot({
      environment,
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
