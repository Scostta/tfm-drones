import { atom } from 'jotai';
import { Plot } from '../globalTypes';

export const plotsAtom = atom<Plot[]>([]);
export const plotSelectedAtom = atom<Plot | null>(null);
