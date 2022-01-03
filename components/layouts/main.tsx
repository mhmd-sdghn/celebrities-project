import { ReactChildren, ReactChild } from "react";
import Head from "next/head";
import { Container, Grid, Col, ActionIcon, Space } from "@mantine/core";
import Link from "next/link";
import NavItems from "../../config/nav";
import GeneralConfig from "../../config/general";
import { User } from "react-feather";

function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <Container>
          <Grid
            justify='space-between'
            align='center'
            style={{
              background: "#FAFAFA",
              padding: "14px 10px 5px 10px",
              borderRadius: "0 0 10px 10px",
            }}
          >
            <Col span={11}>
              <Grid align='center'>
                <h1
                  style={{
                    fontSize: "1rem",
                    background: "#283593",
                    color: "#fff",
                    borderRadius: "50px",
                    padding: "5px 10px",
                  }}
                >
                  {GeneralConfig.appName}
                </h1>

                {NavItems.map((item) => (
                  <div style={{ marginBottom: 1, marginRight: 10 }}>
                    <Link href={item.to} passHref>
                      <ActionIcon size='lg'>
                        <item.icon size={18} />
                      </ActionIcon>
                    </Link>
                  </div>
                ))}
              </Grid>
            </Col>
            <Col span={1}>
              <Grid justify='flex-end'>
                <Col span={7}>
                  <ActionIcon variant='filled' size='lg'>
                    <User size={18} />
                  </ActionIcon>
                </Col>
              </Grid>
            </Col>
          </Grid>
        </Container>
      </header>
      <main>{children}</main>
    </>
  );
}

export default MainLayout;

interface MainLayoutProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  title?: string;
}
