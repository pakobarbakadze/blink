import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class GenericRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  public create(item: DeepPartial<T>): T {
    return this.repository.create(item);
  }

  public save(item: T): Promise<T> {
    return this.repository.save(item);
  }

  public findOne(conditions: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(conditions);
  }

  public findAll(conditions?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(conditions);
  }

  public findAndCount(
    conditions?: FindManyOptions<T>,
  ): Promise<[T[], count: number]> {
    return this.repository.findAndCount(conditions);
  }

  public update(
    id: number,
    item: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.repository.update(id, item);
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
