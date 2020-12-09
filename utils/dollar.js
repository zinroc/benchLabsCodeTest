const dollar = (number) => {
  if (typeof number !== "number") return number;

  return number < 0
    ? number.toLocaleString("en-IN").replace("-", "-$")
    : "$".concat(number.toLocaleString("en-IN"));
};

export default dollar;
