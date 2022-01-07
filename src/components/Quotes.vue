<template>
  <div class="hello">
    <v-dialog />
    <h1>Quotes</h1>
    <hr />
    <div v-for="q of quotes" :key="q.id" @click="confirmDelete(q)">
      <p>{{ q.text }}</p>
      <p>
        - <em>{{ q.source }}</em>
      </p>
      <hr />
    </div>
    <CreateQuote :addFunc="addQuote"/>
  </div>
</template>

<script lang="ts">
import { Quote } from '@/types/quote';
import Vue from 'vue';
import CreateQuote from './CreateQuote.vue';

export default Vue.extend({
  name: 'Quotes',
  components: {
    CreateQuote
  },
  data: () => ({
    quotes: [] as Quote[]
  }),
  methods: {
    confirmDelete(quote: Quote) {
      this.$modal.show('dialog', {
        title: 'Delete this quote?',
        text: 'Please confirm or cancel deletion of this quote.',
        buttons: [
          {
            title: 'Cancel',
            handler: () => this.$modal.hide('dialog')
          },
          {
            title: 'Delete',
            handler: async () => {
              this.$modal.hide('dialog');
              this.deleteQuote(quote);
            }
          }
        ]
      });
    },
    deleteQuote(quote: Quote) {
      Vue.set(this, 'quotes', this.quotes.filter(q => q.id !== quote.id));
    },
    addQuote(quote: Quote) {
      quote.id = Date.now();
      this.quotes.push(quote);
    }
  },
  watch: {
    quotes() {
      localStorage.setItem('quotes', JSON.stringify(this.quotes));
    }
  },
  created() {
    const cachedQuotes = localStorage.getItem('quotes');
    if (cachedQuotes) {
      Vue.set(this, 'quotes', JSON.parse(cachedQuotes));
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
