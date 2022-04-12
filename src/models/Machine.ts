import { MachineStatus } from "./MachineStatus";
import { MachineType } from "./MachineType";
import { MeasurementRange } from "./MeasurementRange";

export interface Machine {
    id: string;
    typology: MachineType;
    status: MachineStatus;
    range: MeasurementRange;
};