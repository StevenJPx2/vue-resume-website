<script setup lang="ts">
import { marked } from "marked";
import { PropType } from "vue";
import { Experience } from "~/utils/types";

const props = defineProps({
  data: { type: Object as PropType<Experience>, required: true },
});

const body = ref<HTMLElement>();
const bodyContent = marked.parse(props.data.description.body);
const isReadMoreModalRevealed = ref(false);

const { hasOverflow } = useLineClamp(body);

const { from, to } = {
  from: useDateFormat(props.data.from, "MMM, YYYY").value,
  to: !props.data.to
    ? "Present"
    : useDateFormat(props.data.to, "MMM, YYYY").value,
};
</script>

<template>
  <div class="card grid grid-rows-[auto,max-content]">
    <div class="card--body">
      <div>
        <h3 class="text-[30vw] md:text-[9vw] leading-[0.9]">
          {{ props.data.workplace_name }}
        </h3>
        <p class="uppercase text-[4vw] md:text-[1vw] tracking-widest">
          {{ from }} -
          {{ to }}
        </p>
        <p
          class="uppercase text-[4vw] md:text-[1vw] tracking-widest mb-[5vw] md:mb-[2vw]"
        >
          {{ props.data.workplace_title }}
        </p>
      </div>

      <article
        class="overflow-hidden prose p-3 pb-9 relative isolate"
        :class="{
          'hover:bg-accent/10 [mask:linear-gradient(to_bottom,black_40%,transparent_100%)]':
            hasOverflow,
        }"
      >
        <div ref="body" v-html="bodyContent" />
      </article>

      <button
        @click="isReadMoreModalRevealed = true"
        class="btn btn-hoverable justify-self-center"
        v-if="hasOverflow"
      >
        Read more
      </button>
    </div>

    <modal
      :is-revealed="isReadMoreModalRevealed"
      :on-click-outside="() => (isReadMoreModalRevealed = false)"
    >
      <div v-html="bodyContent" />
    </modal>
    <div>
      <div class="h-px w-full bg-white/50 my-5" />
      <home-experience-stack :stack="data.stack" />
    </div>
  </div>
</template>
