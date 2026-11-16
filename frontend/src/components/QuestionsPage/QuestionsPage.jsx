import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { questionsApi } from "../../api/client.js";
import useDebouncedValue from "../../hooks/useDebouncedValue.js";
import { userShape } from "../../utils/propShapes.js";
import QuestionFilters from "../QuestionFilters/QuestionFilters.jsx";
import QuestionList from "../QuestionList/QuestionList.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import "./QuestionsPage.css";

const PAGE_SIZE = 20;
const EMPTY_OPTIONS = {
  companies: [],
  topics: [],
  difficulties: [],
  rounds: [],
};

// Filters live in the URL (?topic=...&page=2), so results can be
// bookmarked and the Back button returns to the same search.
function readFilters(searchParams) {
  return {
    q: searchParams.get("q") || "",
    company: searchParams.get("company") || "",
    topic: searchParams.get("topic") || "",
    difficulty: searchParams.get("difficulty") || "",
    round: searchParams.get("round") || "",
    sort: searchParams.get("sort") || "newest",
    mine: searchParams.get("mine") === "true",
  };
}

export default function QuestionsPage({ user }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const filters = readFilters(searchParams);
  const page = Number(searchParams.get("page")) || 1;

  const [searchText, setSearchText] = useState(filters.q);
  const debouncedSearch = useDebouncedValue(searchText, 350);
  const [options, setOptions] = useState(EMPTY_OPTIONS);
  const [result, setResult] = useState({
    key: null,
    questions: [],
    total: 0,
    pages: 1,
    error: "",
  });
  const loading = result.key !== queryString;

  useEffect(() => {
    questionsApi
      .options()
      .then(setOptions)
      .catch(() => setOptions(EMPTY_OPTIONS));
  }, []);

  // Copy the debounced search text into the URL.
  useEffect(() => {
    setSearchParams(
      (current) => {
        if ((current.get("q") || "") === debouncedSearch) return current;
        const next = new URLSearchParams(current);
        if (debouncedSearch) next.set("q", debouncedSearch);
        else next.delete("q");
        next.delete("page");
        return next;
      },
      { replace: true },
    );
  }, [debouncedSearch, setSearchParams]);

  // Fetch a page of questions whenever the URL's filters change.
  useEffect(() => {
    let ignore = false;
    const params = Object.fromEntries(new URLSearchParams(queryString));
    questionsApi
      .list({ ...params, limit: PAGE_SIZE })
      .then((data) => {
        if (!ignore) setResult({ key: queryString, ...data, error: "" });
      })
      .catch((err) => {
        if (!ignore) {
          setResult({
            key: queryString,
            questions: [],
            total: 0,
            pages: 1,
            error: err.message,
          });
        }
      });
    return () => {
      ignore = true;
    };
  }, [queryString]);

  function updateParams(changes) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      Object.entries(changes).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      if (!("page" in changes)) next.delete("page");
      return next;
    });
  }

  function handleReset() {
    setSearchText("");
    setSearchParams({});
  }

  function handlePageChange(nextPage) {
    updateParams({ page: nextPage > 1 ? String(nextPage) : "" });
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="page questions-page">
      <div className="questions-header">
        <div>
          <h1>Interview Question Bank</h1>
          <p className="muted">
            Interview questions shared by students. The demo data is synthetic.
          </p>
        </div>
        {user ? (
          <Link to="/questions/new" className="btn btn-primary">
            + Share a question
          </Link>
        ) : (
          <Link to="/login" state={{ from: "/questions/new" }} className="btn">
            Log in to share a question
          </Link>
        )}
      </div>

      <div className="questions-layout">
        <QuestionFilters
          filters={filters}
          searchText={searchText}
          onSearchTextChange={setSearchText}
          options={options}
          onChange={updateParams}
          onReset={handleReset}
          canFilterMine={Boolean(user)}
        />

        <section className="questions-results" aria-live="polite">
          <p className="questions-count muted">
            {loading
              ? "Searching…"
              : `${result.total.toLocaleString()} question${result.total === 1 ? "" : "s"} found`}
          </p>
          {result.error && (
            <p className="error-message" role="alert">
              {result.error}
            </p>
          )}
          <QuestionList questions={result.questions} loading={loading} />
          <Pagination
            page={page}
            pages={result.pages}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </div>
  );
}

QuestionsPage.propTypes = {
  user: userShape,
};
