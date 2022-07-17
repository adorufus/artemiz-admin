import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV_CONFIG, EnvironmentConfig } from '../interface/env-config';
import { News } from '../model/news.model';
import { Category } from '../model/portfolio.model';

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
}
