import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;
export type MessageDocument = Message & Document;

@Schema()
export class Conversation {
  @Prop({ required: true })
  participants: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

@Schema()
export class Message {
  @Prop({ required: true })
  conversationId: string; // ID of the conversation to which the message belongs

  @Prop({ required: true })
  sender: string; // ID of the user sending the message

  @Prop({ required: true })
  content: string;

  @Prop({ default: [], required: false })
  images: string[];

  @Prop({ default: false, required: true })
  seen: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
export const MessageSchema = SchemaFactory.createForClass(Message);
