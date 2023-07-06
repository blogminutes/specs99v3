export const sizes = [{ name: "Small" }, { name: "Medium" }, { name: "Large" }];

export function enumToArray(enumObject: any): { name: string }[] {
  return Object.keys(enumObject).map((key) => ({ name: enumObject[key] }));
}

export enum Genders {
  Mens = "Mens",
  Womens = "Womens",
  Unisex = "Unisex",
}

export enum FrameMaterial {
  Plastic = "Beige",
  Steel = "Stainless Steel",
}

export enum FrameColors {
  Beige = "Beige",
  Black = "Black",
  Blue = "Blue",
  Brown = "Brown",
  Copper = "Copper",
  Golden = "Golden",
  Green = "Green",
  Grey = "Grey",
  Multicolor = "Multicolor",
  Orange = "Orange",
  Pink = "Pink",
  Red = "Red",
  Silver = "Silver",
  Violet = "Violet",
  White = "White",
  Yellow = "Yellow",
  Transparent = "Transparent",
}

export enum FrameShapes {
  Rectangle = "Rectangle",
  Round = "Round",
  RoundSquare = "Round Square",
  Square = "Square",
  CatEye = "CatEye",
  Wayfarer = "Wayfarer",
  Aviator = "Aviator",
  Oval = "Oval",
  Hexagonal = "Hexagonal",
  Geometric = "Geometric",
  Clubmaster = "Clubmaster",
  Sports = "Sports",
}

export enum LensColors {
  Beige = "Beige",
  Black = "Black",
  Blue = "Blue",
  Brown = "Brown",
  Copper = "Copper",
  Golden = "Golden",
  Green = "Green",
  Grey = "Grey",
  Multicolor = "Multicolor",
  Transparent = "Transparent",
  Orange = "Orange",
  Pink = "Pink",
  Red = "Red",
  Silver = "Silver",
  Violet = "Violet",
  White = "White",
  Yellow = "Yellow",
}

export enum FrameBodyTypes {
  FullRim = "Full Rim",
  Rimless = "Rimless",
  SemiRimless = "Semi-Rimless",
}

export enum IdealFor {
  Mens = "Mens",
  Womens = "Womens",
  Kids = "Kids",
  Boys = "Boys",
  Girls = "Girls",
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
  { name: "Demo" },
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
