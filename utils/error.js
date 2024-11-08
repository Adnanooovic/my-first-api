export class NotFoundError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name =  'NotFoundError';

    }
}

export class NotauthorizedError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name =  'NotAuthorizedError';

    }
}