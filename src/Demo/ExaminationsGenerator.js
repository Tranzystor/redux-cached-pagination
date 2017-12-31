class ExaminationsSource {
  constructor(name) {
    this.generateExaminations();
    this._counter = 0;
  }

  generateExaminations() {
    const initialCount = 800;
    this._examinations = [];
    for (let i = 0; i < initialCount; i++) {
      this._examinations.push(this.createExamination(i));
    }
  }

  createExamination(index) {
    return {
      examData: this.generateId(6),
      examIndexAtAll: index,
      id: index + 100000
    };
  }

  getExaminationsPage(pageNum, pageLength, phrase) {
    const pageFromZero = pageNum - 1;
    let elementsWithPhrase = this._examinations;
    if (phrase !== undefined && phrase !== null) {
      elementsWithPhrase = this._examinations.filter(e => e.examData.toLowerCase().includes(phrase.toLowerCase()));
    }

    const elementsWithPhraseCount = elementsWithPhrase.length;
    const pageElements = elementsWithPhrase.slice(pageFromZero * pageLength, pageFromZero * pageLength + pageLength);

    console.log('counter: ' + this._counter);
    this._counter++;
    if(this._counter === 3){
      console.log('zmieniony counter');
      const modified = elementsWithPhraseCount -1;
      return {
        totalElements: modified,
        elements: pageElements
      };
    }

    return {
      totalElements: elementsWithPhraseCount,
      elements: pageElements
    };
  }

  updateEntity(entityId, data) {
    let toUpdate = this._examinations.find(e => e.id === entityId);
    toUpdate.examData = data;
    return toUpdate;
  }

  generateId(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}

const provider = new ExaminationsSource();
export { provider };
