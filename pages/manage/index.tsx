import { Col, Notification, Grid } from "@mantine/core";
import Link from "next/link";
import Layout from "../../components/layouts/main";

function ManagePage() {
  return (
    <Layout title='مدیریت'>
      <Grid>
        <Col span={6}>
          <Link href='/manage/faces'>
            <a>
              <Notification onClose={() => {}} disallowClose title='شخصیت‌ها'>
                افزودن و مدیریت چهره‌ها
              </Notification>
            </a>
          </Link>
        </Col>
        <Col span={6}>
          <Link href='/manage/works'>
            <a>
              <Notification
                onClose={() => {}}
                disallowClose
                title='آثار'
                color='green'
              >
                افزودن و مدیریت اثارِ چهره‌ها
              </Notification>
            </a>
          </Link>
        </Col>
      </Grid>
    </Layout>
  );
}

export default ManagePage;
