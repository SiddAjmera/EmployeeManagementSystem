import { Icon, IconifyIcon } from "@iconify/react";
import peopleFill from "@iconify/icons-eva/people-fill";

const getIcon = (name: IconifyIcon) => (
  <Icon icon={name} width={22} height={22} />
);

const sidebarConfig = [
  {
    title: "employees",
    path: "/dashboard/employees",
    icon: getIcon(peopleFill),
  },
];

export default sidebarConfig;
