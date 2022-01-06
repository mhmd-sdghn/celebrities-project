import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr auto",
    position: "relative",
    top: "0",
    left: "0",
  },
  header: {
    gridRow: "1fr",
  },
  headerWrapper: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.gray[9]
        : theme.colors.gray[0],
    padding: "0 10px",
    borderRadius: "0 0" + theme.spacing.sm,
    boxShadow: "1px 2px 1px rgba(0,0,0,0.05)",
  },
  headerTitle: {
    cursor: "pointer",
    fontSize: "1rem",
    background: theme.colors.blue[9],
    color: theme.colors.blue[0],
    borderRadius: "50px",
    padding: "5px 10px",
  },
  mainWrapper: {
    gridTemplateRows: "auto",
  },
  footerWrapper: {
    gridTemplateRows: "1fr",
    padding: theme.spacing.xl,
    display: "flex",
    marginTop: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.gray[9]
        : theme.colors.gray[0],
  },
}));

export default useStyles;
