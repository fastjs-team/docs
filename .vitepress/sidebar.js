const introduction = {
  text: "Getting Started",
  collapsed: false,
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

const modules = [
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
        link: "/guide/request-start",
      },
      {
        text: "Scaling up",
        link: "/guide/request-advanced",
      },
      {
        text: "Create a Instance",
        link: "/guide/request-class",
      },
    ],
  },
];

const other = {
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
