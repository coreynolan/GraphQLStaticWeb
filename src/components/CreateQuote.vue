<template>
  <div class="add-form">
    <div class="form-input">
      <div>
        <label for="quote-input">Quote Text</label>
      </div>
      <div>
        <textarea id="quote-input" v-model="text" />
      </div>
    </div>
    <div class="form-input">
      <div>
        <label for="source-input">Author or Source</label>
      </div>
      <div>
        <input id="source-input" v-model="source" />
      </div>
    </div>
    <div class="form-input">
      <button @click="submitForm" :disabled="!source || !text">
        Add Quote
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { GQL } from "@/graphql/quotes";
export default Vue.extend({
  name: "CreateQuote",
  data: () => ({
    source: "",
    text: "",
  }),
  methods: {
    async submitForm() {
      console.log("submitForm()");
      const res = await this.$apollo.mutate({
        mutation: GQL.MUTATION.CREATE_QUOTE,
        variables: {
          input: {
            source: this.source,
            text: this.text,
          },
        },
        refetchQueries: [{ query: GQL.QUERY.LIST_QUOTES }],
      });
      console.log(res);
      this.source = "";
      this.text = "";
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-form {
  margin: 30px auto;
  padding: 15px;
  background-color: rgb(221, 219, 219);
  max-width: 400px;
  border-radius: 10px;
}
.form-input {
  margin: 10px;
}
input {
  width: 250px;
  height: 20px;
}
textarea {
  width: 250px;
  height: 80px;
}
button {
  background-color: steelblue;
  border-radius: 5px;
  padding: 8px 20px;
  border: none;
  color: whitesmoke;
}
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
