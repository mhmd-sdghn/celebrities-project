import {
  Button,
  Col,
  Drawer,
  Grid,
  Input,
  Select,
  Textarea,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import usePost from "../../../hooks/usePost";
import { Celebrities, Celebrity } from "../../../types/Celebrities";
import { NewFaceDrawerProps } from "../../../types/Params";

function NewFaceModal({ opened, refetch, setOpened }: NewFaceDrawerProps) {
  const notifications = useNotifications();

  const [title, setTitle] = useState("");
  const [face, setFace] = useState<Celebrity | string>();
  const [description, setDescription] = useState("");

  const { data: faces } = useFetch<Celebrities>("/celebrities");

  const { mutate: mutatePost, isLoading } = usePost({
    method: "POST",
    url: "/works",
  });

  function handleSubmit() {
    mutatePost(
      {
        data: {
          title,
          author: face,
          description,
        },
      },
      {
        onSuccess() {
          refetch();
          setOpened(false);
          notifications.showNotification({
            title: "ثبت شد",
            message: "اثر جدید با موفقیت ثبت شد",
            color: "green",
          });
        },
      }
    );
  }

  return (
    <Drawer
      position='left'
      transition='slide-left'
      opened={opened}
      onClose={() => setOpened(false)}
      title='ثبت اثر'
      padding='xl'
      size='xl'
    >
      <form>
        <Grid>
          <Col span={12}>
            <Input
              placeholder='عنوان'
              onChange={(e: any) => setTitle(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Select
              onChange={(e: any) => setFace(e)}
              placeholder='صاحب اثر'
              searchable
              data={(faces && Array.isArray(faces) ? faces : []).map(
                (item: Celebrity) => ({
                  key: item._id,
                  label: item.title,
                  value: item._id,
                })
              )}
            />
          </Col>
          <Col span={12}>
            <Textarea
              placeholder='توضیحات'
              minRows={10}
              maxRows={15}
              onChange={(e: any) => setDescription(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Button
              style={{ width: "100%" }}
              onClick={() => handleSubmit()}
              loading={isLoading}
            >
              ثبت
            </Button>
          </Col>
        </Grid>
      </form>
    </Drawer>
  );
}

export default NewFaceModal;
