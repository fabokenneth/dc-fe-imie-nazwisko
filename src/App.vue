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
          :class="{ selectedTab: allCharactersTabSelected }"
          class="tab"
          data-test-id="characters-area-mn"
          @click="onTabClicked(TabType.AllCharacters)"
        >
          {{ t('datagrid.allCharacters_btn') }}
        </div>
        <div
          :class="{ selectedTab: favoritesTabSelected }"
          class="tab"
          data-test-id="favorite-characters-area-mn"
          @click="onTabClicked(TabType.Favorites)"
        >
          {{ t('datagrid.favorites_btn') }}
        </div>
      </div>
      <div class="w-full">
        <table
          class="text-left text-colliersGray-400 mb-12"
          data-test-id="characters-area-list"
        >
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
              v-for="character in characters"
              :key="character.id"
              class="mt-1 h-20 border-b border-colliersGray-300"
              :data-test-id="'characterId-' + character.id"
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
                  <gender :type="character.gender" />
                  <div>
                    {{ t('gender.' + character.gender) }}
                  </div>
                </div>
              </td>
              <td class="pl-6 py-3">
                {{ t('species.' + character.species.replaceAll(' ', '')) }}
              </td>
              <td class="pl-6 py-3">
                {{ character.episode[character.episode.length - 1].episode }}
              </td>
              <td class="pl-6 py-3">
                <div
                  :class="{
                    isFavorite: isFavorite(character),
                    isNotFavorite: !isFavorite(character),
                  }"
                  class="w-11 h-11 border-2 border-colliersCyan-400 rounded-md flex items-center justify-center cursor-pointer"
                  @click="toggleFavorite(character)"
                >
                  <i class="material-icons">star</i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="allCharactersTabSelected" class="pl-20 mb-8">
          <pagination :fetch-data="navigateTo" :total="state.pages" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, reactive } from 'vue'
  import { SearchBy } from './types/Ui.interface'
  import { Character } from './types/CharactersType.interface'
  import LanguagePicker from './components/LanguagePicker.vue'
  import SearchBlock from './components/SearchBlock.vue'
  import Pagination from './components/Pagination.vue'
  import Gender from './components/Gender.vue'
  import { useI18n } from 'vue-i18n'
  import { getCharacters } from './services/RichAndMortyAPI'

  enum TabType {
    AllCharacters,
    Favorites,
  }

  export default defineComponent({
    name: 'App',
    components: {
      'language-picker': LanguagePicker,
      'search-block': SearchBlock,
      pagination: Pagination,
      gender: Gender,
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
              unknown: 'Unknown',
            },
            species: {
              Human: 'Human',
              Alien: 'Alien',
              unknown: 'Unknown',
              Humanoid: 'Humanoid',
              Poopybutthole: 'Poopybutthole',
              Animal: 'Animal',
              MythologicalCreature: 'Mythological Creature',
              Robot: 'Robot',
              Cronenberg: 'Cronenberg',
              Disease: 'Disease',
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
              unknown: 'Inconnu',
            },
            species: {
              Human: 'Humain',
              Alien: 'Extraterrestre',
              unknown: 'Inconnu',
              Humanoid: 'Humanoide',
              Poopybutthole: 'Trou de cul de poopy',
              Animal: 'Animal',
              MythologicalCreature: 'Créature mythologique',
              Robot: 'Robot',
              Cronenberg: 'Cronenberg',
              Disease: 'Maladie',
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
              unknown: 'Unbekannt',
            },
            species: {
              Human: 'Mensch',
              Alien: 'Außerirdischer',
              unknown: 'Unbekannt',
              Humanoid: 'Humanoid',
              Poopybutthole: 'Poopybutthole',
              Animal: 'Tier',
              MythologicalCreature: 'Mythologische Kreatur',
              Robot: 'Roboter',
              Cronenberg: 'Cronenberg',
              Disease: 'Krankheit',
            },
          },
        },
      })
      const state = reactive({
        searchType: SearchBy.Name,
        searchText: '',
        activeTab: TabType.AllCharacters,
        pages: 0,
        characters: [] as Character[],
        favorites: [] as number[],
      })

      onMounted(() => {
        readFavorites()
        navigateTo(1)
      })

      const allCharactersTabSelected = computed(
        () => state.activeTab === TabType.AllCharacters
      )
      const favoritesTabSelected = computed(
        () => state.activeTab === TabType.Favorites
      )
      const onTabClicked = (tabType: TabType) => (state.activeTab = tabType)

      const navigateTo = async (page: number) => {
        const response = await getCharacters(page)
        state.pages = response.data.characters.info.pages
        state.characters = response.data.characters.results
      }

      const toggleFavorite = (character: Character) => {
        if (isFavorite(character)) {
          state.favorites = state.favorites.filter((c) => c !== character.id)
        } else {
          state.favorites.push(character.id)
        }
        nextTick(() => saveFavorites())
      }

      const isFavorite = (character: Character) =>
        state.favorites.includes(character.id)

      const saveFavorites = () =>
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
      const readFavorites = () => {
        let item = localStorage.getItem('favorites')
        if (item) {
          state.favorites = JSON.parse(item)
        } else {
          state.favorites = []
        }
      }

      const characters = computed(() => {
        if (allCharactersTabSelected.value) {
          return state.characters
        } else if (favoritesTabSelected.value) {
          return state.characters.filter((c) => isFavorite(c))
        }
        return []
      })

      return {
        t: i18n.t,
        state,
        allCharactersTabSelected,
        favoritesTabSelected,
        onTabClicked,
        TabType,
        navigateTo,
        toggleFavorite,
        isFavorite,
        characters,
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

  .isFavorite {
    @apply bg-colliersCyan-400 text-white;
  }

  .isNotFavorite {
    @apply bg-white text-colliersCyan-400;
  }
</style>
