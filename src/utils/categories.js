const CATEGORY_LABELS = {
  "beauty": "Beleza",
  "fragrances": "Perfumes",
  "furniture": "Móveis",
  "groceries": "Mercearia",
  "home-decoration": "Decoração",
  "kitchen-accessories": "Utensílios de Cozinha",
  "laptops": "Notebooks",
  "mens-shirts": "Camisas Masculinas",
  "mens-shoes": "Calçados Masculinos",
  "mens-watches": "Relógios Masculinos",
  "mobile-accessories": "Acessórios para Celular",
  "motorcycle": "Motocicletas",
  "skin-care": "Cuidados com a Pele",
  "smartphones": "Smartphones",
  "sports-accessories": "Acessórios Esportivos",
  "sunglasses": "Óculos de Sol",
  "tablets": "Tablets",
  "tops": "Blusas",
  "vehicle": "Veículos",
  "womens-bags": "Bolsas Femininas",
  "womens-dresses": "Vestidos Femininos",
  "womens-jewellery": "Joias Femininas",
  "womens-shoes": "Calçados Femininos",
  "womens-watches": "Relógios Femininos",
};

export function translateCategory(slug) {
  if (!slug) return slug;
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];

  // Categoria não mapeada: formata o slug de forma mais legível, sem quebrar a tela
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}