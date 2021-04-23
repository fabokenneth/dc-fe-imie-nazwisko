<template>
  <div class="bg-red-900">
    <img alt="Vue logo" src="./assets/logo.png"/>
  </div>
  <search-type-picker v-model="state.searchType"/>
  <language-picker/>
  <div class="m-2">
    <search-text-input v-model="state.searchText"/>
  </div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite"/>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import SearchTypePicker from "./components/SearchTypePicker.vue";
import {SearchBy} from "./types/Ui.interface";
import LanguagePicker from "./components/LanguagePicker.vue";
import SearchTextInput from "./components/SearchTextInput.vue";

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    "search-type-picker": SearchTypePicker,
    "language-picker": LanguagePicker,
    "search-text-input": SearchTextInput
  },
  setup() {
    const state = reactive({
      searchType: SearchBy.Name,
      searchText: ""
    });

    return {
      state
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
