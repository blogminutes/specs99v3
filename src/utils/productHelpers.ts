export const sizes = [{ name: "Small" }, { name: "Medium" }, { name: "Large" }];

export function enumToArray(enumObject: any): { name: string }[] {
  return Object.keys(enumObject).map((key) => ({ name: enumObject[key] }));
}

export enum Genders {
  Mens = "Mens",
  Womens = "Womens",
  Unisex = "Unisex",
}

export const shapes = [
  { name: "Round" },
  { name: "Rectangular" },
  { name: "Aviator" },
  { name: "Cat-eye" },
  { name: "Wayfarer" },
  { name: "Oval" },
  { name: "Square" },
  { name: "Browline" },
  { name: "Roundish Square" },
  { name: "Butterfly" },
];

export const lensTypes = [
  { name: "Progressive" },
  { name: "Photochromic" },
  { name: "Toric" },
  { name: "Bifocals" },
];

export const categories = [
  { name: "Sunglasses" },
  { name: "Eyeglasses" },
  { name: "Sports Sunglasses" },
  { name: "Contact Lenses" },
  { name: "Computer Glasses" },
  { name: "Accessories" },
];

export const lensColors = [
  { name: "Transparent" },
  { name: "Red" },
  { name: "Blue" },
  { name: "Pink" },
  { name: "Grey" },
  { name: "Golden" },
  { name: "Black" },
];

export const frameColors = [
  { name: "Red" },
  { name: "Blue" },
  { name: "Pink" },
  { name: "Grey" },
  { name: "Golden" },
  { name: "Black" },
];
export const frameBodyTypes = [{ name: "Metal" }, { name: "Plastic" }];
