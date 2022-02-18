export default function getConstructorNameSecondPart(fullName) {
  const splitted = fullName.split("$team");
  const firstPart = splitted[0];
  const secondPart = splitted[1];

  if (secondPart) {
    return secondPart;
  }

  return firstPart;
}
