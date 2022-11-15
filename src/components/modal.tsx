import { Dialog, Transition } from "@headlessui/react";
import type { ShortLink } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: ShortLink[] | undefined;
}

const SlugList = ({ open, setOpen, data }: Props) => {
  const [hostName, setHostName] = useState<string | undefined>();

  const onClickSlug = (slug: string) => {
    if (hostName) {
      navigator.clipboard.writeText(`${hostName}/${slug}`);
    }
    toast.success("Copied to clipboard");
    setOpen(false);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setHostName(window.location.hostname);
    }
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8  sm:p-6">
                <span className="text-lg font-semibold">List of slugs</span>
                <div className="mt-4 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr className="divide-x divide-gray-200">
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Slug
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Url
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {data?.map((url) => (
                              <tr
                                key={url.slug}
                                onClick={() => onClickSlug(url.slug)}
                                className="cursor-pointer divide-x divide-gray-200 hover:bg-gray-100"
                              >
                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                  {url.slug}
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                  {url.url}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlugList;
