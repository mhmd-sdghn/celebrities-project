import { useMantineTheme, Image, createStyles } from "@mantine/core";
import useStyles from "./styles";

function HomePageWellcom() {
  const theme = useMantineTheme();

  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Image src='/images/wellcome.svg' height='400px' />
      <div className={classes.wrapper}>
        <h1>
          <span style={{ color: theme.colors.gray[0] }}>چهره‌های برجسته</span>
          <strong className={classes.styledBoldText}>ایران</strong>
        </h1>
      </div>
    </div>
  );
}

export default HomePageWellcom;
