import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ConversationDocument } from './chat.schema';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly chatService: ChatService) {}

  @Get('user/:userId')
  async getConversationsByUserId(
    @Param('userId') userId: string,
  ): Promise<ConversationDocument[]> {
    return this.chatService.getConversationsByUserId(userId);
  }

  @Get(':conversationId/messages')
  async getMessagesByConversationId(
    @Param('conversationId') conversationId: string,
  ) {
    return this.chatService.getMessagesByConversationId(conversationId);
  }
}
