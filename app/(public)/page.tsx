// import { Link } from "@nextui-org/link";
// import { Snippet } from "@nextui-org/snippet";
// import { Code } from "@nextui-org/code";
// import { button as buttonStyles } from "@nextui-org/theme";
// import { siteConfig } from "@/config/site";
// import { title, subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";
import Image from "next/image";

import { AiOutlineWifi } from "react-icons/ai";
import { GiBathtub, GiKeyCard, GiSnowflake1 } from "react-icons/gi";
import Banner from "./_components/Banner";
import BookingBar from "./_components/BookingBar";
import Branch from "./_components/Branch";

const utilities = [
  {
    image: <Image src="/svg/Tivi.svg" height={36} width={36} alt="Netflix" />,
    label: "Netflix",
  },
  {
    image: <AiOutlineWifi size={36} />,
    label: "Wifi tốc độ cao",
  },
  {
    image: <GiKeyCard size={36} />,
    label: "Tự nhận phòng",
  },
  {
    image: (
      <Image src="/svg/Bancon.svg" height={36} width={36} alt="Ban công" />
    ),
    label: "Ban công",
  },
  {
    image: <GiBathtub size={36} />,
    label: "Phòng tắm riêng",
  },
  {
    image: (
      <Image
        src="/svg/Kitchen.svg"
        height={36}
        width={36}
        alt="Dụng cụ nấu ăn"
      />
    ),
    label: "Dụng cụ nấu ăn",
  },
  {
    image: (
      <Image
        src="/svg/Towel.svg"
        height={36}
        width={36}
        alt="Dịch vụ dọn phòng"
      />
    ),
    label: "Dịch vụ dọn phòng",
  },
  {
    image: <GiSnowflake1 size={36} />,
    label: "Điều hoà nhiệt độ",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative mb-16">
        <Banner />
        <div className="absolute -bottom-8 w-full z-50">
          <BookingBar />
        </div>
      </section>
      <Branch />
    </div>
  );
}
