import { defineConfig } from '@prisma/cli';

export default defineConfig({
  datasource: {
    db: {
      provider: 'mysql',
      url: process.env.DATABASE_URL,
    },
  },
});
