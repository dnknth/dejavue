<template>
  <transition name="bounce" @enter="emit('show')" @after-enter="emit('shown')" @after-leave="emit('hidden')">
    <div ref="backdrop" class="modal-backdrop" v-if="open" @click="onClick">

      <div class="absolute max-h-full w-1/2 max-w-lg">
        <div class="container bg-back text-front overflow-hidden rounded-lg">
          <div class="px-4 py-4 flex justify-between items-start">

            <div class="max-h-full w-full">
              <div class="flex justify-between items-center mb-2">
                <h3 class="text-2xl font-bold leading-normal">
                  <slot name="header" />
                </h3>

                <div v-if="closable" @click="emit('hide')" class="text-2xl opacity-70 hover:opacity-90 cursor-pointer select-none flex leading-none">
                  <svg-icon :fa-icon="faTimesCircle" />
                </div>
              </div>

              <div class="mt-10">
                <slot />
              </div>

              <div class="flex justify-end w-full">
                <slot name="footer">
                  <button v-if="closable" @click="emit('hide')">Close</button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>

  import { onMounted, ref } from 'vue';
  import { useEventListener } from '@vueuse/core';
  import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

  const props = defineProps({
    open: Boolean,
    closable: { type: Boolean, default: true }
  });

  const emit = defineEmits([ "hide", "hidden", "show", "shown" ]),
        backdrop = ref(null);

  function onClick(e) {
    if (props.closable && e.target == backdrop.value) emit("hide");
  }

  onMounted(() => {
    if (props.closable) useEventListener(document, "keydown", e => {
      if (e.key == "Esc" || e.key == "Escape") emit("hide");
    });
  });

</script>
