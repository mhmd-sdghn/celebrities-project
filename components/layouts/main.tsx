import { ReactChildren, ReactChild } from "react";
import Head from "next/head";
import {
  Container,
  Grid,
  Col,
  ActionIcon,
  Group,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import NavItems from "../../config/nav";
import GeneralConfig from "../../config/general";
import { User } from "react-feather";

function MainLayout({ children, title }: MainLayoutProps) {
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        style={{
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto 1fr auto",
          position: "relative",
          top: "0",
          left: "0",
        }}
      >
        <header
          style={{
            gridRow: "1fr",
          }}
        >
          <Container>
            <Group
              position='apart'
              style={{
                background: "#FAFAFA",
                padding: "0 10px",
                borderRadius: "0 0" + theme.spacing.sm,
                boxShadow: "1px 2px 1px rgba(0,0,0,0.05)",
              }}
            >
              <Group>
                <Link passHref href='/'>
                  <h1
                    style={{
                      cursor: "pointer",
                      fontSize: "1rem",
                      background: "#283593",
                      color: "#fff",
                      borderRadius: "50px",
                      padding: "5px 10px",
                    }}
                  >
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
                <ActionIcon variant='filled' size='lg'>
                  <User size={18} />
                </ActionIcon>
              </Group>
            </Group>
          </Container>
        </header>{" "}
        <main
          style={{
            gridTemplateRows: "auto",
          }}
        >
          <Container>{children}</Container>
        </main>
        <footer
          style={{
            gridTemplateRows: "1fr",
          }}
        >
          فوتر
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
