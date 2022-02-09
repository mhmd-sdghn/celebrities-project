import { ActionIcon, Button, Group, Table, Tooltip } from "@mantine/core";
import Layout from "../../components/layouts/main";
import useFetch from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import { Celebrities, Celebrity } from "../../types/Celebrities";
import { Trash, Edit, ArrowRightCircle, PlusCircle } from "react-feather";
import { useState } from "react";
import { useNotifications } from "@mantine/notifications";
import NewFaceDrawer from "../../components/containers/NewFace";
import EditFaceDrawer from "../../components/containers/EditFace";

import Link from "next/link";

export default function Manage() {
  const [isNewRecordDrawerOpen, setIsNewRecordDrawerOpen] = useState(false);

  const [editRowData, setEditRowData] = useState();

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
          <td style={{ display: "flex", justifyContent: "flex-end" }}>
            <Group>
              <Tooltip label='ویرایش' withArrow>
                <ActionIcon
                  color='blue'
                  size='lg'
                  onClick={() => setEditRowData(element)}
                >
                  <Edit size={15} />
                </ActionIcon>
              </Tooltip>
              <ActionIcon
                color='red'
                size='lg'
                onClick={() => handleDelete(element._id)}
              >
                <Trash size={15} />
              </ActionIcon>
            </Group>
          </td>
        </tr>
      ))
    );

  return (
    <Layout>
      <NewFaceDrawer
        opened={isNewRecordDrawerOpen}
        refetch={refetch}
        setOpened={setIsNewRecordDrawerOpen}
      />
      <EditFaceDrawer
        data={editRowData}
        opened={!!editRowData}
        refetch={refetch}
        setOpened={(_: boolean) => setEditRowData(undefined)}
      />

      <Group position='apart'>
        <Link href='/manage' passHref>
          <a>
            <Button color='gray' leftIcon={<ArrowRightCircle size={18} />}>
              برگشت
            </Button>
          </a>
        </Link>
        <Button
          onClick={() => setIsNewRecordDrawerOpen(true)}
          leftIcon={<PlusCircle size={18} />}
        >
          ثبت چهره
        </Button>
      </Group>
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
