/**
 * Config required to be provided by consuming application
 */
export interface AwsFileUploadConfig {
  getFileMetadataUrl: string;
  getFileLinkUrl: string;
  getFileUploadUrl: string;
}

export const AWS_FILE_UPLOAD_CONFIG = 'AWS_FILE_UPLOAD_CONFIG';
