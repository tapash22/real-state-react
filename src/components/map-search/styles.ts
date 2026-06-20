export const styles = {
  // ==========================================
  // ROOT CONTAINERS (Viewport Layout Strategy)
  // ==========================================
  desktopContainer: {
    display: "flex",
    flexDirection: "row" as const, // Side-by-side layout
    width: "100%", // Spans full browser width
    height: "calc(100vh - 80px)", // Adjusts perfectly if you have a top navbar
    overflow: "hidden",
    backgroundColor: "#0a1128", // Deep dark theme
    color: "#ffffff",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  mobileContainer: {
    display: "flex",
    flexDirection: "column" as const, // Stacked layout flow
    width: "100%",
    height: "100%", // Crucial: allows content to grow and push footer down
    backgroundColor: "#0a1128",
    color: "#ffffff",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  // ==========================================
  // WRAPPER TRACKS (Listings vs Map Areas)
  // ==========================================
  desktopListWrapper: {
    width: "45%",
    minWidth: "400px",
    height: "100%",
    backgroundColor: "#0f172a",
    borderRight: "1px solid #1e293b",
    order: 1, // Enforces list stays on the left half
  },

  mobileListWrapper: {
    width: "100%",
    height: "400px",
    padding: "16px",
    boxSizing: "border-box" as const,
    backgroundColor: "#0f172a",
    order: 2, // Sits naturally below the mobile map wrapper
  },

  desktopMapWrapper: {
    flex: 1, // Aggressively claims all remaining horizontal screen real estate
    height: "100%",
    position: "relative" as const,
    order: 2, // Enforces map stays on the right half
  },

  mobileMapWrapper: {
    width: "100%",
    height: "auto", // Fixed visual window for map at top of mobile devices
    position: "relative" as const,
    order: 1,
  },

  // ==========================================
  // PANEL WORKSPACES (Inner Layouts)
  // ==========================================
  leftPanel: {
    padding: "24px",
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    boxSizing: "border-box" as const,
  },

  rightPanel: {
    width: "100%",
    height: "100%",
  },

  mapElement: {
    width: "100%",
    height: "100%",
  },

  // ==========================================
  // TYPOGRAPHY & HEADERS
  // ==========================================
  header: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "22px",
    fontWeight: 700,
    margin: "0 0 4px 0",
    letterSpacing: "-0.02em",
  },

  subtitle: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
  },

  // ==========================================
  // CARD GRID SYSTEMS
  // ==========================================
  // ==========================================
  // CARD GRID SYSTEMS
  // ==========================================
  grid: (isLoading: boolean, isMobile: boolean) => ({
    display: "grid",
    // 1 column on mobile, 2 columns side-by-side on desktop
    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
    gap: "16px",
    opacity: isLoading ? 0.6 : 1,
    transition: "opacity 0.15s ease",
    width: "100%",
    boxSizing: "border-box" as const,
  }),

  // ==========================================
  // PROPERTY CARD DESIGN
  // ==========================================
  card: (isHovered: boolean) => ({
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    overflow: "hidden",
    border: `1px solid ${isHovered ? "#3b82f6" : "#334155"}`, // Highlight on hover
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    boxShadow: isHovered ? "0 10px 15px -3px rgba(0, 0, 0, 0.3)" : "none",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column" as const,
    width: "100%",
  }),

  imageWrapper: {
    position: "relative" as const,
    width: "100%",
    height: "160px",
    backgroundColor: "#334155",
  },

  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },

  cardBody: {
    padding: "14px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
  },

  cardMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    color: "#94a3b8",
  },

  cardTitle: {
    fontSize: "14px",
    fontWeight: 600,
    margin: 0,
    color: "#f8fafc",
    lineHeight: "1.4",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  cardPrice: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#38bdf8",
    marginTop: "4px",
  },

  // ==========================================
  // EMPTY VISUAL STATES
  // ==========================================
  emptyState: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "40px 20px",
    textAlign: "center" as const,
    border: "2px dashed #334155",
    borderRadius: "12px",
    marginTop: "20px",
    color: "#94a3b8",
  },

  mobileEmptyState: {
    position: "absolute" as const,
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    backdropFilter: "blur(4px)",
    padding: "10px 16px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#f8fafc",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
    whiteSpace: "nowrap" as const,
    border: "1px solid #334155",
  },
};
