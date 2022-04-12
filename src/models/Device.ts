import { Sensor } from "./Sensor";

export interface Device {
    id: string;
    userId: string;
    sensors: Sensor[];
};