import { Module } from '@nestjs/common';
import { ConversationController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ConversationSchema, MessageSchema } from './chat.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Conversation', schema: ConversationSchema },
      { name: 'Message', schema: MessageSchema },
    ]),
  ],
  controllers: [ConversationController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
