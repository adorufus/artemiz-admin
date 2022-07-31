import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentConfig, ENV_CONFIG } from '../interface/env-config';
import { General } from '../model/general.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  apiUrl = '';

  constructor(
    private http: HttpClient,
    @Inject(ENV_CONFIG) config: EnvironmentConfig,
    private authService: AuthService
  ) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  getGeneralInfo(): Observable<[General]> {
    return this.http.get<[General]>(this.apiUrl + "settings/general/all", {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })
  }

  updateGeneralInfo(
    app_name: string,
    about_us: string,
    company_email: string,
    company_phone: string,
    jumbotron_image: File,
    about_us_mini: string,
    settings_id: string
  ): Observable<General> {
    const formData: FormData = new FormData();

    formData.append('app_name', app_name);
    formData.append('about_us', about_us);
    formData.append('company_email', company_email);
    formData.append('company_phone', company_phone);
    formData.append('about_us_mini', about_us_mini);
    formData.append('jumbotron_image', jumbotron_image);

    return this.http.put<General>(
      this.apiUrl + `settings/general/update?id=${settings_id}`,
      formData,
      {
        headers: {
          "Authorization": `Bearer ${this.authService.getToken()}`
        }
      }
    );
  }
}
