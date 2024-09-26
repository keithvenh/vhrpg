export function calculateTrip(time, parsecs, lightYears, hyperspace_type) {
  const multipliers = {
    "local": [4,8],
    "minor": [1.35, 1.85],
    "standard": [1.15, 1.50],
    "major": [0.85, 1.15]
  };
  let cost = 25;

  const [lowNum, highNum] = multipliers[hyperspace_type];

  const minTime = time * lowNum;
  const maxTime = time * highNum;

  const minParsecs = parsecs * lowNum;
  const maxParsecs = parsecs * highNum;

  const minLightYears = lightYears * lowNum;
  const maxLightYears = lightYears * highNum;

  const minCost = cost * lowNum;
  const maxCost = cost * highNum;

  let randomMultiplier = Math.random() * (highNum - lowNum) + lowNum

  if (randomMultiplier < lowNum) {
    console.log(randomMultiplier, lowNum)
    randomMultiplier = lowNum
  }

  if (randomMultiplier > highNum) {
    console.log(randomMultiplier, highNum)
    randomMultiplier = highNum
  }

  time = time * randomMultiplier;
  parsecs = parsecs * randomMultiplier;
  lightYears = lightYears * randomMultiplier;
  cost = cost * randomMultiplier;

  return {time, minTime, maxTime, parsecs, minParsecs, maxParsecs, lightYears, minLightYears, maxLightYears, cost, minCost, maxCost}
}