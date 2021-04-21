<template>
  <h1>{{ msg }}</h1>
  <h1>{{ t('message.hello') }}</h1>
  <i class="material-icons">search</i>
  <i class="material-icons">close</i>
  <i class="material-icons">remove</i>
  <i class="material-icons">star</i>
  <i class="material-icons">male</i>
  <i class="material-icons">female</i>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
    >
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { getCharacters } from '../services/RichAndMortyAPI'

  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        required: true,
      },
    },
    setup: () => {
      getCharacters()
      const count = ref(0)
      const i18n = useI18n({})
      return { t: i18n.t, count }
    },
  })
</script>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
