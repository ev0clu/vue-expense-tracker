<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue'

const props = defineProps<{
  id: number
}>()
const emits = defineEmits<{
  close: []
  delete: [id: number]
}>()

function closeButtonHandler() {
  emits('close')
}

function deleteButtonHandler(id: number) {
  emits('delete', id)
}
</script>

<template>
  <div class="modal-backdrop" @click.self="closeButtonHandler">
    <div class="delete-modal">
      <p>Are you sure to delete? You cannot undo it.</p>

      <div class="button-wrapper">
        <ButtonComponent variant="outline" @button-normal-click="closeButtonHandler">
          Cancel
        </ButtonComponent>
        <ButtonComponent
          variant="destructive"
          :argument="id"
          @button-event-click="deleteButtonHandler(props.id)"
        >
          Delete
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
  z-index: 15;
}
.delete-modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  z-index: 16;
  padding: 1rem;
  border-radius: 8px;
}

.delete-modal > * + * {
  margin-top: 1rem;
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

button.hover {
  background-color: blue;
}
</style>
