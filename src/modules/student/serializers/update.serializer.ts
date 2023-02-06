import { ObjectLiteral, UpdateResult } from 'typeorm';

export class UpdateSerializer implements UpdateResult {
  raw: any;
  affected?: number;
  generatedMaps: ObjectLiteral[];
}
