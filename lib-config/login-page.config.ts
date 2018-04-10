import { InjectionToken } from "@angular/core";

// Create the injection token for the custom config
export const LOGIN_PAGE_CONFIG = new InjectionToken('loginPageConfig');

export interface LoginPageConfig {
  name: string;
  description: string;
  afterLoginRoute: string;
  registerRoute: string;
}
