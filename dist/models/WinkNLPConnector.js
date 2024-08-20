import winkNLP from 'wink-nlp';
import similarity from 'wink-nlp/utilities/similarity';
import model from 'wink-eng-lite-web-model';
export class WinkNLPConnector {
    nlp;
    constructor() {
        this.nlp = winkNLP(model);
    }
    async getSentences(text) {
        const doc = this.nlp.readDoc(text);
        return doc.sentences().out();
    }
    async getEntities(text, types) {
        let entities = new Set();
        try {
            const doc = this.nlp.readDoc(text);
            if (types.ner) {
                const newEntities = doc.entities().out(this.nlp.its.normal);
                for (const entity of newEntities) {
                    entities.add(entity);
                }
            }
            const words = doc.tokens().out(this.nlp.its.normal);
            const pos = doc.tokens().out(this.nlp.its.pos);
            const newEntities = words.filter((word, index) => {
                if (types.noun && pos[index] === 'noun') {
                    return true;
                }
                if (types.propn && pos[index] === 'propn') {
                    return true;
                }
                if (types.verb && pos[index] === 'verb') {
                    return true;
                }
                return false;
            });
            for (const entity of newEntities) {
                entities.add(entity);
            }
        }
        catch (e) {
            console.error(e);
        }
        return Array.from(entities);
    }
    async getSimilarity(text1, text2) {
        const its = this.nlp.its;
        const as = this.nlp.as;
        const doc1 = this.nlp.readDoc(text1);
        const bow1 = doc1.tokens().out(its.value, as.bow);
        const doc2 = this.nlp.readDoc(text2);
        const bow2 = doc2.tokens().out(its.value, as.bow);
        return similarity.bow.cosine(bow1, bow2);
    }
}
