export class HttpGetError extends Error {
    constructor(message) {
        super(message);
        this.name = "HttpGetError";
    }
}

export class HttpPostError extends Error {
    constructor(message) {
        super(message);
        this.name = "HttpGetError";
    }
}