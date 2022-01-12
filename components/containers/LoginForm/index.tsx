import { Input, Button, LoadingOverlay, Grid, Col } from "@mantine/core";
import { User, Key } from "react-feather";
import { useForm } from "react-hook-form";
import usePost from "../../../hooks/usePost";
import { useNotifications } from "@mantine/notifications";
import { LoginRequestData, LoginResponseData } from "../../../types/Login";
import { useRouter } from "next/router";

export default function LoginForm() {
  const notifications = useNotifications();

  const router = useRouter();

  const { mutate, isLoading } = usePost<LoginResponseData, LoginRequestData>({
    url: "/auth/login",
    method: "POST",
  });

  const onSubmit = (data: LoginRequestData) => {
    mutate(data, {
      onSuccess: () => {
        // redirect user to admin page
        notifications.showNotification({
          title: "ورود موفق",
          message: "در حال هدایت به صفحه مدیریت",
          color: "green",
        });

        router.push("/manage");
      },

      onError: () => {
        notifications.showNotification({
          title: "ورود ناموفق",
          message: "لطفا نام کاربری و رمز عبور خود را بررسی کنید 🤥",
          color: "red",
        });
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", position: "relative" }}
    >
      <LoadingOverlay visible={isLoading} zIndex={5} />
      <Grid>
        <Col span={12}>
          {/* register your input into the hook by invoking the "register" function */}
          <Input
            icon={<User size={18} />}
            placeholder='نام‌کاربری'
            {...register("username", {
              required: true,
            })}
            invalid={errors.username}
          />
        </Col>

        <Col span={12}>
          {/* include validation with required or other standard HTML validation rules */}
          <Input
            icon={<Key size={18} />}
            placeholder='********'
            {...register("password", {
              required: true,
            })}
            invalid={errors.password}
          />
        </Col>

        <Col span={12}>
          <Button style={{ width: "100%" }} type='submit' loading={isLoading}>
            ورود
          </Button>
        </Col>
      </Grid>
    </form>
  );
}
