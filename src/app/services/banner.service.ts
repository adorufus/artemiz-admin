import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// import { config } from 'process';
import { Observable } from 'rxjs';
import { EnvironmentConfig, ENV_CONFIG } from '../interface/env-config';
import { Banner } from '../models/banner.model';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  apiUrl: string = ""

  constructor(private http: HttpClient, @Inject(ENV_CONFIG) config: EnvironmentConfig) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  getAllBanner(): Observable<Banner> {
    return this.http.get<Banner>(this.apiUrl + "banner/all");
  }

  createBanner(file_name: string, go_to_url: string, image_file: File): Observable<Banner> {

    const formData: FormData = new FormData()

    formData.append("file_name", file_name)
    formData.append("go_to_url", go_to_url)
    formData.append("image_file", image_file)

    return this.http.post<Banner>(this.apiUrl + "banner/add", formData, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NjI5NDg4NmY0ZWUyYzIxNWQ4ZTEiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjQ3Nzk2OTkxLCJleHAiOjE4Mjc3OTY5OTF9.2yWadBf02Vn1Oc598tWZKjXDrrpgrkFqdwNCpBiD7FE"
      }
    })

  }

  deleteBanner(bannerId?: string): Observable<Banner> {
    return this.http.delete(this.apiUrl + `banner/delete?banner_id=${bannerId}`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NjI5NDg4NmY0ZWUyYzIxNWQ4ZTEiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjQ3Nzk2OTkxLCJleHAiOjE4Mjc3OTY5OTF9.2yWadBf02Vn1Oc598tWZKjXDrrpgrkFqdwNCpBiD7FE"
      }
    })
  }
}
