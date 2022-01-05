import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginBottom: 5,
    marginTop: theme.spacing.sm,
  },
  descriptionText: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];,
    lineHeight: 1.5,
  },
  seeMoreBtn: {
    marginTop: 14
  }
}));

export default useStyles;
