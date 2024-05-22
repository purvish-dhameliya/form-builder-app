This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


<!-- 
.env varibles

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_DATABASE_URL_CONFIG

 -->
clerk-auth
drizzle-orm
postgres-sql
shadcnui
daisyui
hyperui


<!-- postgres setup

npm i drizzle-orm @neondatabase/serverless
 npm i -D drizzle-kit

.env
NEXT_PUBLIC_DATABASE_URL_CONFIG 

drizzle.config.js
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: './config/schema.js',
    out: './drizzle.config.js',
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://form-ai_owner:FpoySNM4W8aE@ep-falling-haze-a19kcnvb.ap-southeast-1.aws.neon.tech/form-builder-ai?sslmode=require'
    },
})

config
index.js

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG);
export const db = drizzle(sql, {schema});

schema.js

import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const JsonForms = pgTable('forms', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
});

 // running db and studio
 npm run db:push
  npm run db:studio
-->