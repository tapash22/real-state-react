import { ArticleList } from "../components/artical/ArticleList";
import { SectionHeader } from "../components/header-section/SectionHeader";

export default function HelpingDetails() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full px-5 lg:px-16 py-5 lg:py-10 ">
      <SectionHeader
        tagTitle="Help Center"
        headerTitle="How does Thikana work for tenants?"
        subTitle="Finding your next home should be simple. Thikana helps you discover rooms, studios, and rental homes across Bangladesh, compare your options, and plan your stay—all in one place."
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-5 justify-center items-center lg:items-start border-2 border-[var(--border)] p-5 lg:p-8 rounded-lg shadow-sm">
        <h3
          style={{ color: "var(--text-heading)" }}
          className="text-lg lg:text-2xl font-semibold lg:font-extrabold  lg:tracking-wider lg:whitespace-nowrap tracking-wider"
        >
          Most popular articles
        </h3>
        <ArticleList />
      </div>
    </div>
  );
}
