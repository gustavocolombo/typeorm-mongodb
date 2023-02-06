import { DeleteResult } from 'typeorm';

export class DeleteSerializer implements DeleteResult {
  raw: any;
  affected?: number;
}
