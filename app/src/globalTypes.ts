export type Drone = {
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
  ownerName?: string;
  allowedMaxFlightAltitude?: number;
  allowedMinFlightAltitude?: number;
  pesticide?: string;
};
