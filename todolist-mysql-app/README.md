npx prisma
npx prisma init

// 데이터 베이스 연동
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
