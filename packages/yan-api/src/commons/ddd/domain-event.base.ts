import { randomUUID } from 'crypto';
import { RequestContextService } from '../application/context/AppRequestContext';

type DomainEventMetadata = {
  /** Timestamp when this domain event occurred */
  readonly timestamp: number;

  /** ID for correlation purposes (for Integration Events,logs correlation, etc).
   */
  readonly correlationId: string;

  /**
   * Causation id used to reconstruct execution order if needed
   */
  readonly causationId?: string;

  /**
   * UserEntity ID for debugging and logging purposes
   */
  readonly userId?: string;
};

export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
  aggregateId: string;
  metadata?: DomainEventMetadata;
};

export abstract class DomainEvent {
  public readonly id: string;

  /** Aggregate ID where domain event occurred */
  public readonly aggregateId: string;

  public readonly metadata: DomainEventMetadata;

  protected constructor(props: DomainEventProps<unknown>) {
    this.id = randomUUID();
    this.aggregateId = props.aggregateId;
    this.metadata = {
      correlationId:
        props?.metadata?.correlationId || RequestContextService.getRequestId(),
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId,
    };
  }
}
