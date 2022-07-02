import { atom } from 'jotai';
import { Drone } from '../globalTypes';

export const dronesAtom = atom<Drone[]>([]);
export const droneSelectedAtom = atom<Drone | null>(null);
