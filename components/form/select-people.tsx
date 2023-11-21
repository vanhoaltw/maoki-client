import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import React, { useMemo, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const sections = [
  { key: "adult", label: "Người lớn", description: "Từ 13 tuổi trở lên" },
  { key: "child", label: "Trẻ em", description: "Độ tuổi 2 – 12" },
  { key: "baby", label: "Em bé", description: "Dưới 2 tuổi" },
  {
    key: "pet",
    label: "Thú cưng",
    description: "Bạn sẽ mang theo động vật phục vụ?",
  },
];
const SelectPeople = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState<any>({
    adult: 0,
    child: 0,
    baby: 0,
    pet: 0,
  });

  const handleChange = (key: string, value: number) => {
    setCount((pre: any) => ({ ...pre, [key]: value }));
  };

  const _valueText = useMemo(() => {
    const adultCount = count.adult + count.child;

    const text = [
      adultCount && `${adultCount} khách`,
      count.baby && `${count.baby} em bé`,
      count.pet && `${count.pet} thú cưng`,
    ]
      .filter((i) => !!i)
      .join(", ");

    return text || "Thêm khách";
  }, [count]);

  return (
    <Popover isOpen={open} onOpenChange={setOpen} showArrow>
      <PopoverTrigger>
        <Button
          variant="light"
          className="overflow-hidden block truncate p-0"
          fullWidth
        >
          {_valueText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-6">
        <div className="divide-y-1">
          {sections.map((i) => {
            const val = Number(count[i.key]);
            return (
              <div
                key={i.key}
                className="flex items-center gap-8 justify-between flex-wrap pb-4 pt-4 first:pt-0 last:pb-0"
              >
                <dd>
                  <dt className="font-medium text-base">{i.label}</dt>
                  <dd className="text-muted-foreground text-sm">
                    {i.description}
                  </dd>
                </dd>
                <div className="flex items-center text-muted-foreground text-base font-normal">
                  <Button
                    isIconOnly
                    isDisabled={val <= 0}
                    onClick={() => handleChange(i.key, val - 1)}
                    size="sm"
                    radius="full"
                    variant="bordered"
                    className="border-current border-1"
                  >
                    <FiMinus />
                  </Button>
                  <span className="inline-block w-10 text-center">{val}</span>
                  <Button
                    isIconOnly
                    onClick={() => handleChange(i.key, val + 1)}
                    size="sm"
                    radius="full"
                    variant="bordered"
                    className="border-current border-1"
                  >
                    <FiPlus />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectPeople;
