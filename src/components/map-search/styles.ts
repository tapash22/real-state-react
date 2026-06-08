import { CSSProperties } from "react";

export const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "system-ui, sans-serif",
    overflow: "hidden",
  } as CSSProperties,
  leftPanel: {
    width: "55%",
    height: "100%",
    overflowY: "auto",
    padding: "24px",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  } as CSSProperties,
  rightPanel: {
    width: "45%",
    height: "100%",
    position: "relative",
  } as CSSProperties,
  mapElement: { width: "100%", height: "100%" } as CSSProperties,
  header: {
    marginBottom: "24px",
    borderBottom: "1px solid #f2f2f2",
    paddingBottom: "16px",
  } as CSSProperties,
  title: {
    fontSize: "22px",
    margin: "0 0 4px 0",
    color: "#222",
    fontWeight: 700,
  } as CSSProperties,
  subtitle: {
    margin: "0",
    color: "#717171",
    fontSize: "14px",
  } as CSSProperties,
  grid: (loading: boolean): CSSProperties => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
    opacity: loading ? 0.6 : 1,
    transition: "opacity 0.15s ease",
  }),
  card: (isHovered: boolean): CSSProperties => ({
    border: "1px solid #ebebeb",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: isHovered ? "0 6px 20px rgba(0,0,0,0.1)" : "none",
    transform: isHovered ? "translateY(-2px)" : "none",
    transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)",
    cursor: "pointer",
  }),
  imageWrapper: {
    height: "160px",
    width: "100%",
    backgroundColor: "#f7f7f7",
  } as CSSProperties,
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  } as CSSProperties,
  cardBody: { padding: "14px" } as CSSProperties,
  cardMeta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#717171",
    marginBottom: "6px",
  } as CSSProperties,
  cardTitle: {
    margin: "0 0 10px 0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#222",
    height: "38px",
    overflow: "hidden",
  } as CSSProperties,
  cardPrice: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#222",
  } as CSSProperties,
  emptyState: {
    textAlign: "center",
    padding: "60px 0",
    color: "#717171",
    fontSize: "15px",
  } as CSSProperties,
};
