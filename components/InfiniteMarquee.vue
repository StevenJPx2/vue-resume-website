<script setup lang="ts">
import { PropType } from "vue";

// Most of this credit goes to:
// https://stackoverflow.com/questions/71165923/how-do-i-make-an-infinite-marquee-with-js#answer-71167758

const loopContainer = ref<HTMLElement | null>(null);

const props = defineProps({
  text: { type: String, required: true },
  speed: { type: Number, default: 0.2 },
  direction: { type: String as PropType<"left" | "right">, default: "right" },
  target: { type: Number, default: 100 },
});
const lerpVals = ref({ current: 0, target: 0 });
const interpolationFactor = 0.1;
const directionConstant = props.direction === "left" ? -1 : 1;
const isTargetVisible = useElementVisibility(loopContainer);
const x = ref(0);

const { y: windowY } = useWindowScroll();

watch(windowY, () => {
  lerpVals.value.target += props.speed * 5;
});

const lerp = (lerpVals: { current: number; target: number }) =>
  lerpVals.current * (1 - interpolationFactor) +
  lerpVals.target * interpolationFactor;

const { pause, resume } = useRafFn(
  () => {
    const lerpValsConstant = lerpVals.value;
    lerpValsConstant.target += props.speed;
    lerpValsConstant.current = lerp(lerpValsConstant);

    if (lerpValsConstant.target > props.target) {
      lerpValsConstant.current -= lerpValsConstant.target;
      lerpValsConstant.target = 0;
    }

    x.value = lerpValsConstant.current * directionConstant;
  },
  { immediate: false }
);

watch(isTargetVisible, (val) => {
  val ? resume() : pause();
});
</script>

<template>
  <div
    ref="loopContainer"
    class="border-t border-b border-accent py-[1vw] mb-[21vw] md:mb-[15vw]"
  >
    <div :style="{ transform: `translateX(${x}%)` }">
      <div class="relative inline-flex whitespace-nowrap gap-x-[12vw]">
        <div
          class="inline-flex whitespace-nowrap gap-x-[12vw] mr-[12vw]"
          v-for="i in 2"
          :class="{
            absolute: i == 2,
            'left-full': i == 2 && props.direction === 'left',
            '-left-full': i == 2 && props.direction === 'right',
          }"
        >
          <h2 class="md:text-[3.1vw]" v-for="_ in 10">
            {{ text.toUpperCase() }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
