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
    to: "/search",
    icon: Search,
  },
  {
    id: 3,
    label: "شخصیت‌ها",
    to: "/‌‌‌celebreties",
    icon: Users,
  },
];

export default NavItems;
