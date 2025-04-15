/***************************  MENU ITEMS - APPLICATIONS  ***************************/

const other = {
  id: "group-other",
  title: "Other",
  icon: "IconDotsVertical",
  type: "group",
  children: [
    {
      id: "changelog",
      title: "Changelog",
      type: "item",
      url: "https://phoenixcoded.gitbook.io/saasable/changelog",
      target: true,
      icon: "IconHistory",
    },
    {
      id: "documentation",
      title: "Documentation",
      type: "item",
      url: "https://phoenixcoded.gitbook.io/saasable",
      target: true,
      icon: "IconNotes",
    },
    {
      id: "support",
      title: "Support",
      type: "item",
      url: "https://support.phoenixcoded.net",
      target: true,
      icon: "IconLifebuoy",
    },

    {
      id: "menu-levels",
      title: "Menu Levels",
      type: "collapse",
      icon: "IconMenu2",
      children: [
        {
          id: "menu-level-1.1",
          title: "Level 1",
          type: "item",
          url: "#",
        },
        {
          id: "menu-level-1.2",
          title: "Level 1",
          type: "collapse",
          children: [
            {
              id: "menu-level-2.1",
              title: "Level 2",
              type: "item",
              url: "#",
            },
            {
              id: "menu-level-2.2",
              title: "Level 2",
              type: "collapse",
              children: [
                {
                  id: "menu-level-3.1",
                  title: "Level 3",
                  type: "item",
                  url: "#",
                },
                {
                  id: "menu-level-3.2",
                  title: "Level 3",
                  type: "item",
                  url: "#",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default other;
