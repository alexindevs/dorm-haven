import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, conversationId: string) {
    client.join(conversationId);
    console.log(`Client ${client.id} joined room ${conversationId}`);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket, conversationId: string) {
    client.leave(conversationId);
    console.log(`Client ${client.id} left room ${conversationId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, data: any) {
    const { conversationId, sender, content, images } = data;
    const message = await this.chatService.sendMessage(
      conversationId,
      sender,
      content,
      images,
    );
    this.server.to(conversationId).emit('newMessage', message);
  }

  @SubscribeMessage('markAsSeen')
  async handleMarkAsSeen(client: Socket, data: any) {
    const { conversationId, sender } = data;
    await this.chatService.markAsSeen(conversationId, sender);
    this.server
      .to(conversationId)
      .emit('markedAsSeen', { conversationId, sender });
  }

  @SubscribeMessage('deleteConversation')
  async handleDeleteConversation(client: Socket, conversationId: string) {
    await this.chatService.deleteConversation(conversationId);
    this.server.to(conversationId).emit('conversationDeleted', conversationId);
  }
}
