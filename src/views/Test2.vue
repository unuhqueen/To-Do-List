<template>
  <div>
    Hello World! {{ message }}
    <div>
      <!-- 앞에 있는 title은 attribute, 뒤에 있는 title은 attribute -->
      <!-- v-bind는 생략해도 됨 -->
      <span class="text-pink-500 md:text-indigo-600" v-bind:title="title"
        >여기에 마우스를 올려다 주세요.</span
      >
    </div>
    <div>
      <p v-if="seen">이제 나를 볼 수 있어요</p>
    </div>
    <div>
      <!-- v-on을 줄인것이 @ -->
      <button class="btn" v-on:click="countUp">Click!!</button>
      <p>counter ::: {{ counter }}</p>
    </div>
    <div class="grid-cols-1">
      <div class="mx-auto w-3/4 text-left">
        <input
          type="text"
          v-model="todoText"
          class="md:border-2 md:mt-8 md:mb-4 md:p-1 inset-y-0 left-0"
          @keyup.enter="addTodo"
          placeholder="할 일을 입력하세요"
        />
        <button
          v-on:click="addTodo"
          class="border bg-gray-200 md:m-3 md:px-3 md:py-1"
        >
          입력
        </button>
      </div>

      <div>
        <table class="mx-auto w-3/4">
          <thead>
            <tr>
              <th class="md:py-2 md:border-b-4 md:border-r-4 w-1/12">순서</th>
              <th class="md:py-2 md:border-b-4  w-10/12">할 일</th>
              <th class="md:py-2 w-1/12 md:border-b-4 md:border-l-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(todo, index) in todos" :key="todo.id">
              <td class="md:py-2 md:border-r-4">{{ todo.id }}</td>
              <td class="md:py-2 md:border-l-4">{{ todo.text }}</td>
              <td class="md:py-2 md:border-l-4">
                <button class="w-1/5 h-1/5" @click="deleteEvent(index)">
                  delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      message: "Seungwon",
      title: "BAD!!!",
      seen: true,
      todos: [],
      counter: 0,
      todoText: "",
    };
  },
  created() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      //axios: GET, POST 등 RESTful API를 사용하기 위한 문법
      //await: 비동기 통신을 할 때 사용하지 않으면 페이지가 아예 로딩이 안 될 수도 있음
      //비동기 통신: 특정 조작을 했을 때만(예를 들면 클릭) 서버와 연결 되어 데이터를 보내주는 방식
      const responseData = await axios.get("http://localhost:3000/todos");
      this.todos = responseData.data;
    },
    countUp() {
      // 그냥 counter: countUp 안의 지역변수
      this.counter = this.counter + 1;
    },
    addTodo() {
      //공백일 경우
      if (!this.todoText) return;
      /*this.todos.forEach((todo) => {
        if (max < todo.id) max = todo.id;
      });
      max++;*/
      const reqObj = {
        text: this.todoText,
      };
      axios.post("http://localhost:3000/todos", reqObj).then(() => {
        this.getTodos();
      });
    },
    /*deleteEvent: function(index) {
      console.log(`backtick ${index}`);
      this.todos.splice(index, 1);
    },*/
  },
};
</script>

<style lang="scss" scoped>
/*.trashBtn {
  background: red url("~@/assets/trash.png") no-repeat fixed center;
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
}*/
</style>
