import { ArticlePage } from "../components/artical/ArticlePage";

export default function HelpingDetails() {
  return (
    <div
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-heading)",
      }}
      className="w-full min-h-screen transition-colors duration-300"
    >
      <ArticlePage />
    </div>
  );
}
