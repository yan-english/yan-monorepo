import {RequestContextService} from "../application/context/AppRequestContext";

export abstract class ExceptionBase extends Error {
    abstract code: string;

    public readonly correlationId: string;

    protected constructor(
        readonly message: string,
        readonly cause?: Error,
        readonly metadata?: unknown,
    ) {
        super(message);
        this.cause = cause;
        const ctx = RequestContextService.getContext();
        this.correlationId = ctx.requestId;
    }
}