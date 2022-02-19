import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUser() {
    return 'hello' + Object.keys(process.env).join(', ');
  }
}
