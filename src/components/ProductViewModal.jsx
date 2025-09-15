import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Divider } from "@mui/material";
import { useState } from "react";
import Status from "./Status";
import { MdClose, MdDone } from "react-icons/md";

export default function ProductViewModal({
  open,
  setOpen,
  product,
  isAvailable,
}) {
  const {
    id,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  } = product;

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full"
            >
              {image && (
                <div className="flex justify-center aspect-[3/2]">
                  <img src={image} alt={productName} />
                </div>
              )}

              <div className="px-6 pt-10 pb-2">
                <DialogTitle
                  as="h1"
                  className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4"
                >
                  {productName}
                </DialogTitle>

                <div className="space-y-2 text-gray-700 pb-4">
                  <div className="flex items-center justify-between">
                    {specialPrice ? (
                      <div className="flex gap-2 items-center">
                        <span className="text-gray-400 line-through">
                          ${Number(price).toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-slate-700">
                          ${Number(specialPrice).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-slate-700">
                        {"  "}${Number(price).toFixed(2)}
                      </span>
                    )}
                    {isAvailable ? (
                      <Status
                        text="In Stock"
                        icon={MdDone}
                        bg="bg-teal-200"
                        color="text-teal-900"
                      />
                    ) : (
                      <Status
                        text="Out-Of-Stock"
                        icon={MdClose}
                        bg="bg-rose-200"
                        color="text-rose-700"
                      />
                    )}
                  </div>
                  <Divider />
                  <p>{description}</p>
                </div>
              </div>
              <div className="flex gap-4 px-6 py-4 justify-end">
                <button
                  className="px-4 py-2 text-sm font-semibold border-slate-700 border text-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-md"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
