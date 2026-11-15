import { Link } from "react-router-dom";
import { userShape } from "../../utils/propShapes.js";
import "./HomePage.css";

// Landing page that also serves as the in-app instructions.
export default function HomePage({ user }) {
  return (
    <div className="page home">
      <section className="home-hero">
        <h1>Track every co-op application. Prepare for every interview.</h1>
        <p className="home-lead">
          Applied keeps your co-op search in one place: log each application and
          its status, and practice with interview questions shared by other
          students.
        </p>
        <div className="home-actions">
          {user ? (
            <Link to="/applications" className="btn btn-primary">
              Go to my applications
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Log in or create an account
            </Link>
          )}
          <Link to="/questions" className="btn">
            Browse the question bank
          </Link>
        </div>
      </section>

      <section className="home-guides" aria-labelledby="how-to-heading">
        <h2 id="how-to-heading">How to use Applied</h2>
        <div className="home-guide-grid">
          <article className="home-guide">
            <h3>Application Tracker</h3>
            <ol>
              <li>Log in, then open My Applications.</li>
              <li>
                Select Add application and enter the company, role, date
                applied, status, and any notes.
              </li>
              <li>
                Your applications appear on a board grouped by status. Use the
                Move to buttons on a card when you hear back.
              </li>
              <li>
                Filter by company, role, status, or date range to find one
                before an interview.
              </li>
              <li>Edit or delete a card at any time. Only you can see it.</li>
            </ol>
          </article>
          <article className="home-guide">
            <h3>Interview Question Bank</h3>
            <ol>
              <li>Open Question Bank. You can browse without logging in.</li>
              <li>
                Search by keyword and filter by company, topic, difficulty, and
                interview round.
              </li>
              <li>
                Open a question to see its company, role, round, and preparation
                notes.
              </li>
              <li>
                Logged in? Select Share a question to post one you were asked.
              </li>
              <li>
                Edit or delete your own questions from their detail page. Use
                Only my questions to list them.
              </li>
            </ol>
          </article>
        </div>
      </section>
    </div>
  );
}

HomePage.propTypes = {
  user: userShape,
};
