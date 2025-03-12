import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ImageGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const token = headers?.authorization;
    console.log(token, "token");
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        request.user = decoded; 
        
      } catch (error) {
        console.log(error);
        return false; 
      }
    } else {
      return false; 
    }

    return true;
  }
}