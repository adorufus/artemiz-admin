import { InjectionToken } from '@angular/core';

export interface EnvironmentConfig {
  environment: {
    baseUrl: String;
  };
}

export const ENV_CONFIG = new InjectionToken<EnvironmentConfig>(
  'EnvironmentConfig'
);
