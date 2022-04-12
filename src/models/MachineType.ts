const machineTypes = [
    'Milk_Tank',
    'Seasoning',
    'Pasteurization',
    'Consumption'
] as const;

export type MachineType = typeof machineTypes[number];