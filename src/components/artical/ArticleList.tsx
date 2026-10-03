import {
  FiArrowRight
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { tenantHelpArticles } from "../../data";


export const ArticleList = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
        {tenantHelpArticles.map((article) => (
          <Link
            key={article.id}
            to={`/help/${article.id}`}
            className="group flex items-center justify-between p-5 bg-transparent border border-[var(--border)] rounded-lg shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:border-[var(--border-hover)] hover:bg-[var(--card)] hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="text-[var(--text)] font-medium text-base leading-snug group-hover:text-[var(--text-hover)] transition-colors duration-200 pr-4">
              {article.title}
            </span>
            <FiArrowRight className="w-5 h-5 text-[var(--text)] group-hover:text-[var(--text-hover)] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
};
