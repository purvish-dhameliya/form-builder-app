import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: './config/schema.js',
    out: './drizzle.config.js',
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://form-ai_owner:FpoySNM4W8aE@ep-falling-haze-a19kcnvb.ap-southeast-1.aws.neon.tech/form-builder-ai?sslmode=require'
    },
})