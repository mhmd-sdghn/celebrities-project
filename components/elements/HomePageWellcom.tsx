import { useMantineTheme } from "@mantine/core";

function HomePageWellcom() {
  const theme = useMantineTheme();
  return (
    <div
      style={{
        background: "#eeeeee",
        width: "100%",
        height: "400px",
        marginTop: theme.spacing.sm,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>
        <span>چهره‌های برجسته</span>
        <strong
          style={{
            marginRight: "10px",
            color: "#283593",
            textShadow: "1px 1px #283593",
          }}
        >
          ایران
        </strong>
      </h1>
    </div>
  );
}

export default HomePageWellcom;
