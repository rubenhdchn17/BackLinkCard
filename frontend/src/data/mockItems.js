const mockItems = [
  {
    id: "card-proyectos",
    type: "card",
    title: "Proyectos",
    items: [
      {
        id: "link-stack",
        type: "link",
        name: "StackOverflow",
        icon: "",
        url: "https://stackoverflow.com"
      },
      {
        id: "link-github",
        type: "link",
        name: "GitHub",
        icon: "",
        url: "https://github.com"
      }
    ]
  },
  {
    id: "card-ropa",
    type: "card",
    title: "Ropa",
    items: []
  },
  {
    id: "card-ideas",
    type: "card",
    title: "Ideas",
    items: []
  },
  {
    id: "card-fotos",
    type: "card",
    title: "Fotos",
    items: []
  },
  {
    id: "card-viajes",
    type: "card",
    title: "Viajes",
    items: []
  },
  {
    id: "card-libros",
    type: "card",
    title: "Libros",
    items: []
  },
  {
    id: "free-block-1",
    type: "free-block",
    items: [
      {
        id: "link-netflix",
        type: "link",
        name: "Netflix",
        icon: "https://www.netflix.com/favicon.ico",
        url: "https://www.netflix.com"
      },
      {
        id: "folder-apps",
        type: "folder",
        name: "Apps Favoritas",
        icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
        contents: [
          {
            id: "link-trello",
            type: "link",
            name: "Trello",
            icon: "",
            url: "https://trello.com"
          },
          {
            id: "link-notion",
            type: "link",
            name: "Notion",
            icon: "",
            url: "https://notion.so"
          },
          {
            id: "folder-productividad",
            type: "folder",
            name: "Productividad",
            icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
            contents: [
              {
                id: "link-toggl",
                type: "link",
                name: "Toggl",
                icon: "",
                url: "https://toggl.com"
              }
            ]
          }
        ]
      },
      {
        id: "link-youtube",
        type: "link",
        name: "YouTube",
        icon: "https://www.youtube.com/s/desktop/6d653c4d/img/favicon.ico",
        url: "https://www.youtube.com"
      },
      {
        id: "folder-trabajo",
        type: "folder",
        name: "Trabajo",
        icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
        contents: [
          {
            id: "link-slack",
            type: "link",
            name: "Slack",
            icon: "",
            url: "https://slack.com"
          },
          {
            id: "link-jira",
            type: "link",
            name: "Jira",
            icon: "",
            url: "https://jira.com"
          },
          {
            id: "folder-reportes",
            type: "folder",
            name: "Reportes",
            icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
            contents: [
              {
                id: "link-excel",
                type: "link",
                name: "Excel Online",
                icon: "",
                url: "https://office.live.com/start/Excel.aspx"
              }
            ]
          }
        ]
      },
      {
        id: "link-spotify",
        type: "link",
        name: "Spotify",
        icon: "https://open.scdn.co/cdn/images/favicon32.8e66b099.png",
        url: "https://spotify.com"
      },
      {
        id: "folder-recursos",
        type: "folder",
        name: "Recursos UI",
        icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
        contents: [
          {
            id: "link-figma",
            type: "link",
            name: "Figma",
            icon: "",
            url: "https://figma.com"
          }
        ]
      },
      {
        id: "link-twitter",
        type: "link",
        name: "Twitter",
        icon: "https://abs.twimg.com/favicons/twitter.ico",
        url: "https://twitter.com"
      },
      {
        id: "folder-personal",
        type: "folder",
        name: "Personal",
        icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
        contents: [
          {
            id: "link-drive",
            type: "link",
            name: "Google Drive",
            icon: "",
            url: "https://drive.google.com"
          },
          {
            id: "folder-bancos",
            type: "folder",
            name: "Bancos",
            icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
            contents: [
              {
                id: "link-banco1",
                type: "link",
                name: "Mi Banco",
                icon: "",
                url: "https://mibanco.com"
              }
            ]
          }
        ]
      }
    ]
  },
  {
  id: "free-block-2",
  type: "free-block",
  items: [
    {
      id: "link-chatgpt",
      type: "link",
      name: "ChatGPT",
      icon: "https://chat.openai.com/favicon.ico",
      url: "https://chat.openai.com"
    },
    {
      id: "folder-herramientas-ai",
      type: "folder",
      name: "Herramientas AI",
      icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
      contents: [
        {
          id: "link-claude",
          type: "link",
          name: "Claude",
          icon: "",
          url: "https://claude.ai"
        },
        {
          id: "link-gemini",
          type: "link",
          name: "Gemini",
          icon: "",
          url: "https://gemini.google.com"
        },
        {
          id: "folder-creatividad",
          type: "folder",
          name: "Creatividad",
          icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
          contents: [
            {
              id: "link-canva",
              type: "link",
              name: "Canva",
              icon: "",
              url: "https://www.canva.com"
            }
          ]
        }
      ]
    },
    {
      id: "link-medium",
      type: "link",
      name: "Medium",
      icon: "https://medium.com/favicon.ico",
      url: "https://medium.com"
    },
    {
      id: "folder-desarrollo",
      type: "folder",
      name: "Desarrollo Web",
      icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
      contents: [
        {
          id: "link-github",
          type: "link",
          name: "GitHub",
          icon: "",
          url: "https://github.com"
        },
        {
          id: "link-stackoverflow",
          type: "link",
          name: "Stack Overflow",
          icon: "",
          url: "https://stackoverflow.com"
        },
        {
          id: "folder-documentacion",
          type: "folder",
          name: "Documentación",
          icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
          contents: [
            {
              id: "link-mdn",
              type: "link",
              name: "MDN Web Docs",
              icon: "",
              url: "https://developer.mozilla.org"
            }
          ]
        }
      ]
    },
    {
      id: "link-udemy",
      type: "link",
      name: "Udemy",
      icon: "https://www.udemy.com/staticx/udemy/images/v7/favicon-32x32.png",
      url: "https://udemy.com"
    },
    {
      id: "folder-recursos-graficos",
      type: "folder",
      name: "Recursos Gráficos",
      icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
      contents: [
        {
          id: "link-unsplash",
          type: "link",
          name: "Unsplash",
          icon: "",
          url: "https://unsplash.com"
        }
      ]
    },
    {
      id: "link-linkedin",
      type: "link",
      name: "LinkedIn",
      icon: "https://static-exp1.licdn.com/sc/h/8z7nlbqf1xo1aefuvc2qmt0s3",
      url: "https://linkedin.com"
    },
    {
      id: "folder-personal-info",
      type: "folder",
      name: "Info Personal",
      icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
      contents: [
        {
          id: "link-drive-personal",
          type: "link",
          name: "Google Drive Personal",
          icon: "",
          url: "https://drive.google.com"
        },
        {
          id: "folder-finanzas",
          type: "folder",
          name: "Finanzas",
          icon: "https://img.icons8.com/ios-filled/50/folder-invoices.png",
          contents: [
            {
              id: "link-paypal",
              type: "link",
              name: "PayPal",
              icon: "",
              url: "https://www.paypal.com"
            }
          ]
        }
      ]
    }
  ]
}
];

export default mockItems;
