import { Machine } from "./Machine";
import { MeasurementType } from "./MeasurementType";
import { ValueSensor } from "./ValueSensor";

export interface Sensor {
    id: string;
    machine: Machine
    typology: MeasurementType;
    data:ValueSensor[];
};
