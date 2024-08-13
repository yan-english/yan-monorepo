export type AggregateID = string;

export abstract class Entity<ID> {

  protected id: ID;

  public getId(): ID {
    return this.id;
  }

  public setId(id: ID): void {
    this.id = id;
  }

}
