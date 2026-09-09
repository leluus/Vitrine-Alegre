import { toBRL } from "./currency";

export function getPricing(product) {
  const hasDiscount = product.discountPercentage > 0;
  const originalBRL = toBRL(product.price);
  const discountedBRL = hasDiscount
    ? originalBRL - (originalBRL * product.discountPercentage) / 100
    : originalBRL;

  return {
    hasDiscount,
    originalBRL,
    discountedBRL,
    discountPercent: Math.round(product.discountPercentage),
    savingsBRL: originalBRL - discountedBRL,
  };
}