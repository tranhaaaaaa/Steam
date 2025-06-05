import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    
    {
      group: 'Cửa hàng',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Trang chủ',
          route: '/dashboard/nfts',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Points Shop', // Thêm menu item mới
          route: '/dashboard/points-shop',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Yêu thích',
          route: '/users',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Tin tức',
          route: '/users',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Thống kê',
          route: '/users',
        },
      ],
    },
    {
      group: 'Cộng đồng',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Trang chủ',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Thảo luận', 
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Workshop',
          route: '/users',
        },
         {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Chợ',
          route: '/users',
        },
         {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Phát sóng',
          route: '/users',
        },
      ],
    },
    {
      group: 'Thông tin',
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
      group: 'Hỗ trợ',
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
      group: 'Cửa hàng của bạn',
      separator: true,
       items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Home',
          route: '/dashboard/nfts',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Points Shop', // Thêm vào menu dropdown
          route: '/dashboard/points-shop',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Recently Viewed',
          route: '/users',
        },
      ],
    },
    {
      group: 'Mới & đáng chú ý',
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
      group: 'Danh mục',
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
      group: 'Cửa hàng điểm',
      separator: false,
      items: [ ],
    },
    {
      group: 'Tin tức',
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

