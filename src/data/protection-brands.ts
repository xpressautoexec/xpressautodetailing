export const AUTHORIZED_BRANDS = ["SunTek", "LLumar", "CARPRO", "System X", "Gyeon", "Gtechniq"] as const;
export const FILM_PRODUCTS = {
  suntek: {
    name: "SunTek", official: "https://suntekfilms.com/na/en/paint-protection-film/", path: "/paint-protection-film/suntek/",
    products: [
      { name: "Reaction", description: "Gloss paint protection film with a super-hydrophobic, ceramic-style topcoat.", benefits: ["Water-beading surface for easier cleaning", "Self-healing surface and environmental stain resistance"] },
      { name: "Ultra", description: "High-gloss, self-healing paint protection film with HydroResist™ topcoat.", benefits: ["Helps shield paint from rocks and road debris", "Topcoat limits water and dirt buildup"] },
      { name: "Ultra Matte", description: "Satin-finish paint protection film with Ultra’s protective features.", benefits: ["Matte restyle or protection for matte paint", "Self-healing topcoat helps resist everyday marks"] },
      { name: "Ultra Defense", description: "Thicker, high-gloss paint protection film for higher-impact use.", benefits: ["Added chip resistance for demanding driving", "HydroResist™ topcoat for easier cleaning"] },
    ],
  },
  llumar: {
    name: "LLumar", official: "https://llumar.com/en/paint-protection-film/", path: "/paint-protection-film/llumar/",
    products: [
      { name: "Valor", description: "Ultra-gloss, super-hydrophobic paint protection film incorporating Tetrashield™.", benefits: ["Sheds water and dirt for easier washing", "Self-healing surface protects against everyday road debris"] },
      { name: "Platinum Gloss", description: "Gloss paint protection film with a self-healing surface and HydroGard™ topcoat.", benefits: ["Heat helps reduce light surface scratches", "Water-repellent topcoat helps resist staining"] },
      { name: "Platinum Matte", description: "Matte-finish paint protection film that preserves paint colour and a flat appearance.", benefits: ["Matte restyle or a match for matte paint", "Self-healing and water-repellent surface"] },
      { name: "Platinum Extra", description: "Thicker paint protection film for higher-impact and chip defence.", benefits: ["Protection for gravel-road and demanding use", "Gloss finish with self-healing HydroGard™ topcoat"] },
    ],
  },
} as const;
export const DQUARTZ_PACKAGES = [
  { name: "DQUARTZ Protection", priceLabel: "Pricing — get a quote", includes: ["Paint inspection and tailored preparation", "DQUARTZ professional ceramic coating", "Product-specific aftercare guidance"] },
  { name: "DQUARTZ Complete Care", priceLabel: "Pricing — get a quote", includes: ["Correction plan for your paint condition", "DQUARTZ with tailored surface protection", "Maintenance options through Xpress Pass"] },
] as const;