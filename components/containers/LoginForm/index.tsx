import { Input, Button, LoadingOverlay, Grid, Col } from "@mantine/core";
import { User, Key } from "react-feather";
import { useForm } from "react-hook-form";
import usePost from "../../../hooks/usePost";
import { LoginRequestData, LoginResponseData } from "../../../types/Login";

export default function LoginForm() {
  const { mutate } = usePost<LoginResponseData, LoginRequestData>({
    url: "/auth/login",
  });

  const onSubmit = (data: LoginRequestData) => {
    mutate(data, {
      onSuccess: (data, variables, context) => {},
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isLoading = false;

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
