# Palmares.info

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

I am using Next.js 13 (13.1.5 when I started this project - 25/01/2023) with TypeScript.

### Dependencies
```sh
npm install next-auth @next-auth/prisma-adapter @prisma/client swr react-hook-form @hookform/resolvers yup validator bcrypt class-variance-authority clsx tailwindcss-animate tailwind-merge @radix-ui/react-menubar lucide-react @mui/icons-material @mui/material @emotion/styled @emotion/react && \
npm install -D prisma tailwindcss postcss autoprefixer @hookform/devtools
```

<br />

### Prisma
To read `.env.local` file because by default Prisma only read `.env` file.<br />
https://www.prisma.io/docs/guides/development-environment/environment-variables/managing-env-files-and-setting-variables#manage-env-files-manually
```sh
npm install -g dotenv-cli
```
```sh
dotenv -e .env.local -- npx prisma generate --schema=./src/lib/prisma/schema.prisma
```
```sh
dotenv -e .env.local -- npx prisma db push --schema=./src/lib/prisma/schema.prisma
```

<br />

Or if you using `.env` file
```sh
npx prisma generate --schema=./src/lib/prisma/schema.prisma
```

```sh
npx prisma db push --schema=./src/lib/prisma/schema.prisma
```
