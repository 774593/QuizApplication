export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: 'dashboard',
        icon: 'feather icon-home'
      }
    ]
  },
  
  {
    id: 'ui-component',
    title: 'Master Operations',
    type: 'group',
    icon: 'feather icon-menu',
    children: [
      {
        id: 'basic',
        title: 'Create & Manage',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Organization',
            type: 'item',
            url: '/app/organization'
          },
          {
            id: 'badges',
            title: 'Subject',
            type: 'item',
            url: '/app/subject'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Subject-Expert',
            type: 'item',
            url: '/app/subjectexpert'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'User',
            type: 'item',
            url: '/app/subjectexpert'
          },
          //{
          //  id: 'tabs-pills',
          //  title: 'event',
          //  type: 'item',
          //  url: '/app/event'
          //},
          //{
          //  id: 'collapse',
          //  title: 'Question Bank',
          //  type: 'item',
          //  url: '/app/questionbank'
          //}
          //{
          //  id: 'typography',
          //  title: 'Typography',
          //  type: 'item',
          //  url: '/component/typography'
          //}
        ]
      }
    ]
  },

  {
    id: 'ui-component',
    title: 'Quiz',
    type: 'group',
    icon: 'feather icon-menu',
    children: [
      {
        id: 'basic',
        title: 'Quiz Operations',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Events',
            type: 'item',
            url: '/app/event'
          },
          {
            id: 'badges',
            title: 'Instructions',
            type: 'item',
            url: '/app/instructions'
          },
           {
            id: 'badges',
            title: 'Quiz Title',
            type: 'item',
             url: '/app/quiztitle'
          }
          //{
          //  id: 'badges',
          //  title: 'Instructions',
          //  type: 'item',
          //  url: '/app/instructions'
          //}
          //{
          //  id: 'badges',
          //  title: 'Instructions',
          //  type: 'item',
          //  url: '/instructions'
          //}
        
        ]
      }
    ]
  },
  //{
  //  id: 'Authentication',
  //  title: 'User',
  //  type: 'group',
  //  icon: 'icon-group',
  //  children: [
  //    {
  //      id: 'signup',
  //      title: 'Create & Manage',
  //      type: 'item',
  //      url: '/register',
  //      icon: 'feather icon-log-in',
  //      target: true,
  //      breadcrumbs: false
  //    },

  //    //{
  //    //  id: 'signin',
  //    //  title: 'Quiz Schedule',
  //    //  type: 'item',
  //    //  url: '/login',
  //    //  icon: 'feather icon-log-in',
  //    //  target: true,
  //    //  breadcrumbs: false
  //    //},
  //    //{
  //    //  id: 'signin',
  //    //  title: 'Quiz Activities',
  //    //  type: 'item',
  //    //  url: '/login',
  //    //  icon: 'feather icon-log-in',
  //    //  target: true,
  //    //  breadcrumbs: false
  //    //},
  //    // {
  //    //  id: 'signin',
  //    //  title: 'Question Bank',
  //    //  type: 'item',
  //    //  url: '/login',
  //    //  icon: 'feather icon-log-in',
  //    //  target: true,
  //    //  breadcrumbs: false
  //    //}
  //  ]
  //},
  {
    id: 'ui-component',
    title: 'Reports',
    type: 'group',
    icon: 'feather icon-menu',
    children: [
      {
        id: 'basic',
        title: 'Report 1',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Report 2',
            type: 'item',
            url: '/component/button'
          },
          {
            id: 'badges',
            title: 'Report 3',
            type: 'item',
            url: '/component/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Report 4',
            type: 'item',
            url: '/component/breadcrumb-paging'
          },
          {
            id: 'collapse',
            title: 'Report 5',
            type: 'item',
            url: '/component/collapse'
          }
       
        ]
      }
    ]
  },
  {
    id: 'ui-component',
    title: 'Question Bank',
    type: 'group',
    icon: 'feather icon-menu',
    children: [
      {
        id: 'basic',
        title: 'Question Bank ',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'First',
            type: 'item',
            url: '/component/button'
          },
          {
            id: 'button',
            title: 'Second',
            type: 'item',
            url: '/component/button'
          },
          {
            id: 'badges',
            title: 'Third',
            type: 'item',
            url: '/component/badges'
          }
         

        ]
      }
    ]
  },
  //{
  //  id: 'forms & tables',
  //  title: 'Master',
  //  type: 'group',
  //  icon: 'icon-group',
  //  children: [
  //    {
  //      id: 'button',
  //      title: 'Organization',
  //      type: 'item',
  //      url: '/organization',
  //      classes: 'nav-item',
  //      icon: 'feather icon-log-in',
  //    },
  //    {
  //      id: 'badges',
  //      title: 'Subject',
  //      type: 'item',
  //      url: '/subject',
  //      classes: 'nav-item',
  //      icon: 'feather icon-log-in',
  //    },
  //    {
  //      id: 'breadcrumb-pagination',
  //      title: 'Subject-Expert',
  //      type: 'item',
  //      url: '/subjectexpert',
  //      classes: 'nav-item',
  //      icon: 'feather icon-log-in',
  //    },

  //    {
  //      id: 'tabs-pills',
  //      title: 'event',
  //      type: 'item',
  //      url: '/event',
  //      classes: 'nav-item',
  //      icon: 'feather icon-log-in',
  //    },
  //    {
  //      id: 'collapse',
  //      title: 'Question Bank',
  //      type: 'item',
  //      url: '/questionbank',
  //       classes: 'nav-item',
  //      icon: 'feather icon-log-in',
  //    },



  //    {
  //      id: 'forms',
  //      title: 'Other 1',
  //      type: 'item',
  //      url: '/forms',
  //      classes: 'nav-item',
  //      icon: 'feather icon-file-text'
  //    },
  //    {
  //      id: 'tables',
  //      title: 'Other 2',
  //      type: 'item',
  //      url: '/tables',
  //      classes: 'nav-item',
  //      icon: 'feather icon-server'
  //    }
  //  ]
  //},
  //{
  //  id: 'other',
  //  title: 'Other',
  //  type: 'group',
  //  icon: 'icon-group',
  //  children: [
  //    {
  //      id: 'sample-page',
  //      title: 'Sample Page',
  //      type: 'item',
  //      url: '/sample-page',
  //      classes: 'nav-item',
  //      icon: 'feather icon-sidebar'
  //    },
  //    {
  //      id: 'menu-level',
  //      title: 'Menu Levels',
  //      type: 'collapse',
  //      icon: 'feather icon-menu',
  //      children: [
  //        {
  //          id: 'menu-level-2.1',
  //          title: 'Menu Level 2.1',
  //          type: 'item',
  //          url: 'javascript:',
  //          external: true
  //        },
  //        {
  //          id: 'menu-level-2.2',
  //          title: 'Menu Level 2.2',
  //          type: 'collapse',
  //          children: [
  //            {
  //              id: 'menu-level-2.2.1',
  //              title: 'Menu Level 2.2.1',
  //              type: 'item',
  //              url: 'javascript:',
  //              external: true
  //            },
  //            {
  //              id: 'menu-level-2.2.2',
  //              title: 'Menu Level 2.2.2',
  //              type: 'item',
  //              url: 'javascript:',
  //              external: true
  //            }
  //          ]
  //        }
  //      ]
  //    }
  //  ]
  //}

  //{
  //  id: 'navigation',
  //  title: 'Navigation',
  //  type: 'group',
  //  icon: 'icon-group',
  //  children: [
  //    {
  //      id: 'dashboard',
  //      title: 'Dashboard',
  //      type: 'item',
  //      url: '/analytics',
  //      icon: 'feather icon-home'
  //    }
  //  ]
  //},
  //{
  //  id: 'ui-component',
  //  title: 'Ui Component',
  //  type: 'group',
  //  icon: 'icon-group',
  //  children: [
  //    {
  //      id: 'basic',
  //      title: 'Component',
  //      type: 'collapse',
  //      icon: 'feather icon-box',
  //      children: [
  //        {
  //          id: 'button',
  //          title: 'Button',
  //          type: 'item',
  //          url: '/component/button'
  //        },
  //        {
  //          id: 'badges',
  //          title: 'Badges',
  //          type: 'item',
  //          url: '/component/badges'
  //        },
  //        {
  //          id: 'breadcrumb-pagination',
  //          title: 'Breadcrumb & Pagination',
  //          type: 'item',
  //          url: '/component/breadcrumb-paging'
  //        },
  //        {
  //          id: 'collapse',
  //          title: 'Collapse',
  //          type: 'item',
  //          url: '/component/collapse'
  //        },
  //        {
  //          id: 'tabs-pills',
  //          title: 'Tabs & Pills',
  //          type: 'item',
  //          url: '/component/tabs-pills'
  //        },
  //        {
  //          id: 'typography',
  //          title: 'Typography',
  //          type: 'item',
  //          url: '/component/typography'
  //        }
  //      ]
  //    }
  //  ]
  //},
  //{
  //  id: 'Authentication',
  //  title: 'Authentication',
  //  type: 'group',
  //  icon: 'icon-group',
  //  children: [
  //    {
  //      id: 'signup',
  //      title: 'Sign up',
  //      type: 'item',
  //      url: '/register',
  //      icon: 'feather icon-at-sign',
  //      target: true,
  //      breadcrumbs: false
  //    },
  //    {
  //      id: 'signin',
  //      title: 'Sign in',
  //      type: 'item',
  //      url: '/login',
  //      icon: 'feather icon-log-in',
  //      target: true,
  //      breadcrumbs: false
  //    }
  //  ]
  //},
  //{
  //  id: 'chart',
  //  title: 'Chart',
  //  type: 'group',
  //  icon: 'icon-group',
  //  children: [
  //    {
  //      id: 'apexchart',
  //      title: 'ApexChart',
  //      type: 'item',
  //      url: '/chart',
  //      classes: 'nav-item',
  //      icon: 'feather icon-pie-chart'
  //    }
  //  ]
  //},
  //{
  //  id: 'forms & tables',
  //  title: 'Forms & Tables',
  //  type: 'group',
  //  icon: 'icon-group',
  //  children: [
  //    {
  //      id: 'forms',
  //      title: 'Basic Forms',
  //      type: 'item',
  //      url: '/forms',
  //      classes: 'nav-item',
  //      icon: 'feather icon-file-text'
  //    },
  //    {
  //      id: 'tables',
  //      title: 'Tables',
  //      type: 'item',
  //      url: '/tables',
  //      classes: 'nav-item',
  //      icon: 'feather icon-server'
  //    }
  //  ]
  //},
  //{
  //  id: 'other',
  //  title: 'Other',
  //  type: 'group',
  //  icon: 'icon-group',
  //  children: [
  //    {
  //      id: 'sample-page',
  //      title: 'Sample Page',
  //      type: 'item',
  //      url: '/sample-page',
  //      classes: 'nav-item',
  //      icon: 'feather icon-sidebar'
  //    },
  //    {
  //      id: 'menu-level',
  //      title: 'Menu Levels',
  //      type: 'collapse',
  //      icon: 'feather icon-menu',
  //      children: [
  //        {
  //          id: 'menu-level-2.1',
  //          title: 'Menu Level 2.1',
  //          type: 'item',
  //          url: 'javascript:',
  //          external: true
  //        },
  //        {
  //          id: 'menu-level-2.2',
  //          title: 'Menu Level 2.2',
  //          type: 'collapse',
  //          children: [
  //            {
  //              id: 'menu-level-2.2.1',
  //              title: 'Menu Level 2.2.1',
  //              type: 'item',
  //              url: 'javascript:',
  //              external: true
  //            },
  //            {
  //              id: 'menu-level-2.2.2',
  //              title: 'Menu Level 2.2.2',
  //              type: 'item',
  //              url: 'javascript:',
  //              external: true
  //            }
  //          ]
  //        }
  //      ]
  //    }
  //  ]
  //}
];
