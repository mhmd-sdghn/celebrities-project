import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.gray[9]
        : theme.colors.gray[0],
    width: "100%",
    height: "400px",
    marginTop: theme.spacing.sm,
    borderRadius: "5px",
    position: "relative",
    overflow: "hidden",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  styledBoldText: {
    marginRight: "10px",
    color: theme.colors.blue[3],
    textShadow: `1px 1px ${theme.colors.blue[8]}`,
  },
}));

export default useStyles;
