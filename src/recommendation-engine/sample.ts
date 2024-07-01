interface IPersonalPreference {
  gender: string;
  age: number[];
  personality_traits: PersonalityTraits[];
  interests: string[];
}

interface ILifestyleHabits {
  smoking: boolean;
  alcohol: boolean;
  pets: boolean;
  noise_tolerance: string;
}

interface IData {
  studyHabitsFrequency: string;
  noiseTolerance: string;
  roomType: string;
  personalPreference: IPersonalPreference;
  lifestyleHabits: ILifestyleHabits;
}

enum studyHabitsFrequency {
  NEVER = 'never',
  REGULAR = 'regular',
  FREQUENT = 'frequent',
  MODERATE = 'moderate',
}

enum noiseTolerance {
  QUIET = 'quiet',
  MODERATE = 'moderate',
  LOUD = 'loud',
}

enum PersonalityTraits {
  OUTGOING = 'outgoing',
  FRIENDLY = 'friendly',
  INTROVERTED = 'introverted',
  KIND = 'kind',
  AMBITIOUS = 'ambitious',
  ADVENTUROUS = 'adventurous',
  CREATIVE = 'creative',
  DISCIPLINED = 'disciplined',
  OPTIMISTIC = 'optimistic',
  PESSIMISTIC = 'pessimistic',
  HUMOROUS = 'humorous',
  SERIOUS = 'serious',
  COMPASSIONATE = 'compassionate',
  EMPATHETIC = 'empathetic',
  PATIENT = 'patient',
  IMPULSIVE = 'impulsive',
  RESOURCEFUL = 'resourceful',
  ENTHUSIASTIC = 'enthusiastic',
  DILIGENT = 'diligent',
  RELIABLE = 'reliable',
  CHARISMATIC = 'charismatic',
  ANALYTICAL = 'analytical',
  ASSERTIVE = 'assertive',
  FLEXIBLE = 'flexible',
  HONEST = 'honest',
  LOYAL = 'loyal',
  INNOVATIVE = 'innovative',
  PRAGMATIC = 'pragmatic',
  SELF_DISCIPLINED = 'self-disciplined',
  SOCIABLE = 'sociable',
  TOLERANT = 'tolerant',
}

enum roomType {
  SELF_CON = 'Self Contained Apartment',
  ROOM_PARLOR = 'Room and Parlor',
  TWO_BEDROOM = 'Two Bedroom',
  THREE_BEDROOM = 'Three Bedroom',
  FULL_APARTMENT = 'Multiple Rooms',
}

const matchingAlgo = (userDataOne: IData, userDataTwo: IData): number => {
  let score = 0;
  const weights = {
    studyHabitsFrequency: 1,
    noiseTolerance: 2,
    roomType: 1,
    gender: 1,
    age: 2,
    interests: 2,
    smoking: 1,
    alcohol: 1,
    pets: 1,
    noise_tolerance: 2,
  };

  const calculateSimilarity = (
    value1: any,
    value2: any,
    weight: number,
  ): number => (value1 === value2 ? weight : 0);

  // Attributes Comparison
  score += calculateSimilarity(
    userDataOne.studyHabitsFrequency,
    userDataTwo.studyHabitsFrequency,
    weights.studyHabitsFrequency,
  );

  score += calculateSimilarity(
    userDataOne.noiseTolerance,
    userDataTwo.noiseTolerance,
    weights.noiseTolerance,
  );

  score += calculateSimilarity(
    userDataOne.roomType,
    userDataTwo.roomType,
    weights.roomType,
  );

  score += calculateSimilarity(
    userDataOne.personalPreference.gender,
    userDataTwo.personalPreference.gender,
    weights.gender,
  );

  // Age
  const ageSetOne = new Set(userDataOne.personalPreference.age);
  const ageSetTwo = new Set(userDataTwo.personalPreference.age);
  const ageIntersection = [...ageSetOne].filter((age) =>
    ageSetTwo.has(age),
  ).length;
  score +=
    (ageIntersection / Math.max(ageSetOne.size, ageSetTwo.size)) * weights.age;

  // Interests
  const interestSetOne = new Set(userDataOne.personalPreference.interests);
  const interestSetTwo = new Set(userDataTwo.personalPreference.interests);
  const interestsIntersection = [...interestSetOne].filter((interest) =>
    interestSetTwo.has(interest),
  ).length;
  score +=
    (interestsIntersection /
      Math.max(interestSetOne.size, interestSetTwo.size)) *
    weights.interests;

  // Lifestyle habits comparison
  ['smoking', 'alcohol', 'pets', 'noise_tolerance'].forEach((habit) => {
    score += calculateSimilarity(
      userDataOne.lifestyleHabits[habit],
      userDataTwo.lifestyleHabits[habit],
      weights[habit],
    );
  });

  // Normalize score to a percentage
  const maxScore = Object.values(weights).reduce((acc, val) => acc + val, 0);
  return (score / maxScore) * 100;
};

// Example usage
const userDataOne: IData = {
  studyHabitsFrequency: studyHabitsFrequency.REGULAR,
  noiseTolerance: noiseTolerance.MODERATE,
  roomType: roomType.TWO_BEDROOM,
  personalPreference: {
    gender: 'female',
    age: [20, 21, 22],
    personality_traits: [
      PersonalityTraits.FRIENDLY,
      PersonalityTraits.OUTGOING,
    ],
    interests: ['music', 'sports', 'clubbing'],
  },
  lifestyleHabits: {
    smoking: false,
    alcohol: true,
    pets: true,
    noise_tolerance: noiseTolerance.MODERATE,
  },
};

const userDataTwo: IData = {
  studyHabitsFrequency: studyHabitsFrequency.REGULAR,
  noiseTolerance: noiseTolerance.QUIET,
  roomType: roomType.THREE_BEDROOM,
  personalPreference: {
    gender: 'female',
    age: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    personality_traits: [
      PersonalityTraits.INTROVERTED,
      PersonalityTraits.OUTGOING,
      PersonalityTraits.ENTHUSIASTIC,
      PersonalityTraits.CREATIVE,
    ],
    interests: ['reading'],
  },
  lifestyleHabits: {
    smoking: false,
    alcohol: true,
    pets: false,
    noise_tolerance: noiseTolerance.QUIET,
  },
};

const compatibilityScore = matchingAlgo(userDataOne, userDataTwo);
console.log('Compatibility Score:', compatibilityScore);
