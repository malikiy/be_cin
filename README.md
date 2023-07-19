how to run:

1. setup database using docker docker run --name query-db -p 5432:5432 -e POSTGRES_PASSWORD=spvadmin123 -d postgres
2. run "npx prisma db push"
3. run "npx prisma generate"
4. copy env.example to .env
5. run "node app.js"