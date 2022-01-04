import { useMantineTheme, Image } from "@mantine/core";
import { heights } from "@mantine/core/lib/components/Badge/Badge.styles";

function HomePageWellcom() {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        background:
          theme.colorScheme === "dark"
            ? theme.colors.gray[9]
            : theme.colors.gray[0],
        width: "100%",
        height: "400px",
        marginTop: theme.spacing.sm,
        borderRadius: "5px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image src='/images/wellcome.svg' height='400px' />
      <div
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>
          <span style={{ color: theme.colors.gray[0] }}>چهره‌های برجسته</span>
          <strong
            style={{
              marginRight: "10px",
              color: theme.colors.blue[3],
              textShadow: `1px 1px ${theme.colors.blue[8]}`,
            }}
          >
            ایران
          </strong>
        </h1>
      </div>
    </div>
  );
}

export default HomePageWellcom;
