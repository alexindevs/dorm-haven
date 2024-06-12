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
      personality_traits: [String],
      interests: [String],
    },
  })
  personal_preferences: {
    gender: string;
    age: number[];
    personality_traits: string[];
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
