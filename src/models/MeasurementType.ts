const measurementTypes = [
    'Temperature',
    'Pressure',
    'Humidity',
    'Time'
] as const;

export type MeasurementType = typeof measurementTypes[number];