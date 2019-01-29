export interface Provider {
    useFactory: (...any: any[]) => any,
    inject?: Array<String>
} 