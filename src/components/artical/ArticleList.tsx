import {
  FiArrowRight
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { tenantHelpArticles } from "../../data";


export const ArticleList = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenantHelpArticles.map((article) => (
          <Link
            key={article.id}
            to={`/help/${article.id}`}
            className="group flex items-center justify-between p-6 bg-white border border-slate-200 rounded-lg shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="text-slate-800 font-medium text-base leading-snug group-hover:text-blue-600 transition-colors duration-200 pr-4">
              {article.title}
            </span>
            <FiArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
};
