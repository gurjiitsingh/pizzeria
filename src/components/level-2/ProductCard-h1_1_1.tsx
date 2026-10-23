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
  return (<>
    <div className="flex flex-col gap-2 bg-white w-full md:w-[49%] rounded-2xl shadow-sm p-3">
      {/* PRODUCT HEADER */}
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              className="object-cover"
            />
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.productDesc}</p>
          {shouldOpenPopup ? (
            <div className="flex justify-between mt-2">
              <div>
                {priceDiscounted ? (
                  <>
                    <span className="font-bold">{priceDiscounted}</span>
                    <span className="line-through ml-2 text-sm">
                      {priceRegular}
                    </span>
                  </>
                ) : (
                  <span>{priceRegular}</span>
                )}
              </div>

              <div className="bg-[#F3F2F0] px-[3px] pt-[1px] pb-[3px]  rounded-lg">
                <button
                  onClick={() => setIsOpen(true)}
                  className=" w-[70px] px-1 py-1 rounded-lg bg-white font-bold text-gray-400  flex items-center justify-center"
                >
                  Add
                </button>
              </div>


            </div>
          ) : (
            <div className="flex justify-between mt-2">
              <div>
                {priceDiscounted ? (
                  <>
                    <span className="font-bold">{priceDiscounted}</span>
                    <span className="line-through ml-2 text-sm">
                      {priceRegular}
                    </span>
                  </>
                ) : (
                  <span>{priceRegular}</span>
                )}
              </div>
             <div className="flex items-center gap-2">

  {/* Note - secondary */}
  <button
    onClick={() => {
      setQuickNote("");
      setSimpleNoteOpen(true);
    }}
    className="text-gray-500 text-xs hover:text-gray-700 transition"
  >
    + Note
  </button>

  {/* Add - primary */}
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

  
{isOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-3 sm:p-4">
    <div className="flex max-h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="truncate pr-3 text-lg font-bold text-slate-900">
          {product.name}
        </h2>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close modifiers"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
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
            className={`mb-1 flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 transition-colors ${
              selectedVariant?.id === variant.id
                ? "bg-orange-50"
                : "hover:bg-slate-50"
            }`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <input
                type="radio"
                name={`size-${product.id}`}
                checked={selectedVariant?.id === variant.id}
                onChange={() => setSelectedVariant(variant)}
                className="h-4 w-4 accent-orange-600"
              />

              <span className="text-sm font-medium text-slate-800">
                {variant.name}
              </span>
            </div>

            <span className="shrink-0 text-sm font-semibold text-slate-700">
              {formatCurrencyNumber(variant.price ?? 0)}
            </span>
          </label>
        ))}

        {/* MODIFIERS */}
        {productModifierGroups.length > 0 && (
          <div className="mt-3">
            {productModifierGroups.map((groupData) => (
              <div
                key={groupData.group.id}
                className="mb-3 border-b border-slate-100 pb-2 last:border-b-0"
              >
                {/* MODIFIER GROUP TITLE */}
                <p className="text-sm font-bold text-slate-900">
                  {groupData.group.name}
                </p>

                <p className="mt-0.5 mb-1 text-xs font-medium text-slate-600">
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
                      className={`flex min-h-9 cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-1.5 transition-colors ${
                        isChecked
                          ? "bg-orange-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="min-w-0 flex-1 text-sm font-medium text-slate-800">
                        {item.name}
                      </span>

                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-sm font-semibold text-slate-700">
                          +
                          {formatCurrencyNumber(
                            item.price ?? 0
                          )}
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
                          className="h-4 w-4 accent-orange-600"
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

      {/* FIXED FOOTER: NOTE, TOTAL AND ADD TO CART */}
      <div className="shrink-0 border-t border-slate-200 bg-white px-4 pb-3 pt-3">

        {/* NOTE INPUT */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-800">
            Add Note (optional)
          </label>

          <textarea
            value={popupNote}
            onChange={(e) => setPopupNote(e.target.value)}
            placeholder="e.g. less spicy, no onion..."
            className="w-full resize-none rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={2}
          />
        </div>

        {/* TOTAL */}
        <p className="mt-2 text-right text-base font-bold text-slate-900">
          Total: {formatCurrencyNumber(finalPrice)}
        </p>

        {/* ACTIONS */}
        <div className="my-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close popup"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200"
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


    {
      simpleNoteOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-[350px] rounded-xl p-5 shadow-lg">

            {/* Title */}
            <h2 className="font-semibold text-lg mb-3 text-gray-800">
              {product.name}
            </h2>

            {/* Textarea */}
            <textarea
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              placeholder="e.g. no onion, less spicy..."
              className="w-full border border-gray-300 rounded-lg p-2 h-24 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            {/* Buttons */}

            <div className="flex justify-between items-center mt-5 gap-3">
              {/* Cancel */}
              <button
                onClick={() => { setSimpleNoteOpen(false); setQuickNote(""); }}
                className=" border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                <IoClose />
              </button>

              {/* Add to cart */}
              <div className="">
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
      )
    }




  </>
  );
}
