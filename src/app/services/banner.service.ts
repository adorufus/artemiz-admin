import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// import { config } from 'process';
import { Observable } from 'rxjs';
import { EnvironmentConfig, ENV_CONFIG } from '../interface/env-config';
import { Banner } from '../models/banner.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  apiUrl: string = ""

  constructor(private http: HttpClient, @Inject(ENV_CONFIG) config: EnvironmentConfig, private authService: AuthService) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  getAllBanner(): Observable<Banner> {
    return this.http.get<Banner>(this.apiUrl + "banner/all");
  }

  createBanner(file_name: string, image_file: File): Observable<Banner> {

    const formData: FormData = new FormData()

    formData.append("file_name", file_name)
    formData.append("go_to_url", "")
    formData.append("image_file", image_file)

    return this.http.post<Banner>(this.apiUrl + "banner/add", formData, {
      headers: {
        "Authorization": `Bearer ${this.authService.getToken()}`
      }
    })

  }

  deleteBanner(bannerId?: string): Observable<Banner> {
    return this.http.delete(this.apiUrl + `banner/delete?banner_id=${bannerId}`, {
      headers: {
        "Authorization": `Bearer ${this.authService.getToken()}`
      }
    })
  }
}
