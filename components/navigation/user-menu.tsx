"use client";

import { Button } from "@nextui-org/button";
import { User as NextuiUser, useDisclosure } from "@nextui-org/react";
import { FC } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import Login from "../auth/login";
import useAuthStore from "@/store/authStore";
import ModalLogout from "../auth/modal-logout";
import { LuUser2 } from "react-icons/lu";
import { GrHomeRounded } from "react-icons/gr";

import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

const UserMenu: FC = () => {
  const { user } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isConfirmLogout, onOpenChange: onConfirmLogoutChange } =
    useDisclosure();

  if (!user) {
    return (
      <div>
        <Button
          onClick={onOpen}
          aria-label="Login"
          className="bg-primary text-white"
        >
          Đăng nhập
        </Button>
        <Login isOpen={isOpen} onClose={onClose} />
      </div>
    );
  }

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <NextuiUser
            avatarProps={{
              size: "sm",
              src: user?.avatar as string,
            }}
            name={`${user?.firstName} ${user?.lastName}`}
            description={user?.username}
            as="button"
            classNames={{
              name: "truncate max-w-[100px]",
              description: "truncate max-w-[80px]",
            }}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="Profile"
            as={Link}
            href="/"
            startContent={<LuUser2 />}
          >
            Hồ sơ
          </DropdownItem>
          <DropdownItem
            showDivider
            key="My listing"
            as={Link}
            href="/"
            startContent={<GrHomeRounded />}
          >
            Nhà/phòng cho thuê
          </DropdownItem>

          <DropdownItem
            onPress={onConfirmLogoutChange}
            key="logout"
            startContent={<FiLogOut />}
            className="text-danger"
            color="danger"
          >
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <ModalLogout isOpen={isConfirmLogout} onClose={onConfirmLogoutChange} />
    </div>
  );
};

export default UserMenu;
