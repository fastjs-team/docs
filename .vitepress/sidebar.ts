import type { DefaultTheme } from "vitepress";

const introduction: DefaultTheme.SidebarItem = {
  text: "Getting Started",
  items: [
    {
      text: "Introduction",
      link: "/",
    },
    {
      text: "Comparing",
      link: "/start/compare",
    },
    {
      text: "Quick Start",
      link: "/start/quick-start",
    },
    {
      text: "Overview",
      link: "/start/overview",
    },
  ],
};

const modules: DefaultTheme.SidebarItem[] = [
  {
    text: "Date Module",
    items: [
      {
        text: "Getting Started",
        link: "/guide/date-start",
      },
      {
        text: "Create a Instance",
        link: "/guide/date-class",
      },
      {
        text: "Date API",
        link: "/guide/date-api",
      },
    ],
  },
  {
    text: "Request Module",
    items: [
      {
        text: "Getting Started",
        link: "/guide/request/",
      },
      {
        text: "Scaling up",
        link: "/guide/request/advance",
      },
      {
        text: "Add Hooks",
        link: "/guide/request/hooks",
      },
      {
        text: "Create a Instance",
        link: "/guide/request/instance",
      },
    ],
  },
];

const other: DefaultTheme.SidebarItem = {
  text: "Other",
  items: [
    {
      text: "Become a Sponsor",
      link: "/other/become-a-sponsor",
    },
    {
      text: "All Sponsors",
      link: "/other/sponsors",
    },
  ],
};

export default {
  "/": [introduction, ...modules, other].map((e) => {
    e.collapsed = false;
    return e;
  }),
};
