import { RoomProps } from "@/types";
import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";
import React, { FC } from "react";
import BaseImage from "../image";

interface ContentComposition {
  Loading: FC;
}

const CardRoomVertical: FC<{ data?: RoomProps }> & ContentComposition = ({
  data,
}) => {
  const { id, price, thumbnail, name } = data || {};
  return (
    <Card isPressable shadow="none">
      <CardBody className="overflow-visible p-0">
        <BaseImage
          height={140}
          width="100%"
          alt={name}
          className="w-full object-cover"
          src={thumbnail}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{name}</b>
        <p className="text-default-500">{price}</p>
      </CardFooter>
    </Card>
  );
};

CardRoomVertical.Loading = () => {
  return (
    <div>
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3 p-4">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
};

export default CardRoomVertical;
