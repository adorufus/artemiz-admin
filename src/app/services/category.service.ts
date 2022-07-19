import { HttpClient } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV_CONFIG, EnvironmentConfig } from '../interface/env-config';
import { News } from '../model/news.model';
import { Category, Tier, TierData } from '../model/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl?: string;

  constructor(
    private http: HttpClient,
    @Inject(ENV_CONFIG) config: EnvironmentConfig
  ) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(this.apiUrl! + 'portfolio/category/all');
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(this.apiUrl! + `portfolio/category?id=${categoryId}`)
  }

  addCategory(categoryName: string, imageUri: File): Observable<Category> {
    const formData: FormData = new FormData();

    formData.append('category_name', categoryName);
    formData.append('image_file', imageUri);

    return this.http.post<Category>(
      this.apiUrl! + 'portfolio/category/create',
      formData,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NjI5NDg4NmY0ZWUyYzIxNWQ4ZTEiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjQ3Nzk2OTkxLCJleHAiOjE4Mjc3OTY5OTF9.2yWadBf02Vn1Oc598tWZKjXDrrpgrkFqdwNCpBiD7FE',
        },
      }
    );
  }

  deleteCategory(bannerId: string): Observable<Category> {
    return this.http.delete<Category>(
      this.apiUrl! + `portfolio/category/delete?id=${bannerId}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NjI5NDg4NmY0ZWUyYzIxNWQ4ZTEiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjQ3Nzk2OTkxLCJleHAiOjE4Mjc3OTY5OTF9.2yWadBf02Vn1Oc598tWZKjXDrrpgrkFqdwNCpBiD7FE',
        },
      }
    );
  }

  updateCategory(
    categoryId: string,
    categoryName: string,
    imageUri: File
  ): Observable<Category> {
    const formData: FormData = new FormData();

    formData.append('category_name', categoryName);
    formData.append('image_file', imageUri);

    return this.http.put<Category>(
      this.apiUrl! + `portfolio/category/edit?id=${categoryId}`,
      formData,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NjI5NDg4NmY0ZWUyYzIxNWQ4ZTEiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjQ3Nzk2OTkxLCJleHAiOjE4Mjc3OTY5OTF9.2yWadBf02Vn1Oc598tWZKjXDrrpgrkFqdwNCpBiD7FE',
        },
      }
    );
  }

  getTierByCategory(categoryId: string): Observable<TierData> {
    return this.http.get<TierData>(this.apiUrl! + `portfolio/tier/all-by-portfolio?portfolioId=${categoryId}`)
  }

  createTier(tier_name: string, categoryId: string, tier_images: File[], tier_description: string, youtube_url: string): Observable<Tier> {

    console.log(tier_images);

    const formData: FormData = new FormData();

    formData.append("tier_name", tier_name);
    formData.append("categoryId", categoryId);
    formData.append("youtube_url", youtube_url);
    formData.append("tier_description", tier_description);
    
    for(let i = 0; i < tier_images.length; i++) {
      console.log(tier_images[i]);
      formData.append(`images`, tier_images[i])
    }

    return this.http.post<Tier>(this.apiUrl! + "portfolio/tier/create", formData, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NjI5NDg4NmY0ZWUyYzIxNWQ4ZTEiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjQ3Nzk2OTkxLCJleHAiOjE4Mjc3OTY5OTF9.2yWadBf02Vn1Oc598tWZKjXDrrpgrkFqdwNCpBiD7FE"
      }
    })

  }

  deleteTier(id: string): Observable<Tier> {
    return this.http.delete(this.apiUrl! + `portfolio/delete?id=${id}`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NjI5NDg4NmY0ZWUyYzIxNWQ4ZTEiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjQ3Nzk2OTkxLCJleHAiOjE4Mjc3OTY5OTF9.2yWadBf02Vn1Oc598tWZKjXDrrpgrkFqdwNCpBiD7FE"
      }
    })
  }
}
