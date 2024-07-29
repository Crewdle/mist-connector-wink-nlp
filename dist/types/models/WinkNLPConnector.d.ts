import { INLPLibraryConnector } from '@crewdle/web-sdk-types';
export declare class WinkNLPConnector implements INLPLibraryConnector {
    private nlp;
    constructor();
    splitText(text: string): Promise<string[]>;
}
