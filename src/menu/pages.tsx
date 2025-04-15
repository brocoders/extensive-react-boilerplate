/***************************  MENU ITEMS - PAGES  ***************************/

const pages = {
  id: "group-page",
  title: "Page",
  icon: "IconDotsVertical",
  type: "group",
  children: [
    {
      id: "authentication",
      title: "Authentication",
      type: "collapse",
      icon: "IconLogin2",
      children: [
        {
          id: "login",
          title: "Login",
          type: "item",
          url: "/auth/login",
          target: true,
        },
        {
          id: "register",
          title: "Register",
          type: "item",
          url: "/auth/register",
          target: true,
        },
      ],
    },
    {
      id: "sample-page",
      title: "Sample Page",
      type: "item",
      url: "/sample-page",
      icon: "IconBrandChrome",
    },
  ],
};

export default pages;
