import useThemeDetector from "@/hooks/isDarkTheme";
import type { createShortlinkInput } from "@/server/schemas/shortlink.schema";
import { type NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/outline";

import { trpc } from "../utils/trpc";
import { toast } from "react-toastify";
import SlugList from "@/components/modal";
import { useState } from "react";

const Home: NextPage = () => {
  const isDarkTheme = useThemeDetector();
  const [open, setOpen] = useState(false);

  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const { mutate } = trpc.shortlink.createLink.useMutation({
    onSuccess: async (data: any) => {
      await navigator.clipboard.writeText(`https://u.forestp.dev/${data.slug}`);

      toast.success(
        `Shortlink copied to clipboard - https://u.forestp.dev/${data.slug}`,
        {
          position: "top-left",
          autoClose: 2000,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        }
      );
    },
    onError: (err) => {
      toast.error(err.message, {
        position: "top-left",
        autoClose: 2000,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<createShortlinkInput>();

  const onSubmit = async (data: createShortlinkInput) => {
    mutate({ url: data.url });

    reset();
  };

  return (
    <div className="flex h-screen flex-col items-start justify-center gap-4 bg-blue-100 px-8">
      <Head>
        <title>Shorter the better</title>
      </Head>
      <div className="text-4xl font-bold text-red-600">urls</div>
      <div className="text-6xl font-semibold text-gray-800">shorter,</div>
      <div
        className={`${
          isDarkTheme ? "bg-gray-500" : "bg-gray-200"
        } flex w-4/5 flex-row items-center justify-start rounded-xl`}
      >
        <div className="flex w-full flex-row items-center justify-start gap-3 p-5">
          <div className="h-5 w-5 rounded-full bg-red-400"></div>
          <div className="h-5 w-5 rounded-full bg-yellow-400"></div>
          <div className="h-5 w-5 rounded-full bg-green-400"></div>
          <ArrowLeftIcon className="h-8 w-8 text-gray-400" />
          <ArrowRightIcon className="h-8 w-8 text-gray-400" />
          <ArrowPathIcon className="h-8 w-8 text-gray-400" />
          <HomeIcon className="h-8 w-8 text-gray-400" />
          <div className="w-100 relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <input
                {...register("url", {
                  required: "URL is required",
                  pattern: {
                    value:
                      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                    message: "Invalid URL",
                  },
                })}
                type="text"
                className="block w-full rounded-full border-gray-300 p-2 pl-10 placeholder-gray-300 focus:border-blue-400 focus:ring-blue-400 sm:text-sm"
                placeholder="https://example.com"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="text-6xl font-semibold text-gray-800">the better</div>
      <div className="flex w-full flex-row items-end justify-end pt-48">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => setOpen(true)}
        >
          Click to see list of all shortlinks
        </button>
      </div>
      <SlugList open={open} setOpen={setOpen} />
    </div>
  );
};

export default Home;
