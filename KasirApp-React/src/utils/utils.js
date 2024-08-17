export const FormatIDR = (number) => {
  if (typeof number !== 'number') {
    return '0';
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
