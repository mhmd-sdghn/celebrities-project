import Layout from "../components/layouts/main";
import { Grid, Col, Paper, Text } from "@mantine/core";

import LoginForm from "../components/containers/LoginForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      router.push("/manage");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Layout>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Grid style={{ width: "100%" }} justify='center'>
          <Col span={12} xl={4} md={5} sm={6}>
            <Paper style={{ width: "100%" }} shadow='sm' padding='xl'>
              {isLoading ? (
                <Text weight={500}>لطفا صبر کنید</Text>
              ) : (
                <LoginForm />
              )}
            </Paper>
          </Col>
        </Grid>
      </div>
    </Layout>
  );
}
