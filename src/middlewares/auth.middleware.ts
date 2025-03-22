import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // const token = req.headers.authorization;
    // try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    //   if(!decoded) {
    //     throw new Error()
    //   }
    //   req.user = decoded
  
    // } catch (error) {
    //   throw new UnauthorizedException()
      
    // }
    next();
  }
}
