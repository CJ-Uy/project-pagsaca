export function applyKalmanFilter(
  data,
  processNoise = 0.01,
  measurementNoise = 0.1
) {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  let estimate = data[0].voltage;
  let errorEstimate = 1;

  return data.map((point) => {
    // Prediction
    let predictedEstimate = estimate;
    let predictedErrorEstimate = errorEstimate + processNoise;

    // Update
    let kalmanGain =
      predictedErrorEstimate / (predictedErrorEstimate + measurementNoise);
    estimate =
      predictedEstimate + kalmanGain * (point.voltage - predictedEstimate);
    errorEstimate = (1 - kalmanGain) * predictedErrorEstimate;

    return { ...point, filteredVoltage: estimate };
  });
}
