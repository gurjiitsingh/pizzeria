"use client";

import { useEffect, useMemo } from "react";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";
import { cartProductType } from "@/lib/types/cartDataType";
import { formatCurrencyNumber } from "@/utils/formatCurrency";
import CartButtonAdd from "../AddToCart/CartButtonAdd";
import Image from "next/image";
import { useState } from "react";
import type { TnewModifierItemSchema } from "@/lib/types/modifierItemType";
import { IoClose } from "react-icons/io5";

import CartButtonAddINDE from "@/custom/CartBottom/CartButtonAddINDE";
import CompositCatButton from "@/custom/CartBottom/CompositCatButton";
export default function ProductCardHorizontical({
  product,
  variants,
  allAddOns,
  modifierGroups,
  productModifiers,
}: {
  product: ProductType;
  variants: ProductType[];
  allAddOns: addOnType[];
  modifierGroups: any[];
  productModifiers: any[];

}) {

  type ModifierItem = TnewModifierItemSchema & {
  id: string;
};
  const { settings } = UseSiteContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductType | null>(null);

  const [selectedModifiers, setSelectedModifiers] = useState<{
    [groupId: string]: any[];
  }>({});



  const shouldOpenPopup =
    product.hasVariants || product.hasModifier;

   


  const [simpleNoteOpen, setSimpleNoteOpen] = useState(false);


  const [popupNote, setPopupNote] = useState("");
  const [quickNote, setQuickNote] = useState("");

  //  FILTER VARIANTS FOR THIS PRODUCT
  const productVariants = useMemo(() => {
    if (!product.hasVariants) return [];
    return variants
      .filter((v) => v.parentId === product.id)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }, [product.id, product.hasVariants, variants]);
  const [modifiersLoaded, setModifiersLoaded] = useState(false);

  const productGroupIds = useMemo(() => {
    return productModifiers
      .filter((pm) => pm.productId === product.id)
      .map((pm) => pm.groupId);
  }, [product.id, productModifiers]);

  const productModifierGroups = useMemo(() => {
    return modifierGroups.filter((g) =>
      productGroupIds.includes(g.group.id)
    );
  }, [modifierGroups, productGroupIds]);

  useEffect(() => {
    if (!productModifierGroups.length) return;

    console.log("🍕 Product:", product.name);
    console.log("🔥 FULL GROUPS:", productModifierGroups);
  }, [productModifierGroups]);



  useEffect(() => {
    if (isOpen) {
      setSelectedModifiers({});
      setPopupNote(""); // ✅ reset properly

      if (productVariants.length > 0) {
        setSelectedVariant(productVariants[0]);
      }
    }
  }, [isOpen]);

  // ---------------- PRICE ----------------
  const priceRegular = formatCurrencyNumber(
    product.price ?? 0,
    settings.currency as string,
    settings.locale as string
  );

  const priceTarget =
    product.discountPrice && product.discountPrice > 0
      ? product.discountPrice
      : product.price ?? 0;

  const priceDiscounted =
    product.discountPrice && product.discountPrice > 0
      ? formatCurrencyNumber(
        product.discountPrice,
        settings.currency as string,
        settings.locale as string
      )
      : null;

  const cartProduct: cartProductType = {
    id: product.id,
    uniqueKey:
      product.id.toString() +
      "_" +
      (quickNote?.trim() || ""),
    note: quickNote,
    quantity: 1,
    currentStock: product.currentStock!,
    price: priceTarget,
    basePrice: priceTarget,
    name: product.name,
    image: product.image,
    categoryId: product.categoryId,
    productCat: product.productCat!,
    taxRate: product.taxRate,
    taxType: product.taxType,

  };

  const modifiersFlat = Object.values(selectedModifiers).flat();



  const uniqueKey =
    (selectedVariant?.id ?? product.id) +
    "_" +
    modifiersFlat.map((m) => m.id).sort().join("_") +
    "_" +
    (popupNote?.trim() || "");

  useEffect(() => {
    if (isOpen && productVariants.length > 0) {
      setSelectedVariant(productVariants[0]);
    }
  }, [isOpen, productVariants]);

  const selectedProduct = selectedVariant ?? product;

  const modifiersTotal = Object.values(selectedModifiers)
    .flat()
    .reduce((sum, item) => sum + (item.price ?? 0), 0);

  const basePrice = selectedProduct.price ?? 0;

  const finalPrice = basePrice + modifiersTotal;


  const isValidSelection = productModifierGroups.every((groupData) => {
    const selected = selectedModifiers[groupData.group.id] || [];

    return (
      selected.length >= groupData.group.minSelection &&
      selected.length <= groupData.group.maxSelection
    );
  });

  // ---------------- UI ----------------

return (
  <>
    {/* PRODUCT CARD */}
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-amber-500/20 bg-[#14151a] p-3.5 shadow-[0_5px_18px_rgba(0,0,0,0.22)] transition duration-200 hover:border-amber-500/45 sm:p-4 md:w-[49%]">
      {/* PRODUCT HEADER */}
      <div className="flex gap-3.5 sm:gap-4">
        {/* PRODUCT IMAGE */}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#202127] sm:h-24 sm:w-24">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* PRODUCT DETAILS */}
        <div className="min-w-0 flex-1">
          <h3 className="break-words font-serif text-base font-bold leading-snug text-white sm:text-lg">
            {product.name}
          </h3>

          {product.productDesc && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              {product.productDesc}
            </p>
          )}

          {/* PRICE AND ACTIONS */}
          {shouldOpenPopup ? (
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                {priceDiscounted ? (
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-base font-extrabold text-amber-300 sm:text-lg">
                      {priceDiscounted}
                    </span>
                    <span className="text-xs text-slate-400 line-through sm:text-sm">
                      {priceRegular}
                    </span>
                  </div>
                ) : (
                  <span className="text-base font-extrabold text-amber-300 sm:text-lg">
                    {priceRegular}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="min-h-9 min-w-[76px] shrink-0 rounded-lg border border-amber-400/50 bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-extrabold text-[#17120a] shadow-sm transition hover:from-amber-300 hover:to-orange-400 active:scale-[0.97] touch-manipulation"
              >
                Add +
              </button>
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                {priceDiscounted ? (
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-base font-extrabold text-amber-300 sm:text-lg">
                      {priceDiscounted}
                    </span>
                    <span className="text-xs text-slate-400 line-through sm:text-sm">
                      {priceRegular}
                    </span>
                  </div>
                ) : (
                  <span className="text-base font-extrabold text-amber-300 sm:text-lg">
                    {priceRegular}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* NOTE - SECONDARY */}
                <button
                  type="button"
                  onClick={() => {
                    setQuickNote("");
                    setSimpleNoteOpen(true);
                  }}
                  className="whitespace-nowrap text-xs font-semibold text-slate-300 underline decoration-amber-500/50 underline-offset-4 transition hover:text-amber-300 touch-manipulation"
                >
                  + Note
                </button>

                {/* ADD TO CART - EXISTING LOGIC */}
                <CartButtonAddINDE
                  cartProduct={{
                    ...cartProduct,
                    note: "",
                    uniqueKey: product.id.toString(),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* VARIANT AND MODIFIER POPUP */}
    {isOpen && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-4">
        <div className="flex max-h-[88dvh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-amber-500/30 bg-[#14151a] shadow-[0_20px_70px_rgba(0,0,0,0.65)]">
          {/* HEADER */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#191a20] px-4 py-3.5">
            <div className="min-w-0 pr-3">
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                Customize your order
              </p>
              <h2 className="truncate font-serif text-lg font-bold text-white">
                {product.name}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close modifiers"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#272830] text-slate-200 transition hover:border-amber-500/40 hover:bg-[#33343d] hover:text-amber-300 touch-manipulation"
            >
              <IoClose size={21} />
            </button>
          </div>

          {/* SCROLLABLE VARIANTS AND MODIFIERS */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3">
            {/* VARIANTS */}
            {productVariants.map((variant) => (
              <label
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`mb-1 flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                  selectedVariant?.id === variant.id
                    ? "border-amber-500/50 bg-amber-500/10"
                    : "border-transparent hover:border-white/10 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <input
                    type="radio"
                    name={`size-${product.id}`}
                    checked={selectedVariant?.id === variant.id}
                    onChange={() => setSelectedVariant(variant)}
                    className="h-4 w-4 accent-amber-500"
                  />

                  <span className="text-sm font-semibold text-white">
                    {variant.name}
                  </span>
                </div>

                <span className="shrink-0 text-sm font-bold text-amber-300">
                  {formatCurrencyNumber(variant.price ?? 0)}
                </span>
              </label>
            ))}

            {/* MODIFIERS */}
            {productModifierGroups.length > 0 && (
              <div className="mt-4">
                {productModifierGroups.map((groupData) => (
                  <div
                    key={groupData.group.id}
                    className="mb-3 border-b border-white/10 pb-3 last:border-b-0"
                  >
                    {/* MODIFIER GROUP TITLE */}
                    <p className="text-sm font-bold text-white">
                      {groupData.group.name}
                    </p>

                    <p className="mb-2 mt-1 text-xs font-medium text-slate-400">
                      Min: {groupData.group.minSelection} | Max:{" "}
                      {groupData.group.maxSelection}
                    </p>

                    {/* MODIFIER ITEMS */}
                    {groupData.items.map((item: ModifierItem) => {
                      const selectedItems =
                        selectedModifiers[groupData.group.id] || [];

                      const isChecked = selectedItems.some(
                        (i) => i.id === item.id
                      );

                      const handleChange = () => {
                        setSelectedModifiers((prev) => {
                          const prevItems =
                            prev[groupData.group.id] || [];

                          let updated = [...prevItems];

                          if (groupData.group.maxSelection === 1) {
                            updated = isChecked ? [] : [item];
                          } else {
                            const exists = prevItems.some(
                              (i) => i.id === item.id
                            );

                            if (exists) {
                              updated = prevItems.filter(
                                (i) => i.id !== item.id
                              );
                            } else if (
                              prevItems.length <
                              groupData.group.maxSelection
                            ) {
                              updated.push(item);
                            }
                          }

                          return {
                            ...prev,
                            [groupData.group.id]: updated,
                          };
                        });
                      };

                      return (
                        <label
                          key={item.id}
                          className={`flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-colors ${
                            isChecked
                              ? "bg-amber-500/10"
                              : "hover:bg-white/[0.04]"
                          }`}
                        >
                          <span className="min-w-0 flex-1 text-sm font-medium text-slate-200">
                            {item.name}
                          </span>

                          <div className="flex shrink-0 items-center gap-2.5">
                            <span className="text-sm font-bold text-amber-300">
                              +{formatCurrencyNumber(item.price ?? 0)}
                            </span>

                            <input
                              type={
                                groupData.group.maxSelection === 1
                                  ? "radio"
                                  : "checkbox"
                              }
                              name={`modifier-${groupData.group.id}`}
                              checked={isChecked}
                              onChange={handleChange}
                              className="h-4 w-4 accent-amber-500"
                            />
                          </div>
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FIXED FOOTER */}
          <div className="shrink-0 border-t border-amber-500/20 bg-[#191a20] px-4 pb-3 pt-3">
            {/* NOTE INPUT */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-100">
                Add Note <span className="font-normal text-slate-400">(optional)</span>
              </label>

              <textarea
                value={popupNote}
                onChange={(e) => setPopupNote(e.target.value)}
                placeholder="e.g. less spicy, no onion..."
                className="w-full resize-none rounded-xl border border-white/15 bg-[#0c0d10] p-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                rows={2}
              />
            </div>

            {/* TOTAL */}
            <div className="mt-3 flex items-center justify-between rounded-lg border border-amber-500/20 bg-amber-500/[0.07] px-3 py-2">
              <span className="text-sm font-semibold text-slate-200">
                Total
              </span>
              <span className="text-lg font-extrabold text-amber-300">
                {formatCurrencyNumber(finalPrice)}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="my-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close popup"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#272830] text-slate-200 transition hover:bg-[#33343d] hover:text-amber-300 touch-manipulation"
              >
                <IoClose size={21} />
              </button>

              <div className="min-w-0 flex-1">
                <CompositCatButton
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* QUICK NOTE POPUP */}
    {simpleNoteOpen && (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
        <div className="w-full max-w-[350px] rounded-2xl border border-amber-500/25 bg-[#14151a] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {/* TITLE */}
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            Special request
          </p>

          <h2 className="mb-4 break-words font-serif text-lg font-bold text-white">
            {product.name}
          </h2>

          {/* TEXTAREA */}
          <textarea
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            placeholder="e.g. no onion, less spicy..."
            className="h-24 w-full resize-none rounded-xl border border-white/15 bg-[#0c0d10] p-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />

          {/* BUTTONS */}
          <div className="mt-5 flex items-center justify-between gap-3">
            {/* CANCEL */}
            <button
              type="button"
              onClick={() => {
                setSimpleNoteOpen(false);
                setQuickNote("");
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#272830] text-slate-200 transition hover:bg-[#33343d] hover:text-amber-300 touch-manipulation"
              aria-label="Cancel note"
            >
              <IoClose size={20} />
            </button>

            {/* ADD TO CART - EXISTING LOGIC */}
            <div className="min-w-0 flex-1">
              <CartButtonAdd
                cartProduct={{
                  ...cartProduct,
                  note: quickNote,
                  uniqueKey: product.id.toString() + "_" + quickNote,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

}
