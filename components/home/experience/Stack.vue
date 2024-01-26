<script setup lang="ts">
import technologies, {
  type TechnologyKeys,
} from "~/repos/collections/technologies";
const props = defineProps<{ stack: TechnologyKeys[] }>();
const experienceTechnologies = props.stack.map((key) => technologies[key]);
</script>

<template>
  <div class="flex flex-wrap gap-[3vw] md:gap-[0.7vw] px-[8vw] md:px-[2vw]">
    <tooltip-provider
      :delay-duration="200"
      v-for="tech in experienceTechnologies"
      :key="tech.id"
    >
      <tooltip-root>
        <tooltip-trigger as-child>
          <nuxt-link
            class="px-3 py-2 rounded-md flex items-center gap-2 bg-base-color text-accent text-[8vw] md:text-[2vw] transition ease-out-quad hover:scale-105 group relative isolate"
            :to="!!tech.link ? 'https://' + tech.link : '#'"
            target="blank"
            :external="true"
          >
            <div
              class="absolute inset-0 z-[-1] rounded-md opacity-25 transition ease-out-quad group-hover:opacity-70"
              :style="{
                backgroundColor:
                  !tech.color || ['#000', '#000000'].includes(tech.color)
                    ? '#555'
                    : tech.color,
              }"
            />
            <icon
              v-if="tech.icon_name"
              :name="tech.icon_name"
              class="[&>path]:fill-current"
            />
            <small
              :class="{
                'w-max text-[4vw] md:text-[1.1vw]': true,
                'sr-only': !!tech.icon_name,
              }"
            >
              {{ tech.name }}
            </small>
          </nuxt-link>
        </tooltip-trigger>
        <Transition name="fade">
          <tooltip-content
            class="py-1 px-3 mb-2 bg-white text-black rounded-md backdrop-blur animate"
          >
            {{ tech.name }}
          </tooltip-content>
        </Transition>
      </tooltip-root>
    </tooltip-provider>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
