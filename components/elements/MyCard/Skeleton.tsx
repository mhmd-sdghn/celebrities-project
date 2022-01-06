import { Skeleton, Card, Group } from "@mantine/core";
import useStyles from "./styles";

function CardSkeleton() {
  const { classes } = useStyles();

  return (
    <div>
      <Card shadow='sm' padding='lg'>
        <Card.Section>
          <Skeleton height={160} />
        </Card.Section>

        <Group position='apart' className={classes.wrapper}>
          <Skeleton height={15} width={130} />
          <Skeleton height={15} width={70} radius='xl' />
        </Group>

        <Skeleton height={8} radius='xl' mt={20} />
        <Skeleton height={8} mt={6} radius='xl' />
        <Skeleton height={8} mt={6} radius='xl' />
        <Skeleton height={8} mt={6} radius='xl' />
        <Skeleton height={8} mt={6} radius='xl' />
        <Skeleton height={8} mt={6} width='70%' radius='xl' />

        <Skeleton height={30} width='100%' mt={20} />
      </Card>
    </div>
  );
}

export default CardSkeleton;
