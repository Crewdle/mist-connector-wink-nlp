import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
export class WinkNLPConnector {
    nlp;
    constructor() {
        this.nlp = winkNLP(model);
    }
    async splitText(text) {
        const doc = this.nlp.readDoc(text);
        return doc.sentences().out();
    }
}
