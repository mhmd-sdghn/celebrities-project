import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/general";
import { useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import Layout from "../../components/layouts/main";
import { Image, Title, Text } from "@mantine/core";

function Celebrity() {
  const notifications = useNotifications();

  const [data, setData] = useState();

  const router = useRouter();

  async function getData(id) {
    try {
      const res = await axios({
        method: "GET",
        url: `${config.backendUrl}/celebrities/${id}`,
      });
      setData(res.data);
    } catch (err) {
      notifications.showNotification({
        title: "خطا در ارتباط با سرور",
        message: "در حال حاضر سرور پاسخگو نیست 🤥",
        color: "red",
      });
    }
  }

  useEffect(() => {
    if (router.query.id) {
      getData(router.query.id);
    }
  }, [router.query]);

  return (
    <Layout>
      {!data ? (
        <>لطفا صبر کنید</>
      ) : (
        <>
          <div style={{ width: "100%", margin: "auto" }}>
            <Image
              radius='md'
              src={data.image}
              alt={data.title}
              caption={data.title}
            />
          </div>
          <Title order={1}>{data.title}</Title>
          <Text size='md' style={{ margin: "10px", color: "gray" }}>
            تولد: {data.birthday} | رشته: {data.face}
          </Text>
          <Text size='md'>{data.description}</Text>
        </>
      )}
    </Layout>
  );
}

export default Celebrity;
