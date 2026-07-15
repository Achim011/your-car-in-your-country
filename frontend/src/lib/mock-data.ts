export type Country = {
  code: string;
  name: string;
  flag: string;
};

export const COUNTRIES: Country[] = [
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "BE", name: "Belgique", flag: "🇧🇪" },
  { code: "CH", name: "Suisse", flag: "🇨🇭" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "US", name: "États-Unis", flag: "🇺🇸" },
  { code: "DE", name: "Allemagne", flag: "🇩🇪" },
  { code: "IT", name: "Italie", flag: "🇮🇹" },
  { code: "ES", name: "Espagne", flag: "🇪🇸" },
  { code: "GB", name: "Royaume-Uni", flag: "🇬🇧" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "SN", name: "Sénégal", flag: "🇸🇳" },
  { code: "MA", name: "Maroc", flag: "🇲🇦" },
  { code: "CM", name: "Cameroun", flag: "🇨🇲" },
  { code: "JP", name: "Japon", flag: "🇯🇵" },
];

export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  type: "Électrique" | "Essence" | "Diesel" | "Hybride";
  image: string;
  market: string;
  countryCode: string;
};

export type Market = {
  id: string;
  name: string;
  city: string;
  countryCode: string;
  cars: number;
};

export const MARKETS: Market[] = [
  { id: "m1", name: "AutoParis Élysées", city: "Paris", countryCode: "FR", cars: 128 },
  { id: "m2", name: "Lyon Motors", city: "Lyon", countryCode: "FR", cars: 74 },
  { id: "m3", name: "Brussels Cars Hub", city: "Bruxelles", countryCode: "BE", cars: 63 },
  { id: "m4", name: "Geneva Prestige", city: "Genève", countryCode: "CH", cars: 41 },
  { id: "m5", name: "Montreal Auto", city: "Montréal", countryCode: "CA", cars: 89 },
  { id: "m6", name: "NYC Drive", city: "New York", countryCode: "US", cars: 210 },
  { id: "m7", name: "Berlin AutoHaus", city: "Berlin", countryCode: "DE", cars: 156 },
  { id: "m8", name: "Milano Auto", city: "Milan", countryCode: "IT", cars: 92 },
  { id: "m9", name: "Madrid Motors", city: "Madrid", countryCode: "ES", cars: 71 },
  { id: "m10", name: "London Cars", city: "Londres", countryCode: "GB", cars: 143 },
  { id: "m11", name: "Abidjan Auto Market", city: "Abidjan", countryCode: "CI", cars: 58 },
  { id: "m12", name: "Dakar Motors", city: "Dakar", countryCode: "SN", cars: 44 },
  { id: "m13", name: "Casablanca Cars", city: "Casablanca", countryCode: "MA", cars: 67 },
  { id: "m14", name: "Douala AutoPlace", city: "Douala", countryCode: "CM", cars: 39 },
  { id: "m15", name: "Tokyo Drive", city: "Tokyo", countryCode: "JP", cars: 187 },
];

export const CARS: Car[] = [
  { id: "c1", brand: "Tesla", model: "Model 3", year: 2024, price: 42990, currency: "EUR", type: "Électrique", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format", market: "AutoParis Élysées", countryCode: "FR" },
  { id: "c2", brand: "Peugeot", model: "3008", year: 2023, price: 28500, currency: "EUR", type: "Hybride", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format", market: "Lyon Motors", countryCode: "FR" },
  { id: "c3", brand: "BMW", model: "i4", year: 2024, price: 56000, currency: "EUR", type: "Électrique", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format", market: "Brussels Cars Hub", countryCode: "BE" },
  { id: "c4", brand: "Mercedes", model: "EQS", year: 2024, price: 89000, currency: "CHF", type: "Électrique", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format", market: "Geneva Prestige", countryCode: "CH" },
  { id: "c5", brand: "Ford", model: "Mustang", year: 2023, price: 38000, currency: "CAD", type: "Essence", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format", market: "Montreal Auto", countryCode: "CA" },
  { id: "c6", brand: "Chevrolet", model: "Bolt EV", year: 2024, price: 31000, currency: "USD", type: "Électrique", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format", market: "NYC Drive", countryCode: "US" },
  { id: "c7", brand: "Volkswagen", model: "Golf GTI", year: 2023, price: 34500, currency: "EUR", type: "Essence", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format", market: "Berlin AutoHaus", countryCode: "DE" },
  { id: "c8", brand: "Fiat", model: "500e", year: 2024, price: 24000, currency: "EUR", type: "Électrique", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format", market: "Milano Auto", countryCode: "IT" },
  { id: "c9", brand: "Seat", model: "Leon", year: 2023, price: 22500, currency: "EUR", type: "Diesel", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format", market: "Madrid Motors", countryCode: "ES" },
  { id: "c10", brand: "Land Rover", model: "Defender", year: 2024, price: 78000, currency: "GBP", type: "Diesel", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format", market: "London Cars", countryCode: "GB" },
  { id: "c11", brand: "Toyota", model: "RAV4", year: 2023, price: 18500, currency: "EUR", type: "Hybride", image: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&auto=format", market: "Abidjan Auto Market", countryCode: "CI" },
  { id: "c12", brand: "Renault", model: "Duster", year: 2023, price: 15000, currency: "EUR", type: "Essence", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format", market: "Dakar Motors", countryCode: "SN" },
  { id: "c13", brand: "Dacia", model: "Sandero", year: 2024, price: 13500, currency: "EUR", type: "Essence", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&auto=format", market: "Casablanca Cars", countryCode: "MA" },
  { id: "c14", brand: "Hyundai", model: "Tucson", year: 2024, price: 26000, currency: "EUR", type: "Hybride", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format", market: "Douala AutoPlace", countryCode: "CM" },
  { id: "c15", brand: "Nissan", model: "Leaf", year: 2024, price: 3200000, currency: "JPY", type: "Électrique", image: "https://images.unsplash.com/photo-1549927681-0b673b8243ab?w=800&auto=format", market: "Tokyo Drive", countryCode: "JP" },
];
