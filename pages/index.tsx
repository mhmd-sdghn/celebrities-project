import type { NextPage } from "next";
import MainLayout from "../components/layouts/main";
import CardContainers from "../components/containers/CardsContainers";
import HomePageWellcom from "../components/elements/HomePageWellcom";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <HomePageWellcom />
      <CardContainers />
    </MainLayout>
  );
};

export default Home;
