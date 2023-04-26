import { StateEntity } from '../entitites/state.entity';

export class ReturnStateDto {
  name: string;
  uf: string;

  constructor(state: StateEntity) {
    this.name = state.name;
    this.uf = state.uf;
  }
}
