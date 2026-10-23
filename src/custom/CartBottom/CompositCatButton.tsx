
"use client";

import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useCartContext } from "@/store/CartContext";
import { cartProductType } from "@/lib/types/cartDataType";

type CompositCatButtonProps = {
  cartProduct: cartProductType;
  selectQuantity?: boolean;
  onAdded?: () => void;
};

const CompositCatButton = ({
  cartProduct,
  selectQuantity = false,
  onAdded,
}: CompositCatButtonProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const { addProductToCart, removeCartProduct, cartData } =
    useCartContext();

  // Existing cart quantity behavior for normal product cards
  useEffect(() => {
    if (selectQuantity) return;

    const cartItem = cartData.find((item: cartProductType) => {
      if (cartProduct?.uniqueKey) {
        return item.uniqueKey === cartProduct.uniqueKey;
      }

      return item.id === cartProduct?.id;
    });

    setQuantity(cartItem?.quantity ?? 0);
  }, [cartData, cartProduct, selectQuantity]);

  function addToCartL() {
    addProductToCart(cartProduct);
  }

  function removeFromCartL() {
    removeCartProduct(cartProduct);
  }

  // Quantity-first mode: add the chosen quantity in one action
  function addSelectedQuantity() {
    if (selectedQuantity < 1) return;

    addProductToCart({
      ...cartProduct,
      quantity: selectedQuantity,
    });

    onAdded?.();
  }

  // NEW MODE: choose quantity, then click Add
  if (selectQuantity) {
    return (
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() =>
              setSelectedQuantity((current) => Math.max(1, current - 1))
            }
            disabled={selectedQuantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IoMdRemove size={18} />
          </button>

          <span className="min-w-5 text-center text-sm font-bold text-slate-900">
            {selectedQuantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setSelectedQuantity((current) => current + 1)
            }
            aria-label="Increase quantity"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            <IoMdAdd size={18} />
          </button>
        </div>

        <button
          type="button"
          onClick={addSelectedQuantity}
          className="flex-1 rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
        >
          Add {selectedQuantity}
        </button>
      </div>
    );
  }

  // EXISTING MODE: normal product card behavior
  return (
    <div className="flex w-[100px] justify-end">
      {quantity > 0 ? (
        <div className="flex w-full items-center justify-between gap-2 px-1">
          <div className="rounded-lg bg-[#F3F2F0] px-[3px] pb-[3px] pt-[1px]">
            <button
              type="button"
              onClick={removeFromCartL}
              aria-label="Remove one"
              className="flex items-center justify-center rounded-lg bg-white px-2 py-2 leading-none"
            >
              <IoMdRemove size={16} className="text-[#373535]" />
            </button>
          </div>

          <div className="flex items-center text-gray-600">
            {quantity}
          </div>

          <div className="rounded-lg bg-[#F3F2F0] px-[2px] pb-[2px] pt-[1px]">
            <button
              type="button"
              onClick={addToCartL}
              aria-label="Add one"
              className="flex items-center justify-center rounded-lg bg-white px-2 py-2"
            >
              <IoMdAdd size={16} className="text-[#373535]" />
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-[#F3F2F0] px-[3px] pb-[3px] pt-[1px]">
          <button
            type="button"
            onClick={addToCartL}
            className="flex w-[70px] items-center justify-center rounded-lg bg-white px-1 py-1 font-bold text-gray-400"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default CompositCatButton;



{/* <CompositCatButton
  selectQuantity
  onAdded={() => setIsOpen(false)}
  cartProduct={{
    id: selectedVariant?.id ?? product.id,
    uniqueKey: uniqueKey,
    price: finalPrice,
    basePrice: selectedVariant?.price ?? product.price ?? 0,
    name: selectedVariant?.name ?? product.name,
    quantity: 1,
    currentStock:
      selectedVariant?.currentStock ?? product.currentStock!,
    image: product.image,
    categoryId: product.categoryId,
    productCat: product.productCat!,
    taxRate: selectedProduct.taxRate,
    taxType: selectedProduct.taxType,
    parentProductId: product.id,
    modifiers: Object.values(selectedModifiers).flat(),
    note: popupNote,
  }}
/> */}