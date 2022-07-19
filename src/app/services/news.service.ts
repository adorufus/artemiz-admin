import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { EnvironmentConfig, ENV_CONFIG } from '../interface/env-config';
import { News } from '../model/news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiUrl?: string;

  constructor(
    private http: HttpClient,
    @Inject(ENV_CONFIG) config: EnvironmentConfig
  ) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  getNews(): Observable<News> {
    return this.http.get<News>(this.apiUrl! + 'news/all');
  }

  createNews(article: string, title: string, image: File): Observable<News> {
    const formData: FormData = new FormData();

    formData.append('article', article);
    formData.append('title', title);
    formData.append('image_file', image);

    return this.http.post<News>(this.apiUrl! + 'news/add', formData, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NjI5NDg4NmY0ZWUyYzIxNWQ4ZTEiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjQ3Nzk2OTkxLCJleHAiOjE4Mjc3OTY5OTF9.2yWadBf02Vn1Oc598tWZKjXDrrpgrkFqdwNCpBiD7FE"
      }
    });
  }

  deleteNews(id: string): Observable<News> {
    return this.http.delete<News>(this.apiUrl! + `news/delete?id=${id}`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NjI5NDg4NmY0ZWUyYzIxNWQ4ZTEiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjQ3Nzk2OTkxLCJleHAiOjE4Mjc3OTY5OTF9.2yWadBf02Vn1Oc598tWZKjXDrrpgrkFqdwNCpBiD7FE"
      }
    })
  }
}
