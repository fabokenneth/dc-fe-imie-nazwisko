import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import i18nMessages from './i18n.json';
import App from './App.vue'
import './assets/css/style.css'

function defaultLanguage() {
  const result = navigator.language.split("-")[0];
  if (result !== "fr") {
    return "en";
  }
  return result;
}

const locale = defaultLanguage();
const i18n = createI18n({
  legacy: false,
  locale,
  messages: i18nMessages, // set locale messages
})

const app = createApp(App)

app.use(i18n)
app.mount('#app')
