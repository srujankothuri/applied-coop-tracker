// Loads backend/.env into process.env using Node's built-in loader,
// so we do not need the dotenv package. On Vercel there is no .env
// file and the variables come from the project settings instead.
try {
  process.loadEnvFile();
} catch {
  // No .env file present: rely on real environment variables.
}

export const isProduction = process.env.NODE_ENV === "production";
export const PORT = Number(process.env.PORT) || 3000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
export const DB_NAME = process.env.DB_NAME || "applied";
export const SESSION_SECRET = process.env.SESSION_SECRET;
