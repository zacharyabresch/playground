import deepCopy from 'lms/deep-copy';

export default Ember.Component.extend({
  columnLimit: 4,
  limitMsg: null,
  rows: function() {
    const table = this.get('question.table');

    if (table) {
      return table.rows.length;
    } else {
      return 0;
    }
  }.property('question.table'),

  columns: function() {
    const table = this.get('question.table');

    if (table) {
      return table.headers.length;
    } else {
      return 0;
    }
  }.property('question.table'),

  setMsg: function() {
    if (this.get('columns') > this.get('columnLimit')) {
      return this.set('limitMsg', `Sorry, cannot exceed ${this.get('columnLimit')} columns`);
    } else {
      return this.set('limitMsg', '');
    }
  }.observes('columns'),

  actions: {
    plus(item) {
      if (item === 'columns' && this.get(item) >= this.get('columnLimit')) {
        this.set('limitMsg', `Sorry, cannot exceed ${this.get('columnLimit')} columns`);
      } else {
        this.set(item, this.get(item) + 1);
      }
    },
    minus(item) {
      if (this.get(item) <= 1) {
        return;
      }
      if (item === 'columns' && this.get(item) <= this.get('columnLimit')) {
        this.set('limitMsg', null);
      }

      this.set(item, this.get(item) - 1);
    },
    applyTable() {
      const rows = this.get('rows');

      const columns = this.get('columns');

      if (columns > this.get('columnLimit')) {
        return;
      }
      const table = this.get('question.table');

      const cell = {
        value: '',
        locked: false
      };
      const newTable = {
        headers: [],
        rows: []
      };

      for (let i = 0; i < columns; i++) {
        if (table.headers[i]) {
          newTable.headers.push(table.headers[i]);
        } else {
          newTable.headers.push(cell);
        }
      }

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (!newTable.rows[i]) {
            newTable.rows.push([]);
          }
          if (table.rows[i] && table.rows[i][j]) {
            newTable.rows[i].push(table.rows[i][j]);
          } else {
            newTable.rows[i].push(cell);
          }
        }
      }

      this.set('question.table', deepCopy(newTable));
    },
    save() {
      this.set('question.questionTable', this.get('questionTable'));
    }
  }
});
