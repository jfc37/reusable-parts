/**
 * Config required to be provided by consuming application
 */
export interface NzBusinessApiConfig {
  accessToken: string;
  host: string;
}

export const NZ_BUSINESS_API_CONFIG = 'NZ_BUSINESS_API_CONFIG';
