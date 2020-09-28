<template>
  <div class="container">
    <h1>Latest Task</h1>
    <div class="create-tasklist">
      <label for="create-task">Enter your task's name</label>
      <input type="text" id="create-task" v-model="task" placeholder="Create a task">
      <button v-on:click="createTask">Insert new task</button>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="tasklist-container">
      <div class="tasklist"
        v-for="(tasklist, index) in tasklist"
        v-bind:item="tasklist"
        v-bind:index="index"
        v-bind:key="tasklist._id"
        v-on:dblclick="deleteTask(tasklist._id)"
      >
        {{ `${tasklist.dateCreated.getDate()}/${tasklist.dateCreated.getMonth()}/${tasklist.dateCreated.getFullYear()}`}}
        <p class="task">{{ tasklist.task}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import tasklistService from '../tasklistService'
export default {
  name: 'tasklistComponent',
  data() {
    return {
      tasklist: [],
      error: '',
      task: ''
    }
  },
  async created() {
    try {
      this.tasklist = await tasklistService.getTasklist();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createTask() {
      await tasklistService.insertTasklist(this.task);
      this.tasklist = await tasklistService.getTasklist();
    },
    async deleteTask(id) {
      await tasklistService.deleteTasklist(id);
      this.tasklist = await tasklistService.getTasklist();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.tasklist {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.dateCreated-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
