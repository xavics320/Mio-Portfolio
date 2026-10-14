/*
  Dati "strutturali" dei pacchetti: tutto ciò che NON cambia con la lingua.
  I testi (nome, descrizione, lista servizi, CTA) stanno in
  i18n/translations.js sotto pricing.plans[id].

  price: numero in euro, oppure null per i piani su preventivo.
  featured: evidenzia il piano consigliato (uno solo).
*/
export const PLANS = [
  { id: "starter", price: 489, featured: false },
  { id: "business", price: 789, featured: true },
  { id: "custom", price: null, featured: false },
];
