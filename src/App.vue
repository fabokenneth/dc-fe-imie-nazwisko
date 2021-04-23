<template>
  <div class="flex flex-col items-center">
    <div class="flex items-center">
      <div class="w-32 mr-10">
        <img src="./assets/logo.jpg">
      </div>
      <div>
        <search-block
            v-model:search-text="state.searchText"
            v-model:search-type="state.searchType"
        />
      </div>
      <div class="ml-5 w-28">
        <language-picker/>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import SearchTypePicker from "./components/SearchTypePicker.vue";
import {SearchBy} from "./types/Ui.interface";
import LanguagePicker from "./components/LanguagePicker.vue";
import SearchTextInput from "./components/SearchTextInput.vue";
import SearchBlock from "./components/SearchBlock.vue";

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    "search-type-picker": SearchTypePicker,
    "language-picker": LanguagePicker,
    "search-text-input": SearchTextInput,
    "search-block": SearchBlock
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
