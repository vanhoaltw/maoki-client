"use client";

import DateBooking from "@/components/form/date-booking";
import SelectLocation from "@/components/form/select-location";
import SelectPeople from "@/components/form/select-people";
import { Button } from "@nextui-org/button";

const BookingBar = () => {
  const onSumbit = () => null;

  return (
    <form onSubmit={onSumbit}>
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border bg-white px-6 py-3">
        <div className="w-28 shrink-0">
          <SelectLocation />
        </div>

        <div className="h-6 border-r" />

        <DateBooking />

        <div className="h-6 border-r" />

        <div className="w-32 shrink-0">
          <SelectPeople />
        </div>

        <div className="h-6 border-r" />

        <div className="shrink-0">
          <Button
            type="submit"
            color="primary"
            radius="full"
            className="whitespace-nowrap px-6"
          >
            Tìm phòng
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BookingBar;
