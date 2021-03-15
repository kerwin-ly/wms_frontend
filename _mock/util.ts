export function randomNumber(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min)) + min;
}
