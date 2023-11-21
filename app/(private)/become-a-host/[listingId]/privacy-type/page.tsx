"use client";

import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { useState } from "react";
import { FaDoorOpen, FaHome, FaUserSlash } from "react-icons/fa";
import ProgressFooter from "../../_components/progress-footer";

const listType = [
  {
    title: "Toàn bộ nhà",
    value: "full-house",
    description: "Khách được sử dụng riêng toàn bộ chỗ ở này",
    icon: FaHome,
  },
  {
    title: "Một căn phòng",
    value: "room-single",
    description:
      "Khách sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung",
    icon: FaDoorOpen,
  },
  {
    title: "Phòng chung",
    value: "room-group",
    description:
      "Khách ngủ trong một phòng hoặc khu vực chung - nơi bạn hoặc người khác có thể cùng sử dụng",
    icon: FaUserSlash,
  },
];

const Page = () => {
  const [selectedKeys, setSelectedKeys] = useState<any>(
    new Set([listType[0].value])
  );

  return (
    <div className="flex items-center h-full justify-center pt-10 flex-col gap-4">
      <div className="max-w-xl">
        <h1 className="max-w-2xl mb-10">
          Khách sẽ được sử dụng loại chỗ ở nào?
        </h1>

        <Listbox
          aria-label="Single selection example"
          variant="light"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {listType.map((i) => (
            <ListboxItem
              key={i.value}
              shouldHighlightOnFocus={false}
              className="rounded-xl p-6 mb-2 border-2 border-solid data-[hover=true]:bg-white data-[hover=true]:border-black data-[selected=true]:border-black"
              endContent={<i.icon size={26} />}
            >
              <ol>
                <dt className="h4">{i.title}</dt>
                <dd className="text-muted-foreground min-w-0 whitespace-pre-wrap break-words">
                  {i.description}
                </dd>
              </ol>
            </ListboxItem>
          ))}
        </Listbox>
      </div>

      <ProgressFooter />
    </div>
  );
};

export default Page;
