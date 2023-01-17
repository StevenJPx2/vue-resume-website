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

    <modal
      :is-revealed="isReadMoreModalRevealed"
      :on-click-outside="() => (isReadMoreModalRevealed = false)"
    >
      <article>
        <div v-html="props.data.description.body" />
      </article>
    </modal>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
$color-base: #0e0e0e;

.card {
  @apply relative;
  @apply grid;

  background: linear-gradient(
    180deg,
    var(--color-base) 0%,
    color.scale($color-base, $lightness: 5%) 50%,
    var(--color-base) 100%
  );
  @apply h-full;
  $border: 1px;
  @apply bg-clip-padding;
  border: solid $border transparent;
  @apply rounded-2xl;
  @apply pt-[20%];
  @apply px-[8vw];
  grid-template-rows: 2fr 4fr 1fr;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -$border;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.2) 100%
    );
  }

  @screen md {
    @apply px-[2vw];
  }
}
</style>
