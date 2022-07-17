import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { EnvironmentConfig, ENV_CONFIG } from '../interface/env-config';
import { News } from '../model/news.model';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  apiUrl?: string;

  constructor(private http: HttpClient, @Inject(ENV_CONFIG) config: EnvironmentConfig) { 
    this.apiUrl = `${config.environment.baseUrl}`
  }

  getNews(): Observable<News> {
    return this.http.get<News>(this.apiUrl! + 'news/all');
  }
}
