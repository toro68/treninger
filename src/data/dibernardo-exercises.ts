import type { ExerciseData } from './exercises';
import { dibernardoImageById } from './dibernardo-image-map';
import { baseRondoExercises, RONDO_DIBERNARDO_TAG } from './rondo-exercises';

export const dibernardoExercises: ExerciseData[] = baseRondoExercises
  .filter((exercise) => exercise.tags?.includes(RONDO_DIBERNARDO_TAG))
  .map((exercise): ExerciseData => ({
    ...exercise,
    category: 'rondo',
    imageUrl: exercise.imageUrl ?? dibernardoImageById[exercise.id],
  }));

export const dibernardoExerciseCount = dibernardoExercises.length;