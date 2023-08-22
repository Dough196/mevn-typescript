<template>
  <div class="col-md-4 offset-md-4">
    <form @submit.prevent="handleUpdate" class="card card-body mb-3">
      <h1 class="text-center mb-3">Task Details</h1>
      <input
        type="text"
        placeholder="Write s title"
        v-model="currentTask.title"
        class="form-control mb-3"
      />

      <textarea
        rows="3"
        placeholder="Write a description"
        v-model="currentTask.description"
        class="form-control mb-3"
      ></textarea>

      <button class="btn btn-primary">Update</button>
    </form>
    <div class="text-center">
      <button @click="handleDelete" class="btn btn-danger">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Task } from '@/interfaces/Task'
import { deleteTask, getTask, updateTask } from '@/services/TaskService'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      currentTask: {} as Task,
    }
  },
  mounted() {
    if (typeof this.$route.params.id == 'string') {
      this.loadTask(this.$route.params.id)
    }
  },
  methods: {
    async loadTask(id: string) {
      const res = await getTask(id)
      this.currentTask = res.data
    },
    async handleUpdate() {
      if (typeof this.$route.params.id == 'string') {
        const res = await updateTask(this.$route.params.id, this.currentTask)
        console.log(res)
        this.$router.push({ name: 'tasks' })
      }
    },
    async handleDelete() {
      if (typeof this.$route.params.id == 'string') {
        const res = await deleteTask(this.$route.params.id)
        console.log(res)
        this.$router.push({ name: 'tasks' })
      }
    },
  },
})
</script>
