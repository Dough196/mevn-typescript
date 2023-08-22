<template>
  <ul class="list-group">
    <li
      class="list-group-item list-group-item-action"
      style="cursor: pointer"
      v-for="(task, index) in tasks"
      :key="task._id"
      @click="$router.push(`/tasks/${task._id}`)"
    >
      {{ index + 1 }}.
      {{ task.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Task } from '@/interfaces/Task'
import { getTasks } from '@/services/TaskService'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      tasks: [] as Task[],
    }
  },
  mounted() {
    this.loadTasks()
  },
  methods: {
    async loadTasks() {
      const res = await getTasks()
      this.tasks = res.data
    },
  },
})
</script>
