import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { UserPreferencesService } from './user-preferences/user-preferences.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/dorm-haven'),
    AuthenticationModule,
    ProfileModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserPreferencesService],
})
export class AppModule {}
