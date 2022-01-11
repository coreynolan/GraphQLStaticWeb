<template>
  <div class="hello">
    <v-dialog />
    <h1>Quotes</h1>
    <hr />
    <div v-for="q of listQuotes" :key="q.id" @click="confirmDelete(q)">
      <p>{{ q.text }}</p>
      <p>
        - <em>{{ q.source }}</em>
      </p>
      <hr />
    </div>
    <CreateQuote />
  </div>
</template>
 
<script lang="ts">
import GQL from "@/graphql/quotes";
import { Quote } from "@/types/quote";
import Vue from "vue";
import CreateQuote from "./CreateQuote.vue";
export default Vue.extend({
  name: "Quotes",
  components: {
    CreateQuote,
  },
  apollo: {
    listQuotes: {
      query: GQL.QUERY.LIST_QUOTES,
    },
  },
  methods: {
    confirmDelete(quote: Quote) {
      this.$modal.show("dialog", {
        title: "Delete this quote?",
        text: "Please confirm or cancel deletion of this quote.",
        buttons: [
          {
            title: "Cancel",
            handler: () => this.$modal.hide("dialog"),
          },
          {
            title: "Delete",
            handler: async () => {
              this.$modal.hide("dialog");
              await this.deleteQuote(quote);
            },
          },
        ],
      });
    },
    async deleteQuote({ id }: Quote) {
      console.log(`deleteQuote(${id})`);
      await this.$apollo.mutate({
        mutation: GQL.MUTATION.DELETE_QUOTE,
        variables: { id },
        refetchQueries: [{ query: GQL.QUERY.LIST_QUOTES }],
      });
    },
  },
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
