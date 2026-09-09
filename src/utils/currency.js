const USD_TO_BRL = 5.2;

export function toBRL(usdValue) {
  return usdValue * USD_TO_BRL;
}

export function formatBRL(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatInstallments(totalValue, installments = 12) {
  const perInstallment = totalValue / installments;
  return `em ${installments}x de ${formatBRL(perInstallment)} sem juros`;
}