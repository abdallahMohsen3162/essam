import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmailPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("value", value);
    console.log("metadata", metadata);
    
    return value;
  }
}
