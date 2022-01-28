import {
  Button,
  Col,
  Drawer,
  Grid,
  Input,
  Select,
  Table,
  Textarea,
} from "@mantine/core";
import Layout from "../components/layouts/main";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import { Celebrities, Celebrity } from "../types/Celebrities";
import { Trash } from "react-feather";
import { useState } from "react";
import { useNotifications } from "@mantine/notifications";

export default function Manage() {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState("");
  const [birthday, setBirthday] = useState("");
  const [image, setImage] = useState("");
  const [face, setFace] = useState("");
  const [description, setDescription] = useState("");

  const notifications = useNotifications();

  const { data, refetch } = useFetch<Celebrities>("/celebrities");

  const { mutate } = usePost({
    method: "DELETE",
  });

  const { mutate: mutatePost } = usePost({
    method: "POST",
    url: "/celebrities",
  });

  function handleSubmit() {
    mutatePost(
      {
        data: {
          title,
          image,
          birthday,
          face,
          description,
        },
      },
      {
        onSuccess() {
          refetch();
          setOpened(false);
          notifications.showNotification({
            title: "ثبت شد",
            message: "چهره جدید با موفقیت ثبت شد",
            color: "green",
          });
        },
      }
    );
  }

  function handleDelete(id: string) {
    mutate(
      { url: `/celebrities/${id}` },
      {
        onSuccess() {
          refetch();
          notifications.showNotification({
            title: "حذف شد",
            message: "چهره با موفقیت حذف شد",
            color: "blue",
          });
        },
      }
    );
  }

  const rows =
    !data || !Array.isArray(data) ? (
      <div style={{ width: "100%", textAlign: "center", padding: "10px" }}>
        لطفا صبر کنید
      </div>
    ) : (
      data.map((element: Celebrity, index: number) => (
        <tr key={element._id}>
          <td>{index + 1}</td>
          <td>{element.title}</td>
          <td>{element.birthday}</td>
          <td>
            <Button
              color='red'
              size='xs'
              onClick={() => handleDelete(element._id)}
            >
              <Trash size={15} />
            </Button>
          </td>
        </tr>
      ))
    );

  return (
    <Layout>
      <Drawer
        position='right'
        opened={opened}
        onClose={() => setOpened(false)}
        title='ثبت چهره'
        padding='xl'
        size='xl'
      >
        <form>
          <Grid>
            <Col span={12}>
              <Input
                placeholder='نام'
                onChange={(e: any) => setTitle(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder='تاریخ تولد'
                onChange={(e: any) => setBirthday(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder='ادرس تصویر'
                onChange={(e: any) => setImage(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <Select
                onChange={(e: any) => setFace(e)}
                placeholder='دسته بندی'
                data={["پزشکی و علوم تجربی", "شاعر", "ریاضی‌‌ دان"]}
              />
            </Col>
            <Col span={12}>
              <Textarea
                placeholder='توضیحات'
                onChange={(e: any) => setDescription(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <Button style={{ width: "100%" }} onClick={() => handleSubmit()}>
                ثبت
              </Button>
            </Col>
          </Grid>
        </form>
      </Drawer>
      <Button onClick={() => setOpened(true)}>ثبت چهره</Button>
      <Table>
        <thead>
          <tr>
            <th style={{ textAlign: "right" }}>ردیف</th>
            <th style={{ textAlign: "right" }}>نام</th>
            <th style={{ textAlign: "right" }}>تاریخ تولد</th>
            <th style={{ textAlign: "right" }}>عملیات</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Layout>
  );
}
