
import { allExercises } from '../src/data/exercises';
import { getExerciseCode } from '../src/data/exercises';

const allCodes = allExercises.map(getExerciseCode);

const codeCounts = allCodes.reduce((acc, code) => {
  acc[code] = (acc[code] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const duplicates = Object.entries(codeCounts).filter(([, count]) => count > 1);

if (duplicates.length > 0) {
  console.log('Duplicate exercise codes found:');
  for (const [code, count] of duplicates) {
    console.log(`- Code "${code}" appears ${count} times.`);
    const exercisesWithCode = allExercises.filter(
      (exercise) => getExerciseCode(exercise) === code
    );
    for (const exercise of exercisesWithCode) {
      console.log(`  - "${exercise.name}" (id: ${exercise.id})`);
    }
  }
} else {
  console.log('All exercise codes are unique.');
}
