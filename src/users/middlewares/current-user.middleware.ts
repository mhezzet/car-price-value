import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: any, res: any, next: () => void) {
    const userId = req.session?.userId;

    if (userId) {
      try {
        const user = await this.userService.findOne(userId);

        req.currentUser = user;
      } catch (error) {}
    }

    next();
  }
}
