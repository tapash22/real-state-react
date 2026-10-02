import { ArticleList } from "../components/artical/ArticleList";
import { SectionHeader } from "../components/header-section/SectionHeader";

export default function HelpingDetails() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full px-8 lg:px-16 py-5 lg:py-10 ">
      <div className="py-5 lg:py-10">
        <SectionHeader
          tagTitle="Help Center"
          headerTitle="How does Thikana work for tenants?"
          subTitle="Finding your next home should be simple. Thikana helps you discover rooms, studios, and rental homes across Bangladesh, compare your options, and plan your stay—all in one place."
        />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col gap-12 justify-center items-center ">
        <ArticleList />
      </div>
    </div>
  );
}
