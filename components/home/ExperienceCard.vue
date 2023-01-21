<script setup lang="ts">
import { PropType } from "vue";
import { Experience } from "~/utils/types";

const props = defineProps({
  data: { type: Object as PropType<Experience>, required: true },
});

const body = ref<HTMLElement>();
const hasInitialOverflow = ref(true);
const isReadMoreModalRevealed = ref(false);
tryOnMounted(() => {
  const { hasOverflow } = useLineClamp(body);

  hasInitialOverflow.value = hasOverflow.value;

  watchOnce(hasOverflow, (val) => {
    hasInitialOverflow.value = val;
  });
});
</script>

<template>
  <div class="card">
    <div>
      <h3 class="text-[30vw] md:text-[9vw] leading-[0.9]">
        {{ props.data.workplace_name }}
      </h3>
      <p class="uppercase text-[4vw] md:text-[1vw] tracking-widest">
        {{ useDateFormat(props.data.from, "MMM, YYYY").value }} -
        {{
          props.data.to === null
            ? "Present"
            : useDateFormat(props.data.to, "MMM, YYYY").value
        }}
      </p>
      <p
        class="
          uppercase
          text-[4vw]
          md:text-[1vw]
          tracking-widest
          mb-[5vw]
          md:mb-[2vw]
        "
      >
        {{ props.data.workplace_title }}
      </p>
    </div>

    <article
      class="overflow-hidden prose p-3 pb-9"
      :class="{ 'hover:bg-accent/10': hasInitialOverflow }"
    >
      <div ref="body" v-html="props.data.description.body" />
    </article>

    <button
      class="
        rounded-full
        w-fit
        px-[6vw]
        py-[1vw]
        md:px-[2vw] md:py-[0.4vw]
        border border-accent
        bg-accent/30
        hover:bg-accent hover:text-[var(--color-base)]
        text-[3.5vw]
        md:text-[1.3vw]
        mx-auto
        my-[5vw]
        md:my-[1.3vw]
        font-medium
        uppercase
        transition-colors
        max-h-[120%]
        md:max-h-[3.5vw]
      "
      v-if="hasInitialOverflow"
      @click="isReadMoreModalRevealed = true"
    >
      Read more
    </button>

    <lazy-modal
      :is-revealed="isReadMoreModalRevealed"
      :on-click-outside="() => (isReadMoreModalRevealed = false)"
    >
      <article>
        <div v-html="props.data.description.body" />
      </article>
    </lazy-modal>
  </div>
</template>
