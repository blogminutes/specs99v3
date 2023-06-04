export const emailValidator = (val: string) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return val.match(validRegex) ? true : false;
};

export const passwordValidator = (val: string) => {
  return val.length >= 8;
};

export const nameValidator = (val: string) => {
  return val.length >= 3;
};

export const wordLengthValidator = (count: number) => {
  return (val: string) => {
    return val.length >= count;
  };
};

export const numberValidator = (count: number, lessThan?: boolean) => {
  const check = lessThan ? "<=" : ">=";
  return (val: string) => {
    return eval(Number(val) + check + count);
  };
};

export const minMaxValidator = (min: number, max: number) => {
  return (val: string) => {
    return min <= Number(val) && Number(val) <= max;
  };
};

export const multipleValueValidator = (vals: string[]) => {
  return vals.length > 0;
};
