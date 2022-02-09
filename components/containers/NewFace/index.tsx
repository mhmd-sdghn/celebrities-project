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
import usePost from "../../../hooks/usePost";
import { NewFaceDrawerProps } from "../../../types/Params";

function NewFaceModal({ opened, refetch, setOpened }: NewFaceDrawerProps) {
  const notifications = useNotifications();

  const [title, setTitle] = useState("");
  const [birthday, setBirthday] = useState("");
  const [image, setImage] = useState("");
  const [face, setFace] = useState("");
  const [description, setDescription] = useState("");

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

  return (
    <Drawer
      position='left'
      transition='slide-left'
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
              data={[
                "پزشکی و علوم تجربی",
                "مهندسی",
                "ریاضیات و فیزیک",
                "سینما",
                "موسیقی",
                "هنرهای تجسمی",
                "ادب و فرهنگ",
                "الهیات",
                "تاریخ",
                "جغرافیا",
                "فلسفه",
                "علوم انسانی",
              ]}
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
            <Button style={{ width: "100%" }} onClick={() => handleSubmit()}>
              ثبت
            </Button>
          </Col>
        </Grid>
      </form>
    </Drawer>
  );
}

export default NewFaceModal;
