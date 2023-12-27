export const NumberFormat = (value: string | number) => {
  const number = typeof value === "string" ? Number(value) : value;

  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
};

export const NumberComma = (value?: string | number) => {
  if (!value) return "0";
  const number = typeof value === "string" ? Number(value) : value;

  return number.toLocaleString("ko-KR");
};
