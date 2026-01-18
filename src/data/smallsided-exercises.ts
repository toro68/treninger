/**
 * Smålagsspill-øvelser (samlefil).
 *
 * Denne fila er kun en aggregator for smålagsspill som ligger i separate filer per
 * kilde (for å gjøre det enklere å supplere/vedlikeholde).
 */

import type { ExerciseData } from './exercises';
import { prickettExercises } from './prickett-exercises';

// Kombiner alle smålagsspill-øvelser
export const smallsidedExercises: ExerciseData[] = [
  ...prickettExercises,
];
