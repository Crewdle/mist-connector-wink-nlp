import { INLPLibraryConnector } from '@crewdle/web-sdk-types';
export declare class WinkNLPConnector implements INLPLibraryConnector {
    private nlp;
    constructor();
    getSentences(text: string): Promise<string[]>;
    getEntities(text: string): Promise<string[]>;
}
