# Applied

**Track every co-op application and prepare with interview questions shared by students.**

## Authors

- **Kothuri Venkata Srujan**: Application Tracker (users, Passport authentication, applications collection, status board)
- **Lakshmana Kontemukkula**: Interview Question Bank (questions collection, question seed, question search, detail, and form)

## Class

CS 5610 Web Development, Northeastern University, taught by John Alexis Guerra Gómez.
Class page: https://johnguerra.co/classes/webDevelopment_online_fall_2026/

## Project objective

Co-op search at Northeastern means applying to dozens of companies at once. Most students track applications in a spreadsheet or not at all, lose track of who replied, and find past interview questions scattered across group chats.

Applied has two independent features:

1. **Application Tracker**: log every application (company, role, date applied, status, notes), see them on a board grouped by status (Applied, Interviewing, Offer, Rejected), move them between statuses with one click, and filter by company, role, status, or date range. Applications are private to each account.
2. **Interview Question Bank**: search interview questions by keyword, company, topic, difficulty, and interview round. Open a question to read its preparation notes, and share, edit, or delete questions you were asked yourself.

The full design document, with personas, user stories, and wireframes, is in [docs/DESIGN.md](docs/DESIGN.md).

## Tech stack

- **Frontend**: React 18 with hooks, React Router, the Fetch API, PropTypes, and Vite
- **Backend**: Node.js and Express 5
- **Database**: MongoDB through the official native driver (no Mongoose)
- **Authentication**: Passport (`passport-local`) with `express-session` and `bcryptjs`. Sessions are stored in MongoDB by a small custom store in `backend/db/sessionStore.js`.
- **Code quality**: ESLint (flat config) and Prettier in both packages

No CORS middleware is needed. In development, Vite proxies `/api` to Express, so the browser only talks to one origin.

## Project structure

```
backend/
  app.js        Express app (exported for Vercel)
  server.js     starts the app locally
  config/       environment loading
  db/           MongoDB connection and one module per collection
  auth/         Passport strategy and session serialization
  routes/       API routes
frontend/
  src/api/          fetch wrapper for the API
  src/components/   one folder per component: Component.jsx + Component.css
  src/utils/        PropTypes shapes
  src/styles/       global design tokens
docs/           design document and wireframes
```

## Build and run locally

Requirements: Node.js 20.12 or newer, and a MongoDB database (a free MongoDB Atlas cluster works).

1. Install dependencies:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Configure the backend by copying the example environment file and filling in your values:

   ```bash
   cp backend/.env.example backend/.env
   ```

   Set `MONGODB_URI`, `DB_NAME`, and `SESSION_SECRET` (a long random string). `.env` is git-ignored and must never be committed.

3. Start both servers in two terminals:

   ```bash
   cd backend && npm run dev
   ```

   ```bash
   cd frontend && npm run dev
   ```

   Then open http://localhost:5173.

### Lint and format

```bash
cd backend && npm run lint && npm run format:check
cd frontend && npm run lint && npm run format:check
```

## License

[MIT](LICENSE)
