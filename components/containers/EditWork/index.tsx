import {
  Button,
  Col,
  Drawer,
  Grid,
  Input,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import usePost from "../../../hooks/usePost";
import { Celebrities, Celebrity } from "../../../types/Celebrities";
import { EditWorkDrawerProps } from "../../../types/Params";

function EditFaceModal({
  opened,
  refetch,
  setOpened,
  data,
}: EditWorkDrawerProps) {
  if (!data) return <></>;

  const notifications = useNotifications();

  const [title, setTitle] = useState("");
  const [face, setFace] = useState<Celebrity | string>();
  const [description, setDescription] = useState("");

  const { data: faces } = useFetch<Celebrities>("/celebrities");

  const { mutate: mutatePost, isLoading } = usePost({
    method: "PUT",
    url: "/works",
  });

  function handleSubmit() {
    mutatePost(
      {
        data: {
          id: data?._id,
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
            title: "ویرایش شد",
            message: "اثر با موفقیت ویرایش شد",
            color: "green",
          });
        },
      }
    );
  }

  useEffect(() => {
    if (opened) {
      setTitle(data.title);
      setFace(data.author);
      setDescription(data.description);
    } else {
      setTitle("");
      setFace(undefined);
      setDescription("");
    }
  }, [opened]);

  return (
    <Drawer
      position='left'
      transition='slide-left'
      opened={opened}
      onClose={() => setOpened(false)}
      title='ویرایش اثر'
      padding='xl'
      size='xl'
    >
      <form>
        <Grid>
          <Col span={12}>
            <Input
              placeholder='عنوان'
              value={title}
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
                  label: item.title,
                  value: item._id,
                })
              )}
            />
            <Text size='sm' style={{ marginTop: 8 }}>
              {typeof face === "object" ? face?.title : ""}
            </Text>
          </Col>
          <Col span={12}>
            <Textarea
              placeholder='توضیحات'
              value={description}
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

export default EditFaceModal;
