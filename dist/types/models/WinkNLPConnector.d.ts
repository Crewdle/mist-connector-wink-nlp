import { INLPEntityTypes, INLPLibraryConnector } from '@crewdle/web-sdk-types';
export declare class WinkNLPConnector implements INLPLibraryConnector {
    private nlp;
    constructor();
    getSentences(text: string): Promise<string[]>;
    getEntities(text: string, types: INLPEntityTypes): Promise<string[]>;
    getSimilarity(text1: string, text2: string): Promise<number>;
    private pluralToSingular;
}
