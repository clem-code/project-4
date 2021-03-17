import os

db_URI = os.getenv("DATABASE_URL", "postgres://localhost:5432/stocks_db")
secret = os.getenv("SECRET", "jasmine camel book library mango planet")
