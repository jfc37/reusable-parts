import { InjectionToken } from "@angular/core";

// Create the injection token for the custom config
export const REGISTER_PAGE_CONFIG = new InjectionToken('registerPageConfig');

export interface RegisterPageConfig {
  name: string;
  description: string;
  loginRoute: string;
}
