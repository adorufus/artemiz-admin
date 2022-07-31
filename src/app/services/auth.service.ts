import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentConfig, ENV_CONFIG } from '../interface/env-config';
import { Auth } from '../model/auth.model';
import { BROWSER_STORAGE } from '../utility/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = ""
  
  constructor(private http: HttpClient, @Inject(ENV_CONFIG) private config: EnvironmentConfig, @Inject(BROWSER_STORAGE) private storage: Storage) {
    this.apiUrl = `${config.environment.baseUrl}`
  }

  public getToken(): string {
    return this.storage.getItem('token') ?? "";
  }

  public setToken(token: string) {
    return this.storage.setItem('token', token)
  }

  public setUsername(username: string) {
    return this.storage.setItem('username', username)
  }

  public getUsername(): string {
    return this.storage.getItem('username') ?? "";
  }

  public removeToken(){
    return this.storage.removeItem('token')
  }

  login(username: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(this.apiUrl + "/auth/login", {
      username: username,
      password: password
    })
  }

  


}
