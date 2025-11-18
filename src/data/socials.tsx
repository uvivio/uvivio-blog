import {
  InstagramOutlined,
  LinkedinFilled,
  XOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';

type SocialWall = {
  label?: string;
  link?: string;
  icon: ReactNode;
};

const socials: Array<SocialWall> = [
  // { icon: <FacebookFilled /> },
  { icon: <XOutlined />, link: 'https://x.com/joinuvivio' },
  { icon: <InstagramOutlined />, link: 'https://www.instagram.com/joinuvivio' },
  { icon: <LinkedinFilled />, link: 'https://www.linkedin.com/company/uvivio' },
];

export default socials;
