<template>
  <div class="flex flex-col items-center">
    <div class="flex items-center w-full">
      <div class="w-32 mr-10 ml-20">
        <img alt="" src="./assets/logo.png" />
      </div>
      <div>
        <search-block
          v-model:search-text="state.searchText"
          v-model:search-type="state.searchType"
        />
      </div>
      <div class="ml-5 w-28">
        <language-picker />
      </div>
    </div>
    <hr class="border-1 border-colliersGray-300 w-full mt-12" />
    <div class="mt-4 w-full">
      <div class="flex items-center ml-20 space-x-16 text-gray-500 mb-4">
        <div
          :class="tabSelectionStyleForAllCharacters"
          class="tab"
          @click="onTabClicked(TabType.AllCharacters)"
        >
          {{ t('datagrid.allCharacters_btn') }}
        </div>
        <div
          :class="tabSelectionStyleForFavorites"
          class="tab"
          @click="onTabClicked(TabType.Favorites)"
        >
          {{ t('datagrid.favorites_btn') }}
        </div>
      </div>
      <div class="">
        <table class="w-full text-left">
          <thead class="bg-colliersGray-300">
            <tr class="h-14">
              <th class="w-1/12 pl-20 pr-20 py-3">
                {{ t('datagrid.photo_th') }}
              </th>
              <th class="w-1/12 pl-6 py-3">
                {{ t('datagrid.characterId_th') }}
              </th>
              <th class="w-1/12 pl-6 py-3">{{ t('datagrid.name_th') }}</th>
              <th class="w-1/12 pl-6 py-3">{{ t('datagrid.gender_th') }}</th>
              <th class="w-1/12 pl-6 py-3">{{ t('datagrid.species_th') }}</th>
              <th class="w-1/12 pl-6 py-3">
                {{ t('datagrid.lastEpisode_th') }}
              </th>
              <th class="w-1/12 pl-6 py-3">
                {{ t('datagrid.addToFavorites_th') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="character in state.characters"
              :key="character.id"
              class="mt-1 h-20 border-b border-colliersGray-300"
            >
              <td class="pl-20 pr-40">
                <div class="w-16 aspect-w-5 aspect-h-2 my-2">
                  <img :src="character.image" alt="" />
                </div>
              </td>
              <td class="pl-6 py-3">
                {{ character.id }}
              </td>
              <td class="pl-6 py-3">
                {{ character.name }}
              </td>
              <td class="pl-6 py-3">
                <div class="flex items-center">
                  <i class="material-icons">close</i>
                  <div>
                    {{ character.gender }}
                  </div>
                </div>
              </td>
              <td class="pl-6 py-3">
                {{ character.species }}
              </td>
              <td class="pl-6 py-3">
                {{ character.episode[character.episode.length - 1].episode }}
              </td>
              <td class="pl-6 py-3">
                <div
                  class="w-11 h-11 border-2 border-colliersCyan-400 rounded-md flex items-center justify-center text-colliersCyan-400 cursor-pointer"
                >
                  <i class="material-icons">star</i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, reactive } from 'vue'
  import SearchTypePicker from './components/SearchTypePicker.vue'
  import { SearchBy } from './types/Ui.interface'
  import { Character } from './types/CharactersType.interface'
  import LanguagePicker from './components/LanguagePicker.vue'
  import SearchTextInput from './components/SearchTextInput.vue'
  import SearchBlock from './components/SearchBlock.vue'
  import { useI18n } from 'vue-i18n'
  import { getCharacters } from './services/RichAndMortyAPI'

  enum TabType {
    AllCharacters,
    Favorites,
  }

  export default defineComponent({
    name: 'App',
    components: {
      'search-type-picker': SearchTypePicker,
      'language-picker': LanguagePicker,
      'search-text-input': SearchTextInput,
      'search-block': SearchBlock,
    },
    setup() {
      const i18n = useI18n({
        messages: {
          en: {
            datagrid: {
              allCharacters_btn: 'All Characters',
              favorites_btn: 'Favorites',
              photo_th: 'Photo',
              characterId_th: 'Character ID',
              name_th: 'Name',
              gender_th: 'Gender',
              species_th: 'Species',
              lastEpisode_th: 'Last Episode',
              addToFavorites_th: 'Add To Favorites',
            },
            gender: {
              Male: 'Male',
              Female: 'Female',
              Genderless: 'Genderless',
              Unknown: 'Unknown',
            },
            species: {
              Human: 'Human',
            },
          },
          fr: {
            datagrid: {
              allCharacters_btn: 'Tous Les Personnages',
              favorites_btn: 'Favoris',
              photo_th: 'Photo',
              characterId_th: 'ID du Personnage',
              name_th: 'Nom',
              gender_th: 'Genre',
              species_th: 'Espèces',
              lastEpisode_th: 'Dernier Épisode',
              addToFavorites_th: 'Ajouter Aux Favoris',
            },
            gender: {
              Male: 'Mâle',
              Female: 'Femelle',
              Genderless: 'Sans sexe',
              Unknown: 'Inconnu',
            },
            species: {
              Human: 'Humain',
            },
          },
          de: {
            datagrid: {
              allCharacters_btn: 'Alle Charaktere',
              favorites_btn: 'Favoriten',
              photo_th: 'Foto',
              characterId_th: 'Charakter-ID',
              name_th: 'Name',
              gender_th: 'Geschlecht',
              species_th: 'Spezies',
              lastEpisode_th: 'Letzte Folge',
              addToFavorites_th: 'Zu den Favoriten',
            },
            gender: {
              Male: 'Männlich',
              Female: 'Weiblich',
              Genderless: 'Geschlechtslos',
              Unknown: 'Unbekannt',
            },
            species: {
              Human: 'Mensch',
            },
          },
        },
      })
      const state = reactive({
        searchType: SearchBy.Name,
        searchText: '',
        activeTab: TabType.AllCharacters,
        characters: [
          {
            id: 1,
            name: 'Morty Smith',
            species: 'Human',
            gender: 'Male',
            image: 'https://rickandmortyapi.com/api/character/avatar/21.jpeg',
            episode: [
              {
                id: 11,
                air_date: 'Sep 29, 2020',
                episode: 'S01E01',
              },
            ],
          },
        ] as Character[],
      })

      onMounted(async () => {
        const response = await getCharacters()
        state.characters = response.data.characters.results
      })

      const tabSelectionStyleForAllCharacters = computed(() =>
        state.activeTab === TabType.AllCharacters ? 'selectedTab' : ''
      )
      const tabSelectionStyleForFavorites = computed(() =>
        state.activeTab === TabType.Favorites ? 'selectedTab' : ''
      )
      const onTabClicked = (tabType: TabType) => (state.activeTab = tabType)

      return {
        t: i18n.t,
        state,
        tabSelectionStyleForAllCharacters,
        tabSelectionStyleForFavorites,
        onTabClicked,
        TabType,
      }
    },
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

  .tab {
    @apply border-b-2 border-gray-500 cursor-pointer;
  }

  .selectedTab {
    @apply border-colliersCyan-400 text-colliersCyan-400;
  }
</style>
