"use client";

import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import Calendar from "../calendar";
import dayjs from "dayjs";
import { PiCalendarBlankDuotone } from "react-icons/pi";

interface DateRange {
  from: Date;
  to?: Date;
}

export interface DateBookingProps {
  onChange?: (values: { range: DateRange; rangeCompare?: DateRange }) => void;
  initialDateFrom?: Date;
  initialDateTo?: Date;
  align?: "start" | "center" | "end";
}

const formatString = "DD/MM/YYYY";
const formatDate = (date: Date): string => dayjs(date).format(formatString);

const DateBooking = ({ initialDateFrom, initialDateTo }: DateBookingProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [range, setRange] = useState<DateRange>({
    from: initialDateFrom ? new Date(initialDateFrom) : new Date(),
    to:
      initialDateTo || initialDateFrom
        ? new Date(initialDateTo || initialDateFrom || "")
        : new Date(),
  });

  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          startContent={<PiCalendarBlankDuotone className="shrink-0" size={18} />}
          variant="light"
          className="flex w-full items-center justify-between gap-2 py-1 text-center"
        >
          <div className="flex-1">Từ {formatDate(range.from)}</div>

          <FiMinus size={14} />

          <div className="flex-1">
            Đến {formatDate(range?.to || range.from)}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="range"
          fromDate={new Date()}
          onSelect={(value: { from?: Date; to?: Date } | undefined) => {
            if (value?.from != null) {
              setRange({ from: value.from, to: value?.to });
            }
          }}
          selected={range}
          numberOfMonths={2}
          defaultMonth={
            new Date(new Date().setMonth(new Date().getMonth() - 1))
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateBooking;
