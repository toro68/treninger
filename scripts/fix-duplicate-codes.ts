import { allExercises, exercises } from '../src/data/exercises';
import { dbuExercises } from '../src/data/dbu-exercises';
import { rondoExercises } from '../src/data/rondo-exercises';
import { hyballaExercises } from '../src/data/hyballa-exercises';
import { bangsboExercises } from '../src/data/bangsbo-exercises';
import { duggerExercises } from '../src/data/dugger-exercises';
import { smallsidedExercises } from '../src/data/smallsided-exercises';
import { tiimExercises } from '../src/data/tiim-converted';
import * as fs from 'fs';

// Define the structure of an exercise, assuming it has these properties.
interface Exercise {
  id: string;
  exerciseNumber: number;
  category: string;
  sourceFile: string;
  [key: string]: any;
}

const allExerciseArrays: { [key: string]: any[] } = {
  'src/data/dbu-exercises.ts': dbuExercises,
  'src/data/rondo-exercises.ts': rondoExercises,
  'src/data/hyballa-exercises.ts': hyballaExercises,
  'src/data/bangsbo-exercises.ts': bangsboExercises,
  'src/data/dugger-exercises.ts': duggerExercises,
  'src/data/smallsided-exercises.ts': smallsidedExercises,
  'src/data/tiim-converted.ts': tiimExercises,
  'src/data/exercises.ts': exercises,
};

const allExercisesWithSource: Exercise[] = Object.entries(allExerciseArrays).flatMap(([sourceFile, exercises]) =>
  exercises.map(exercise => ({ ...exercise, sourceFile }))
);

const exercisesByCategory: { [key: string]: Exercise[] } = {};
for (const exercise of allExercisesWithSource) {
  if (!exercisesByCategory[exercise.category]) {
    exercisesByCategory[exercise.category] = [];
  }
  exercisesByCategory[exercise.category].push(exercise);
}

const changesByFile: { [key: string]: { oldNumber: number, newNumber: number, id: string }[] } = {};

for (const category in exercisesByCategory) {
  const sortedExercises = exercisesByCategory[category].sort((a, b) => {
    return a.id.localeCompare(b.id);
  });

  sortedExercises.forEach((exercise, index) => {
    const newExerciseNumber = index + 1;
    if (exercise.exerciseNumber !== newExerciseNumber) {
      if (!changesByFile[exercise.sourceFile]) {
        changesByFile[exercise.sourceFile] = [];
      }
      changesByFile[exercise.sourceFile].push({
        id: exercise.id,
        oldNumber: exercise.exerciseNumber,
        newNumber: newExerciseNumber,
      });
    }
  });
}

for (const file in changesByFile) {
  let content = fs.readFileSync(file, 'utf-8');
  for (const change of changesByFile[file]) {
    // This is a bit brittle, but should work for the current format.
    // It looks for the id and exerciseNumber on consecutive lines.
    const oldString = `"id": "${change.id}",\n    "exerciseNumber": ${change.oldNumber}`;
    const newString = `"id": "${change.id}",\n    "exerciseNumber": ${change.newNumber}`;
    const regex = new RegExp(`"id": "${change.id}",\s*"exerciseNumber": ${change.oldNumber}`);
    if (content.match(regex)) {
        content = content.replace(regex, `"id": "${change.id}",\n    "exerciseNumber": ${change.newNumber}`);
    } else {
        // Fallback for tiim-converted.ts where the structure is a bit different
        const oldTiim = `"id": "${change.id}",\n    "exerciseNumber": ${change.oldNumber},`;
        const newTiim = `"id": "${change.id}",\n    "exerciseNumber": ${change.newNumber},`;
        content = content.replace(oldTiim, newTiim);
    }
  }
  fs.writeFileSync(file, content);
  console.log(`- Updated ${changesByFile[file].length} exercises in ${file}`);
}

console.log('\nAll files have been updated.');