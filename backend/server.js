// Starts the API locally. On Vercel, app.js is used directly instead.
import app from "./app.js";
import { PORT } from "./config/env.js";

app.listen(PORT, () => {
  console.log(`Applied API listening on http://localhost:${PORT}`);
});
