import winkNLP, { Bow, WinkMethods } from 'wink-nlp';
import similarity from 'wink-nlp/utilities/similarity';
import model from 'wink-eng-lite-web-model';

import { INLPEntityTypes, INLPLibraryConnector } from '@crewdle/web-sdk-types';

export class WinkNLPConnector implements INLPLibraryConnector {
  private nlp: WinkMethods;

  constructor() {
    this.nlp = winkNLP(model);
  }

  async getSentences(text: string): Promise<string[]> {
    const doc = this.nlp.readDoc(text);
    return doc.sentences().out();
  }

  async getEntities(text: string, types: INLPEntityTypes): Promise<string[]> {
    let entities: Set<string> = new Set();
    try {
      const doc = this.nlp.readDoc(text);
      if (types.ner) {
        const newEntities = doc.entities().out(this.nlp.its.value);
        for (const entity of newEntities) {
          const singular = this.pluralToSingular(entity);
          if (typeof singular === 'string' && singular.length > 2) {
            entities.add(singular);
          }
        }
      }
      const words = doc.tokens().out(this.nlp.its.normal);
      const pos = doc.tokens().out(this.nlp.its.pos);
      const newEntities = words.filter((word: string, index: number) => {
        if (types.noun && pos[index] === 'NOUN') {
          return true;
        }
        if (types.propn && pos[index] === 'PROPN') {
          return true;
        }
        if (types.verb && pos[index] === 'VERB') {
          return true;
        }
        return false
      });
      for (const entity of newEntities) {
        const singular = this.pluralToSingular(entity);
          if (typeof singular === 'string' && singular.length > 2) {
            entities.add(singular);
          }
      }
    } catch (e) {
      console.error(e);
    }

    return Array.from(entities);
  }

  async getSimilarity(text1: string, text2: string): Promise<number> {
    const its = this.nlp.its;
    const as = this.nlp.as;

    const doc1 = this.nlp.readDoc(text1);
    const bow1 = doc1.tokens().out(its.value, as.bow) as Bow;

    const doc2 = this.nlp.readDoc(text2);
    const bow2 = doc2.tokens().out(its.value, as.bow) as Bow;

    return similarity.bow.cosine(bow1, bow2);
  }

  private pluralToSingular(input: string): string {
    return input
      .replace(/ies\b/g, 'y')              // Convert words ending in "ies" to "y"
      .replace(/([ox]|ch|sh)es\b/g, '$1')  // Convert words ending in "oes", "ches", "shes" to "o", "ch", "sh"
      .replace(/s\b/g, '');                // Remove trailing "s" for simple plurals
  }
}
