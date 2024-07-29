import winkNLP, { WinkMethods } from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

import { INLPLibraryConnector } from '@crewdle/web-sdk-types';

export class WinkNLPConnector implements INLPLibraryConnector {
  private nlp: WinkMethods;

  constructor() {
    this.nlp = winkNLP(model);
  }

  async splitText(text: string): Promise<string[]> {
    const doc = this.nlp.readDoc(text);
    return doc.sentences().out();
  }
}
