import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    
    {
      group: 'Store',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Home',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Discovery Queue', 
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Whishlist',
          route: '/users',
        },
      ],
    },
    {
      group: 'COMMUNITY',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Home',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Discovery Queue', 
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Whishlist',
          route: '/users',
        },
      ],
    },
    {
      group: 'ABOUT',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Home',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Discovery Queue', 
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Whishlist',
          route: '/users',
        },
      ],
    },
    {
      group: 'SUPPORT',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Folders',
          route: '/folders',
          children: [
            { label: 'Current Files', route: '/folders/current-files' },
            { label: 'Downloads', route: '/folders/download' },
            { label: 'Trash', route: '/folders/trash' },
          ],
        },
      ],
    },
  ];

    public static pages2: MenuItem[] = [
    
    {
      group: 'Your Store',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Home',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Community Recommendations', 
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Recently Viewed',
          route: '/users',
        },
      ],
    },
    {
      group: 'New & Noteworthy',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Top Seller',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Most Played', 
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Recently Update',
          route: '/users',
        },
      ],
    },
    {
      group: 'Categories',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Free to play',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Early access', 
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Steam deak',
          route: '/users',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Greate on Deck',
          route: '/users',
        },
      ],
    },
    {
      group: 'Points Shop',
      separator: false,
      items: [ ],
    },
    {
      group: 'News',
      separator: false,
      items: [ ],
    },
    {
      group: 'Labs',
      separator: false,
      items: [ ],
    },
  ];
}

