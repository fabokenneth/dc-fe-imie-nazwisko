<template>
  <div class="flex items-center justify-start">
    <pagination-button
      :execute="goToPrevious"
      :is-active="hasPrevious"
      :is-selected="false"
      :is-three-dots="false"
    >
      <div
        :class="{ arrowActive: hasPrevious, arrowNotActive: !hasPrevious }"
        class="fill-current"
      >
        <svg
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 0v24H0V0h24z" fill="none" opacity=".87" />
          <path d="M14 7l-5 5 5 5V7z" />
        </svg>
      </div>
    </pagination-button>
    <pagination-button
      v-for="entry in entries"
      :key="entry.id"
      :execute="() => goTo(entry.position)"
      :is-active="entry.isActive"
      :is-selected="entry.position === state.position"
      :is-three-dots="entry.isThreeDots"
      :data-test-id="'pagination-page-' + entry.position"
    >
      {{ entry.text }}
    </pagination-button>
    <pagination-button
      :execute="goToNext"
      :is-active="hasNext"
      :is-selected="false"
      :is-three-dots="false"
    >
      <div
        :class="{ arrowActive: hasNext, arrowNotActive: !hasNext }"
        class="fill-current"
      >
        <svg
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M10 17l5-5-5-5v10z" />
        </svg>
      </div>
    </pagination-button>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    PropType,
    reactive,
    watch,
  } from 'vue'
  import PaginationButton from './PaginationButton.vue'

  interface ButtonData {
    id: number
    text: string
    isActive: boolean
    isThreeDots: boolean
    position: number
  }

  export default defineComponent({
    name: 'Pagination',
    components: {
      'pagination-button': PaginationButton,
    },
    props: {
      total: {
        type: Number,
        required: true,
      },
      fetchData: {
        type: Function as PropType<(pageIndex: number) => void>,
        required: true,
      },
    },
    setup(props, { emit }) {
      const state = reactive({
        entries: [] as ButtonData[],
        position: 1,
      })

      onMounted(() => computeEntries())

      const computeEntries = () => {
        addFirstEntry()
        addLastEntry()
        addCurrentPosition()
        computeNeighborsInOneDirection(1)
        computeNeighborsInOneDirection(-1)
      }
      const addFirstEntry = () => {
        state.entries.push({
          id: 0,
          text: '1',
          isActive: true,
          isThreeDots: false,
          position: 1,
        })
      }
      const addLastEntry = () => {
        if (props.total > 1) {
          state.entries.push({
            id: props.total + 1,
            text: '' + props.total,
            isActive: true,
            isThreeDots: false,
            position: props.total,
          })
        }
      }
      const addCurrentPosition = () => {
        if (state.position > 1 && state.position < props.total) {
          state.entries.push({
            id: state.position,
            text: '' + state.position,
            isActive: false,
            isThreeDots: false,
            position: state.position,
          })
        }
      }
      const computeNeighborsInOneDirection = (factor: -1 | 1) => {
        const toTheLeftSide = factor === -1
        const toTheRightSide = factor === 1
        for (let i = 1; i <= 3; i++) {
          const position = state.position + i * factor
          if (
            (toTheLeftSide && position > 1) ||
            (toTheRightSide && position < props.total)
          ) {
            state.entries.push({
              id: position,
              text: '' + position,
              isActive: true,
              isThreeDots: false,
              position: position,
            })
          }
        }
        if (toTheLeftSide && state.position - 4 > 1) {
          state.entries.push({
            id: 1,
            text: '...',
            isActive: false,
            isThreeDots: false,
            position: -1,
          })
        }
        if (toTheRightSide && state.position + 4 < props.total) {
          state.entries.push({
            id: props.total,
            text: '...',
            isActive: false,
            isThreeDots: false,
            position: -1,
          })
        }
      }

      watch(
        () => state.position + props.total,
        () => {
          state.entries.length = 0
          computeEntries()
        }
      )
      watch(
        () => state.position,
        (newValue) => emit('update:position', newValue)
      )

      const hasPrevious = computed(() => state.position > 1)
      const hasNext = computed(() => state.position < props.total)
      const entries = computed(() => {
        const clonedEntries: ButtonData[] = [...state.entries]
        return clonedEntries.sort((a, b) => a.id - b.id)
      })
      const goTo = (position: number) => {
        props.fetchData(position)
        state.position = position
      }

      const goToPrevious = () => goTo(state.position - 1)
      const goToNext = () => goTo(state.position + 1)

      return {
        state,
        hasPrevious,
        hasNext,
        entries,
        goToPrevious,
        goToNext,
        goTo,
      }
    },
  })
</script>

<style scoped>
  .arrowActive {
    @apply text-colliersCyan-400;
  }

  .arrowNotActive {
    @apply text-colliersGray-400;
  }
</style>
