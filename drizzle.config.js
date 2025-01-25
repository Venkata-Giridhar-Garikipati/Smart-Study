import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://AI-Study-Material_owner:EiTy4WfBn8hb@ep-black-wave-a5mgf5vc.us-east-2.aws.neon.tech/AI-Study-Material?sslmode=require',
  }
});
