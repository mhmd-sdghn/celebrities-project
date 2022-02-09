import { ActionIcon, Button, Group, Table, Tooltip } from "@mantine/core";
import Layout from "../../components/layouts/main";
import useFetch from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import { Works, Work } from "../../types/Works";
import { Trash, Edit, ArrowRightCircle, PlusCircle } from "react-feather";
import { useState } from "react";
import { useNotifications } from "@mantine/notifications";
import NewWorkDrawer from "../../components/containers/NewWork";
import EditWorkDrawer from "../../components/containers/EditWork";

import Link from "next/link";

export default function Manage() {
  const [isNewRecordDrawerOpen, setIsNewRecordDrawerOpen] = useState(false);

  const [editRowData, setEditRowData] = useState();

  const notifications = useNotifications();

  const { data, refetch } = useFetch<Works>("/works");

  const { mutate } = usePost({
    method: "DELETE",
  });

  function handleDelete(id: string) {
    mutate(
      { url: `/works/${id}` },
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
      data.map((element: Work, index: number) => (
        <tr key={element._id}>
          <td>{index + 1}</td>
          <td>{element.title}</td>
          <td>{element.author.title}</td>
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
    <Layout title='مدیریت آثار'>
      <NewWorkDrawer
        opened={isNewRecordDrawerOpen}
        refetch={refetch}
        setOpened={setIsNewRecordDrawerOpen}
      />
      <EditWorkDrawer
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
          ثبت اثر
        </Button>
      </Group>
      <Table>
        <thead>
          <tr>
            <th style={{ textAlign: "right" }}>ردیف</th>
            <th style={{ textAlign: "right" }}>نام</th>
            <th style={{ textAlign: "right" }}>صاحب اثر</th>
            <th style={{ textAlign: "right" }}>عملیات</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Layout>
  );
}
