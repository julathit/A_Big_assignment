<script setup>
import { ref, onMounted } from 'vue';

const newTask = ref('');
const tasks = ref([]);

const addTask = async () => {
  if (newTask.value.trim() !== '') {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTask.value, completed: false }),
    });
    const addedTask = await response.json();
    tasks.value.push(addedTask);
    newTask.value = '';
    console.log('send Complete')
  }
};

const removeTask = async (index) => {
  await fetch(`http://localhost:3000/tasks/${index}`, {
    method: 'DELETE',
  });
  tasks.value.splice(index, 1);
};

onMounted(async () => {
  const response = await fetch('http://localhost:3000/tasks');
  tasks.value = await response.json();
});
</script>

<template>
  <div>
    <h1>My To-Do List</h1>
    <form @submit.prevent="addTask">
      <input v-model="newTask" placeholder="Add a new task" />
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <span>{{ task.text }}</span>
        <button @click="removeTask(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
