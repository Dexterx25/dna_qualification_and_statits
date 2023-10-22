export abstract class IAbstractRepository<T> {
    abstract getAll(): Promise<T[]>;
  
    abstract findById(id: string): Promise<T|null>;
  
    abstract findByCondition(condition: any):Promise<T|null>

    abstract create(item: T): Promise<T>;
  
    abstract update(id: string, item: T);
  }