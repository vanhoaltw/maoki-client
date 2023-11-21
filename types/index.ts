import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DateType = string | Date;

export type BaseProps = {
  id: number;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type ConvenientProps = {
  name: string;
  image: string;
};

export type UserProps = {
  firstName?: string;
  lastName?: string;
  bio?: string;
  gender?: string;
  avatar?: string;
  address?: string;
  isAvailable?: boolean;
  completeOnboarding?: boolean;
  email: string;
  emailVerified?: boolean;
  birthday?: DateType;
  lastActivedAt?: DateType;
  registeredAt?: DateType;
} & BaseProps;

export type RoomProps = {
  name?: string;
  userId: number;
  user: UserProps;
  description?: string;
  slug?: string;
  isActive?: boolean;
  price?: number;
  bedroom?: number;
  bedCount?: number;
  bathroom?: number;
  convenient?: ConvenientProps[];
  latitude?: string;
  longitude?: string;
  thumbnail?: string;
} & BaseProps;
