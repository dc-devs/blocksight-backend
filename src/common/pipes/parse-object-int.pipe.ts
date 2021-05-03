import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseObjectInt implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		console.log('-- value', value);
		console.log('-- metadata', metadata.metatype);
		return value;
	}
}
