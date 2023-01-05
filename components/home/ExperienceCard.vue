<script setup lang="ts">
import { PropType } from "vue";
import { Experience } from "~/utils/types";

const props = defineProps({
  data: { type: Object as PropType<Experience>, required: true },
});
</script>

<template>
  <div class="card">
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
      class="uppercase text-[4vw] md:text-[1vw] tracking-widest mb-[5vw] md:mb-[2vw]"
    >
      {{ props.data.workplace_title }}
    </p>

    <article
      class="overflow-y-scroll overflow-x-hidden prose"
      v-html="props.data.description.body"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
$color-base: #0e0e0e;

.card {
  @apply relative;
  @apply flex;
  @apply flex-col;

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
