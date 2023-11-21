"use client";

import { AVATAR_LISTING_HOLDER } from "@/constants/common";
import { useGetListingDraft } from "@/hooks";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const BecomeAHostPage = () => {
  const { data, loading } = useGetListingDraft();
  return (
    <div className="flex items-center h-full justify-center pt-10 flex-col gap-4">
      <div className="max-w-xl w-full">
        <h1 className="mb-10">Chào mừng Homest quay trở lại</h1>

        <section className="mb-6">
          <h3 className="font-semibold mb-3">
            Hoàn thiện mục cho thuê của bạn
          </h3>

          {loading ? (
            <Skeleton className="w-full h-12" />
          ) : (
            data?.map?.((i) => (
              <Link
                key={i.id}
                href={`/become-a-host/${i.id}`}
                className="block mb-3"
              >
                <div className="border p-4 rounded-xl hover:border-main flex gap-4 items-center">
                  <img
                    src={(i.name as string) || AVATAR_LISTING_HOLDER}
                    height={30}
                    width={30}
                    className="rounded-sm"
                    alt={i.name as string}
                  />

                  <ol>
                    <dt className="min-w-0 break-words line-clamp-1 font-semibold h4">
                      {i.name}
                    </dt>
                  </ol>
                </div>
              </Link>
            ))
          )}
        </section>

        <section>
          <h3 className="font-semibold mb-3">Bắt đầu tạo mục cho thuê mới</h3>
          <Link href="/become-a-host/overview">
            <div className="flex border-b items-center gap-4 py-4">
              <img src="/svg/house-add.svg" height={30} width={30} />
              <p className="flex-1 text-lg">Tạo mục cho thuê mới</p>
              <FaChevronRight />
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default BecomeAHostPage;
