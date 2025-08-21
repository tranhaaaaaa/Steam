import { MenuItem } from '../models/menu.model';
import { UserLogged } from '../utils/userLogged';

export class Menu {
  public static userLogged = new UserLogged();
  public static labelThongTin = this.userLogged.isLogged()
    ? this.userLogged.getCurrentUser().username
    : 'Thông tin';
  public static route = this.userLogged.isLogged()
    ? '/dashboard/account/details'
    : '/auth/sign-in';

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
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Yêu thích',
          route: '/dashboard/wishlist',
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
          route: '/dashboard/community',
        },
      ],
    },
  ];

  // Thêm mục "Đăng tải game miễn phí" nếu là admin
  static {
    const user = this.userLogged.getCurrentUser();
    if (this.userLogged.isLogged() && user && user.role != 'Admin') {
      this.pages.push({
        group: 'Đăng tải game miễn phí',
        separator: true,
        items: [
          {
            icon: 'assets/icons/heroicons/outline/download.svg',
            label: 'Đăng ký game',
            route: '/dashboard/new-game',
          },
        ],
      });
    }
  }

    public static pages2: MenuItem[] = [
    
    
  ];
}

