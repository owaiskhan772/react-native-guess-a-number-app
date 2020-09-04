export default function randomNumberGenerator(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return randomNumberGenerator(min, max, exclude);
  }
  return randomNumber;
}
