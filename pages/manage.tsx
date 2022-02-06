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
import NewFaceDrawer from "../components/containers/NewFace";

export default function Manage() {
  const [opened, setOpened] = useState(false);

  const notifications = useNotifications();

  const { data, refetch } = useFetch<Celebrities>("/celebrities");

  const { mutate } = usePost({
    method: "DELETE",
  });

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
      <NewFaceDrawer opened={opened} refetch={refetch} setOpened={setOpened} />
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
