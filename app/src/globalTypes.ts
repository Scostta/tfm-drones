export type Drone = {
  id?: number;
  ownerName?: string;
  model?: string;
  maxFlightAltitude?: number;
  minFlightAltitude?: number;
  pesticides?: string[];
  cost?: number;
  velocity?: number;
  owner?: string;
};

export type Plot = {
  id?: number;
  ownerName?: string;
  allowedMaxFlightAltitude?: number;
  allowedMinFlightAltitude?: number;
  pesticide?: string;
};

export type Job = {
  id?: number;
  droneId: number;
  plotId: number;
  approved?: boolean;
};
