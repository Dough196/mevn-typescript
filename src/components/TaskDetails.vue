<template>
  <h1>Task Details</h1>
  <form @submit.prevent="handleUpdate">
    <input
      type="text"
      placeholder="Write s title"
      v-model="currentTask.title"
    />

    <textarea
      rows="3"
      placeholder="Write a description"
      v-model="currentTask.description"
    ></textarea>

    <button>Update</button>
  </form>
  <button @click="handleDelete">Delete</button>
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
