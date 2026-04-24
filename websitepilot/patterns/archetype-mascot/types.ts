export type BrandTokens = {
  name: string;
  primary: string;
  primaryInk: string;
  dark: string;
  darker: string;
  cream?: string;
  onDark: string;
  onDarkMuted?: string;
  accent?: string;
  fontFamily?: string;
};

export const defaultBrand: BrandTokens = {
  name: "Volt Vikings",
  primary: "#FF9143",
  primaryInk: "#000000",
  dark: "#3C0E70",
  darker: "#250845",
  cream: "#FFF6EF",
  onDark: "#FFFFFF",
  onDarkMuted: "#D9C8EF",
  accent: "#FF620D",
  fontFamily: "Saira, sans-serif",
};
