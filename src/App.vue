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
          :fetch-data="searchInAllCharactersTab"
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
                {{ lastEpisodeOf(character) }}
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
  import {
    computed,
    defineComponent,
    nextTick,
    onMounted,
    reactive,
    watch,
  } from 'vue'
  import { SearchBy } from './types/Ui.interface'
  import { Character } from './types/CharactersType.interface'
  import LanguagePicker from './components/LanguagePicker.vue'
  import SearchBlock from './components/SearchBlock.vue'
  import Pagination from './components/Pagination.vue'
  import Gender from './components/Gender.vue'
  import { useI18n } from 'vue-i18n'
  import {
    fetchByIds,
    getCharacters,
    fetchById,
  } from './services/RichAndMortyAPI'

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
        favorites: [] as Character[],
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
        const response = await getCharacters(page, {
          searchType: state.searchType,
          searchText: state.searchText,
        })
        state.pages = response?.info.pages
        state.characters = response?.results
      }

      const toggleFavorite = (character: Character) => {
        if (isFavorite(character)) {
          state.favorites = state.favorites.filter((c) => c.id !== character.id)
        } else {
          state.favorites.push(character)
        }
        nextTick(() => saveFavorites())
      }

      const isFavorite = (character: Character) =>
        state.favorites.map((c) => c.id).includes(character.id)

      watch(
        () => favoritesTabSelected.value,
        async (newValue) => {
          if (favoritesTabSelected.value) {
            try {
              state.favorites = await fetchByIds(
                state.favorites.map((c) => c.id)
              )
            } catch (e) {
              console.warn(e)
            }
          }
        }
      )

      const searchInAllCharactersTab = async () => {
        if (allCharactersTabSelected.value) {
          try {
            if (state.searchType === SearchBy.Name) {
              navigateTo(1)
            } else if (state.searchType === SearchBy.Identifier) {
              let id
              if (!(state.searchText === '' || isNaN(+state.searchText))) {
                id = Number(state.searchText)
                let response = await fetchById(id)
                state.pages = 0
                state.characters = [{ ...response }]
              } else if (state.searchText === '') {
                const response = await getCharacters(1, {
                  searchType: SearchBy.Name,
                  searchText: '',
                })
                state.pages = response.info.pages
                state.characters = response.results
              } else {
                state.characters = []
              }
            }
          } catch (e) {
            console.warn(e)
          }
        }
      }
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
          const favoritesClone = [...state.favorites]
          if (state.searchType === SearchBy.Name) {
            return favoritesClone.filter((c) =>
              c.name.toLowerCase().includes(state.searchText.toLowerCase())
            )
          } else if (state.searchType === SearchBy.Identifier) {
            return favoritesClone.filter((c) => {
              const idAsString = c.id + ''
              return idAsString.includes(state.searchText)
            })
          } else if (state.searchType === SearchBy.Episode) {
            return favoritesClone.filter((c) =>
              lastEpisodeOf(c)
                .toLowerCase()
                .includes(state.searchText.toLowerCase())
            )
          }
          return favoritesClone
        }
        return []
      })

      const lastEpisodeOf = (character: Character): string =>
        character.episode[character.episode.length - 1].episode

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
        lastEpisodeOf,
        searchInAllCharactersTab,
      }
    },
  })
</script>

<style>
  .tab {
    @apply border-gray-500 cursor-pointer;
  }

  .selectedTab {
    @apply border-b-4 border-colliersCyan-400 text-colliersCyan-400;
  }

  .isFavorite {
    @apply bg-colliersCyan-400 text-white;
  }

  .isNotFavorite {
    @apply bg-white text-colliersCyan-400 hover:border-4;
  }
</style>
