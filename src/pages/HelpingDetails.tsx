import { ArticlePage } from "../components/artical/ArticlePage";

export default function HelpingDetails() {
  return (
    <div
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-heading)",
      }}
      className="w-full min-h-screen transition-colors duration-300 lg:py-10 px-5 lg:px-10 flex flex-col justify-center items-center h-full"
    >
      <ArticlePage />
    </div>
  );
}
