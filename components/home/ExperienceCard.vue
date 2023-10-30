<script setup lang="ts">
import { marked } from "marked";
import { PropType } from "vue";
import { Experience } from "~/utils/types";

const props = defineProps({
  data: { type: Object as PropType<Experience>, required: true },
});

const body = ref<HTMLElement>();
const bodyContent = marked.parse(props.data.description.body);
const hasInitialOverflow = ref(true);
const isReadMoreModalRevealed = ref(false);

tryOnMounted(() => {
  const { hasOverflow } = useLineClamp(body);

  hasInitialOverflow.value = hasOverflow.value;

  watchOnce(
    () => hasOverflow.value,
    (val) => {
      hasInitialOverflow.value = val;
    },
  );
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
        class="uppercase text-[4vw] md:text-[1vw] tracking-widest mb-[5vw] md:mb-[2vw]"
      >
        {{ props.data.workplace_title }}
      </p>
    </div>

    <article
      class="overflow-hidden prose p-3 pb-9"
      :class="{ 'hover:bg-accent/10': hasInitialOverflow }"
    >
      <div ref="body" v-html="bodyContent" />
    </article>

    <button
      @click="isReadMoreModalRevealed = true"
      class="btn btn-hoverable justify-self-center"
      v-if="hasInitialOverflow"
    >
      Read more
    </button>

    <modal
      :is-revealed="isReadMoreModalRevealed"
      :on-click-outside="() => (isReadMoreModalRevealed = false)"
    >
      <article class="prose">
        <div v-html="bodyContent" />
      </article>
    </modal>
  </div>
</template>
