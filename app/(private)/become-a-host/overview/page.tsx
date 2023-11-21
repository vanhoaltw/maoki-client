"use client";

import Image from "next/image";
import React from "react";
import ProgressFooter from "../_components/progress-footer";
import { userCreateListing } from "@/hooks";
import { useRouter } from "next/navigation";

const BecomeAHostPage = () => {
  const router = useRouter();
  const [createListing, { loading }] = userCreateListing();

  const handleCreateListing = () => {
    createListing({
      variables: { input: {} },
      onCompleted: (response) => {
        console.log({ response });
        router.push(
          `/become-a-host/${response?.createListing?.id}/privacy-type`
        );
      },
    });
  };

  return (
    <div>
      <div className="flex items-center h-full justify-center pt-10 flex-col gap-4">
        <h1 className="max-w-2xl">
          Đăng chỗ nghỉ của Quý vị trên Maoki và bắt đầu đón tiếp khách thật
          nhanh chóng!
        </h1>
        <Image
          src="/images/become-a-host.png"
          height={450}
          width={450}
          alt=""
        />
      </div>
      <ProgressFooter
        confirmProps={{ isLoading: loading }}
        onConfirm={handleCreateListing}
      />
    </div>
  );
};

export default BecomeAHostPage;
