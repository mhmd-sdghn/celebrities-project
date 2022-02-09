import { Skeleton, Card, Group } from "@mantine/core";
import useStyles from "./styles";

function CardSkeleton() {
  const { classes } = useStyles();

  return (
    <div>
      <Card shadow='sm' padding='lg'>
        <Skeleton height={25} width={130} />

        <Skeleton height={8} radius='xl' mt={20} />
        <Skeleton height={8} mt={6} radius='xl' />
        <Skeleton height={8} mt={6} width='70%' radius='xl' />

        <Group align='center'>
          <Skeleton height={35} mt={22} circle mb='xl' />
          <Skeleton height={20} radius='sm' width='70%' />
        </Group>

        <Skeleton height={30} width='100%' />
      </Card>
    </div>
  );
}

export default CardSkeleton;
