import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserPreferencesDocument = HydratedDocument<UserPreferences>;

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
  ROOM_Parlor = 'Room and Parlor',
  TWO_BEDROOM = 'Two Bedroom',
  THREE_BEDROOM = 'Three Bedroom',
  FULL_APARTMENT = 'Multiple Rooms',
}

@Schema()
export class UserPreferences {
  @Prop({
    required: true,
    ref: 'Account',
    type: mongoose.Schema.Types.ObjectId,
  })
  user_id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
  })
  location: string;

  @Prop({
    required: true,
  })
  school: string;

  @Prop({
    required: true,
    type: {
      frequency: studyHabitsFrequency,
      hours: Number,
    },
  })
  study_habits: {
    frequency: studyHabitsFrequency;
    hours: number;
  };

  @Prop({
    required: true,
    type: {
      smoking: Boolean,
      alcohol: Boolean,
      pets: Boolean,
      noise_tolerance: noiseTolerance,
    },
  })
  lifestyle_habits: {
    smoking: boolean;
    alcohol: boolean;
    pets: boolean;
    noise_tolerance: noiseTolerance;
  };

  @Prop({
    required: true,
    type: {
      gender: String,
      age: [Number],
      personality_traits: [PersonalityTraits],
      interests: [String],
    },
  })
  personal_preferences: {
    gender: string;
    age: number[];
    preferred_personality_traits: PersonalityTraits[];
    my_personality_traits: PersonalityTraits[];
    interests: string[];
  };

  @Prop({
    required: true,
    type: {
      room_type: roomType,
      budget_annually_naira: Number,
      furnished: Boolean,
    },
  })
  room_preferences: {
    room_type: roomType;
    budget_annually_naira: number;
    furnished: boolean;
  };
}

export const UserPreferencesSchema =
  SchemaFactory.createForClass(UserPreferences);
