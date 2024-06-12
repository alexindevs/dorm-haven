import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Conversation,
  ConversationDocument,
  Message,
  MessageDocument,
} from './chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createConversation(
    participants: string[],
  ): Promise<ConversationDocument> {
    const conversation = new this.conversationModel({ participants });
    return conversation.save();
  }

  async getConversationsByUserId(
    userId: string,
  ): Promise<ConversationDocument[]> {
    return this.conversationModel.find({ participants: userId }).exec();
  }

  async getMessagesByConversationId(
    conversationId: string,
  ): Promise<Message[]> {
    return this.messageModel.find({ conversationId }).exec();
  }

  async sendMessage(
    conversationId: string,
    sender: string,
    content: string,
    images: string[],
  ): Promise<Message> {
    const message = new this.messageModel({
      conversationId,
      sender,
      content,
      images,
      seen: false,
    });
    return message.save();
  }

  async markAsSeen(conversationId: string, sender: string): Promise<void> {
    await this.messageModel.updateMany(
      { conversationId, sender, seen: false },
      { seen: true },
    );
  }

  async deleteConversation(conversationId: string): Promise<void> {
    await this.messageModel.deleteMany({ conversationId });
    await this.conversationModel.deleteOne({ _id: conversationId });
  }
}
