import Layout from "../components/layouts/main";
import { Grid, Col, Paper } from "@mantine/core";

import LoginForm from "../components/containers/LoginForm";

export default function Login() {
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
              <LoginForm />
            </Paper>
          </Col>
        </Grid>
      </div>
    </Layout>
  );
}
