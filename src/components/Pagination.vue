<template>
  <div class="flex items-center justify-start">
    <pagination-button
        :is-active="hasPrevious"
        :is-selected="false"
        :is-three-dots="false"
    >
      <div class="fill-current"
          :class="{arrowActive: hasPrevious, arrowNotActive: !hasPrevious}"
      >
        <svg height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 0v24H0V0h24z" fill="none" opacity=".87"/>
          <path d="M14 7l-5 5 5 5V7z"/>
        </svg>
      </div>
    </pagination-button>
    <pagination-button
        v-for="entry in entries"
        :key="entry.id"
        :is-active="entry.isActive"
        :is-selected="entry.position === position"
        :is-three-dots="entry.isThreeDots"
    >
      {{ entry.text }}
    </pagination-button>
    <pagination-button
        :is-active="hasNext"
        :is-selected="false"
        :is-three-dots="false"
    >
      <div class="fill-current"
           :class="{arrowActive: hasNext, arrowNotActive: !hasNext}">
        <svg height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M10 17l5-5-5-5v10z"/>
        </svg>
      </div>
    </pagination-button>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, watch} from "vue";
import PaginationButton from "./PaginationButton.vue";

interface ButtonData {
  id: number,
  text: string,
  isActive: boolean,
  isThreeDots: boolean,
  position: number,
}

export default defineComponent({
  name: "Pagination",
  components: {
    "pagination-button": PaginationButton
  },
  props: {
    total: {
      type: Number,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      entries: [] as ButtonData[]
    });

    onMounted(() => computeEntries());

    const computeEntries = () => {
      addFirstEntry();
      addLastEntry();
      addCurrentPosition();
      computeNeighborsInOneDirection(1);
      computeNeighborsInOneDirection(-1);
    }
    const addFirstEntry = () => {
      state.entries.push({
        id: 0,
        text: "1",
        isActive: true,
        isThreeDots: false,
        position: 1,
      });
    }
    const addLastEntry = () => {
      if (props.total > 1) {
        state.entries.push({
          id: props.total + 1,
          text: "" + props.total,
          isActive: true,
          isThreeDots: false,
          position: props.total,
        });
      }
    }
    const addCurrentPosition = () => {
      if (props.position > 1 && props.position < props.total) {
        state.entries.push({
          id: props.position,
          text: "" + props.position,
          isActive: false,
          isThreeDots: false,
          position: props.position,
        })
      }
    }
    const computeNeighborsInOneDirection = (factor: -1 | 1) => {
      const toTheLeftSide = factor === -1;
      const toTheRightSide = factor === 1;
      for (let i = 1; i <= 3; i++) {
        const position = props.position + i * factor;
        if ((toTheLeftSide && position > 1)
            || (toTheRightSide && position < props.total)) {
          state.entries.push({
            id: position,
            text: "" + position,
            isActive: true,
            isThreeDots: false,
            position: position,
          })
        }
      }
      if (toTheLeftSide && props.position - 4 > 1) {
        state.entries.push({
          id: 1,
          text: "...",
          isActive: false,
          isThreeDots: false,
          position: -1,
        })
      }
      if (toTheRightSide && props.position + 4 < props.total) {
        state.entries.push({
          id: props.total,
          text: "...",
          isActive: false,
          isThreeDots: false,
          position: -1,
        })
      }
    }

    watch(() => props.position + props.total, () => {
      state.entries.length = 0;
      computeEntries();
    });


    const hasPrevious = computed(() => props.position > 1);
    const hasNext = computed(() => props.position < props.total);
    const entries = computed(() => {
      const clonedEntries: ButtonData[] = [...state.entries];
      return clonedEntries.sort((a, b) => a.id - b.id)
    });
    return {
      state,
      hasPrevious,
      hasNext,
      entries
    }
  }
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