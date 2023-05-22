import { z } from 'zod';

const EnvSettings = z.object({
  // AWS_REGION: z.string().min(1),
  // AWS_BUCKET_NAME: z.string().min(1),
  FORMSORT_API_KEY: z.string().min(1),
  FORMSORT_API_URL: z.string().url().default('https://api.formsort.com/alpha'),
});


export let env = EnvSettings.parse(process.env);
