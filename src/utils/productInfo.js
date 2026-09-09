function translateUnit(number, unit) {
  const isPlural = number !== 1;
  const map = {
    day: ["dia", "dias"],
    week: ["semana", "semanas"],
    month: ["mês", "meses"],
    year: ["ano", "anos"],
  };
  const key = unit.toLowerCase();
  return map[key] ? map[key][isPlural ? 1 : 0] : unit;
}

export function translateShipping(text) {
  if (!text) return text;
  if (/overnight/i.test(text)) return "Enviado no dia seguinte";
  if (/same[- ]day/i.test(text)) return "Enviado no mesmo dia";

  const match = text.match(/(\d+)(?:-(\d+))?\s*(?:business\s+)?(day|week|month)s?/i);
  if (!match) return text; // não reconheceu o padrão: mantém o texto original, sem quebrar a tela

  const [, min, max, unitRaw] = match;
  const isBusinessDays = /business/i.test(text);
  const unit = translateUnit(Number(max || min), unitRaw.toLowerCase());
  const numberPart = max ? `${min}-${max}` : min;

  return `Enviado em ${numberPart} ${unit}${isBusinessDays ? " úteis" : ""}`;
}

export function translateWarranty(text) {
  if (!text) return text;
  if (/no warranty/i.test(text)) return "Sem garantia";
  if (/lifetime/i.test(text)) return "Garantia vitalícia";

  const match = text.match(/(\d+)\s*(day|week|month|year)s?/i);
  if (!match) return text;

  const [, number, unitRaw] = match;
  const unit = translateUnit(Number(number), unitRaw.toLowerCase());
  return `Garantia de ${number} ${unit}`;
}

export function translateReturnPolicy(text) {
  if (!text) return text;
  if (/no return/i.test(text)) return "Sem devolução";

  const match = text.match(/(\d+)\s*(day|week|month|year)s?/i);
  if (!match) return text;

  const [, number, unitRaw] = match;
  const unit = translateUnit(Number(number), unitRaw.toLowerCase());
  return `Devolução em até ${number} ${unit}`;
}