import { ReactChildren, ReactChild, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Container,
  ActionIcon,
  Group,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import NavItems from "../../../config/nav";
import GeneralConfig from "../../../config/general";
import { User, Sun, Moon, LogOut } from "react-feather";
import useStyles from "./styles";
import { useRouter } from "next/router";

function MainLayout({ children, title }: MainLayoutProps) {
  const theme = useMantineTheme();

  const { classes } = useStyles();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("isLogin");
    router.push("/");
  }

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin) setIsLogin(true);
  }, []);

  return (
    <>
      <Head>
        <title>{title || "چهره‌های برجسته"}</title>
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
                <Link href='/login' passHref>
                  <ActionIcon variant='default' size='lg'>
                    <User size={18} />
                  </ActionIcon>
                </Link>
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
                {isLogin ? (
                  <ActionIcon
                    variant='default'
                    size='lg'
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                  </ActionIcon>
                ) : null}
              </Group>
            </Group>
          </Container>
        </header>
        <main>
          <Container className={classes.mainWrapperCotainer}>
            {children}
          </Container>
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
