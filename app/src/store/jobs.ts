import { atom } from 'jotai';
import { Job } from '../globalTypes';

export const jobsAtom = atom<Job[]>([]);
export const jobSelectedAtom = atom<Job | null>(null);
