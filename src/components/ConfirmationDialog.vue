<template>
  <modal-dialog :open="open" @hide="emit('close')">
    <template #header>
      <slot name="header">
        Are you sure?
      </slot>
    </template>

    <template #default>
      <slot>
        <div class="text-center mb-4">
          This action cannot be undone.
        </div>
      </slot>
    </template>

    <template #footer>
      <slot name="footer">
        <button class="btn w-1/4" @click="emit('close')">Cancel</button>
        <button class="btn bg-primary/80 w-1/4" @click="confirm">OK</button>
      </slot>
    </template>

  </modal-dialog>
</template>

<script setup>

  import ModalDialog from './ModalDialog.vue'
  defineProps({ open: Boolean });
  const emit = defineEmits([ "ok", "close" ]);

  function confirm() {
    emit('ok');
    emit('close');
  }

</script>
