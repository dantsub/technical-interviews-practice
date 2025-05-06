export const calucuteDiscount = (percentage = 10, value) => {
  const discount = percentage / 100;
  return value * discount;
}
