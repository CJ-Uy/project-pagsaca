export function calculateLinearRegression(data) {
  if (!Array.isArray(data) || data.length < 2) {
    return null;
  }

  const n = data.length;
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0;

  data.forEach((point) => {
    sumX += point.timestamp;
    sumY += point.filteredVoltage;
    sumXY += point.timestamp * point.filteredVoltage;
    sumX2 += point.timestamp * point.timestamp;
  });

  const denominator = n * sumX2 - sumX * sumX;

  if (denominator === 0) {
    return null;
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}
