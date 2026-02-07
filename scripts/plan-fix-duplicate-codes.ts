
import { allExercises } from '../src/data/exercises';
import { dbuExercises } from '../src/data/dbu-exercises';
import { rondoExercises } from '../src/data/rondo-exercises';
import { hyballaExercises } from '../src/data/hyballa-exercises';
import { bangsboExercises } from '../src/data/bangsbo-exercises';
import { duggerExercises } from '../src/data/dugger-exercises';
import { smallsidedExercises } from '../src/data/smallsided-exercises';
import { tiimExercises } from '../src/data/tiim-exercises';
import { exercises } from '../src/data/exercises';

const allExerciseArrays = {
  'dbu-exercises.ts': dbuExercises,
  'rondo-exercises.ts': rondoExercises,
  'hyballa-exercises.ts': hyballaExercises,
  'bangsbo-exercises.ts': bangsboExercises,
  'dugger-exercises.ts': duggerExercises,
  'smallsided-exercises.ts': smallsidedExercises,
  'tiim-exercises.ts': tiimExercises,
  'exercises.ts': exercises
};

const allExercisesWithSource = Object.entries(allExerciseArrays).flatMap(([sourceFile, exercises]) => 
  exercises.map(exercise => ({ ...exercise, sourceFile }))
);

const exercisesByCategory = allExercisesWithSource.reduce((acc, exercise) => {
  const category = exercise.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(exercise);
  return acc;
}, {} as Record<string, typeof allExercisesWithSource>);

const renumberedExercises: any[] = [];

for (const category in exercisesByCategory) {
  const sortedExercises = exercisesByCategory[category].sort((a, b) => a.id.localeCompare(b.id));
  sortedExercises.forEach((exercise, index) => {
    const newExerciseNumber = index + 1;
    if (exercise.exerciseNumber !== newExerciseNumber) {
      console.log(`- CHANGE: "${exercise.name}" (id: ${exercise.id}, file: ${exercise.sourceFile})
`);
      console.log(`  - exerciseNumber: ${exercise.exerciseNumber} -> ${newExerciseNumber}
`);
    }
    renumberedExercises.push({
      ...exercise,
      exerciseNumber: newExerciseNumber,
    });
  });
}

console.log('\nPlan complete. The above changes would be made by a script.');
console.log('If you approve, I will create a script that applies these changes.');
