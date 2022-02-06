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
import { useEffect, useState } from "react";
import usePost from "../../../hooks/usePost";
import { EditFaceDrawerProps } from "../../../types/Params";

function EditFaceModal({
  opened,
  refetch,
  setOpened,
  data,
}: EditFaceDrawerProps) {
  if (!data) return <></>;

  const notifications = useNotifications();

  const [title, setTitle] = useState("");
  const [birthday, setBirthday] = useState("");
  const [image, setImage] = useState("");
  const [face, setFace] = useState("");
  const [description, setDescription] = useState("");

  const { mutate: mutatePost } = usePost({
    method: "PUT",
    url: "/celebrities",
  });

  function handleSubmit() {
    mutatePost(
      {
        data: {
          id: data?._id,
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

  useEffect(() => {
    if (opened) {
      setTitle(data.title);
      setImage(data.image);
      setBirthday(data.birthday);
      setFace(data.face);
      setDescription(data.description);
    } else {
      setTitle("");
      setImage("");
      setBirthday("");
      setFace("");
      setDescription("");
    }
  }, [opened]);

  return (
    <Drawer
      position='right'
      opened={opened}
      onClose={() => setOpened(false)}
      title='ویرایش چهره'
      padding='xl'
      size='xl'
    >
      <form>
        <Grid>
          <Col span={12}>
            <Input
              placeholder='نام'
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Input
              placeholder='تاریخ تولد'
              value={birthday}
              onChange={(e: any) => setBirthday(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Input
              placeholder='ادرس تصویر'
              value={image}
              onChange={(e: any) => setImage(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Select
              onChange={(e: any) => setFace(e)}
              placeholder='دسته بندی'
              value={face}
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
              value={description}
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

export default EditFaceModal;
