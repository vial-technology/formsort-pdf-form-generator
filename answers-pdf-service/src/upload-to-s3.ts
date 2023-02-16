import { S3Client } from '@aws-sdk/client-s3';
import { join } from 'path';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { env } from './env';

const { AWS_BUCKET_NAME, AWS_REGION } = env;
const s3Client = new S3Client({ region: AWS_REGION });

export const uploadBufferToS3 = async (
  pdfBuffer: Buffer,
  pathName: string
): Promise<string> => {
  const baseDir = 'pdf/';
  const filename = join(baseDir, pathName);
  const params: PutObjectCommandInput = {
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
    Body: pdfBuffer,
  };
  await s3Client.send(new PutObjectCommand(params));
  return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${filename}`;
};
