import { ReactChildren, ReactChild } from "react";
import Head from "next/head";
import {
  Container,
  ActionIcon,
  Group,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";
import NavItems from "../../../config/nav";
import GeneralConfig from "../../../config/general";
import { User, Sun, Moon } from "react-feather";
import useStyles from "./styles";

function MainLayout({ children, title }: MainLayoutProps) {
  const theme = useMantineTheme();

  const { classes } = useStyles();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={classes.container}>
        <header className={classes.header}>
          <Container>
            <Group position='apart' className={classes.headerWrapper}>
              <Group>
                <Link passHref href='/'>
                  <h1 className={classes.headerTitle}>
                    {GeneralConfig.appName}
                  </h1>
                </Link>
                {NavItems.map((item) => (
                  <div style={{ marginBottom: 1 }} key={item.id}>
                    <Link href={item.to} passHref>
                      <ActionIcon size='lg' variant='default'>
                        <item.icon size={18} />
                      </ActionIcon>
                    </Link>
                  </div>
                ))}
              </Group>
              <Group position='right'>
                <ActionIcon variant='default' size='lg'>
                  <User size={18} />
                </ActionIcon>
                <ActionIcon
                  variant='default'
                  size='lg'
                  onClick={() => toggleColorScheme()}
                >
                  {colorScheme === "dark" ? (
                    <Sun size={18} />
                  ) : (
                    <Moon size={18} />
                  )}
                </ActionIcon>
              </Group>
            </Group>
          </Container>
        </header>
        <main className={classes.mainWrapper}>
          <Container>{children}</Container>
        </main>
        <footer className={classes.footerWrapper}>
          دانشگاه صنعتی سجاد | حسن ابویی
        </footer>
      </div>
    </>
  );
}

export default MainLayout;

interface MainLayoutProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  title?: string;
}