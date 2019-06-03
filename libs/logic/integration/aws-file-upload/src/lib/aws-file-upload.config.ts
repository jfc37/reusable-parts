/**
 * Config required to be provided by consuming application
 */
export interface AwsFileUploadConfig {
  baseS3Url: string;
  getFileMetadataUrl: string;
  getFileUploadUrl: string;
}

export const AWS_FILE_UPLOAD_CONFIG = 'AWS_FILE_UPLOAD_CONFIG';
