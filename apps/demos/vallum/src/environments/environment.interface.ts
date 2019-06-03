import { Auth0Config } from '@reusable-parts/logic/integration/auth0';
import { NzBusinessApiConfig } from '@reusable-parts/logic/integration/nz-business';
import { CopperCrmConfig } from '@reusable-parts/logic/integration/copper-crm';
import { AwsFileUploadConfig } from '@reusable-parts/logic/integration/aws-file-upload';

export interface IEnvironment {
  production: boolean;
  domain: string;

  auth0: Auth0Config;
  nzBusinessApi: NzBusinessApiConfig;
  copperCrm: CopperCrmConfig;
  awsFileUploadConfig: AwsFileUploadConfig;
}
