"use client";

import CardRoomVertical from "@/components/card/card-room-vertical";
import { useGetListing } from "@/hooks";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";

const branchs = [
  { label: "Tất cả", value: "" },
  { label: "Bùi viện", value: "bui-vien" },
];

const Branch = () => {
  const { data, loading } = useGetListing();
  console.log({ data });
  const [selectedKey, setSelectedKey] = useState<string | number>(
    branchs[0].value
  );

  return (
    <div>
      <div className="border-b">
        <Tabs
          aria-label="Branch"
          variant="underlined"
          color="default"
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
          classNames={{
            tabList: "w-full relative rounded-none p-0",
            cursor: "w-full rounded-full h-1",
            tab: "h-10",
            tabContent: "group-data-[selected=true]:font-bold",
          }}
        >
          {branchs.map((i) => (
            <Tab key={i.label} title={i.label} />
          ))}
        </Tabs>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {loading && !data?.length ? (
          <>
            <CardRoomVertical.Loading />
            <CardRoomVertical.Loading />
            <CardRoomVertical.Loading />
            <CardRoomVertical.Loading />
          </>
        ) : (
          data?.map?.((i) => <CardRoomVertical data={undefined} />)
        )}
      </div>
    </div>
  );
};

export default Branch;
