// eslint-disable-next-line max-classes-per-file
export class HttpGetError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HttpGetError';
    }
}

export class HttpPostError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HttpPostError';
    }
}

export class IdbWriteError extends Error {
    constructor(message) {
        super(message);
        this.name = 'IdbWriteError';
    }
}

export class IdbGetError extends Error {
    constructor(message) {
        super(message);
        this.name = 'IdbGetError';
    }
}
