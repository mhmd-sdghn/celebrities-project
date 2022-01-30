import { Home, Search, Users } from "react-feather";

const NavItems = [
  {
    id: 1,
    label: "صفحه نخست",
    to: "/",
    icon: Home,
  },
  {
    id: 2,
    label: "جستجو",
    to: "/celebrities",
    icon: Search,
  },
];

export default NavItems;
