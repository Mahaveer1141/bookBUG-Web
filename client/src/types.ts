export interface UserType {
  id: number;
  displayName: string;
  username: string;
  bio: string;
  photoUrl: string;
}

export interface NavItemProps {
  icon: any;
  title: String;
  active?: boolean;
  navSize: String;
  to: string;
}

export interface SidebarProps {
  page: String;
}

export interface NavbarProps {
  photoUrl: string;
}

export interface MeProps {
  user: UserType;
}
