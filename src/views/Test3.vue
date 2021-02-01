<template>
  <Todolist
    :list="todos"
    @deleteTodo="deleteTodo"
    @addTodo="addTodo"
    :totalPage="totalPage"
    @getTodos="getTodos"
    @movePage="movePage"
    @completeTask="completeTask"
  />
</template>

<script>
import axios from "axios";
import Todolist from "../components/Todolist";

export default {
  components: { Todolist },
  mounted() {
    this.getTodos();
  },
  data() {
    return {
      todos: [],
      page: 1,
      limit: 10,
      totalPage: 0,
      totalCount: 0,
    };
  },
  methods: {
    async getTodos(searchText) {
      let responseData;
      if (!searchText) {
        responseData = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&_page=${this.page}&_limit=${this.limit}`
        );
      } else {
        responseData = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&text_like=${searchText}&_page=${this.page}&_limit=${this.limit}`
        );
      }
      //axios: GET, POST 등 RESTful API를 사용하기 위한 문법
      //async, await: 비동기 통신을 할 때 사용하지 않으면 페이지가 아예 로딩이 안 될 수도 있음
      //비동기 통신: 특정 조작을 했을 때만(예를 들면 클릭) 서버와 연결 되어 데이터를 보내주는 방식

      this.todos = responseData.data;
      this.totalCount = responseData.headers["x-total-count"];
      const totalPage = () => {
        if (this.totalCount % this.limit != 0) {
          this.totalPage = parseInt(this.totalCount / this.limit) + 1;
        } else if (this.totalCount % this.limit === 0) {
          this.totalPage = parseInt(this.totalCount / this.limit);
        }
      };
      totalPage();
      this.todos = responseData.data;
      //this.listArray = responseData.data;
    },
    async addTodo(todoText, checkedValue) {
      //공백일 경우
      if (!todoText) return;

      const todoObj = {
        text: todoText,
        isChecked: checkedValue,
      };
      //todoText: 입력값
      //text는 key, this.todoText는 value
      await axios.post(`http://localhost:3000/todos`, todoObj);
      this.getTodos();
    },
    async deleteTodo(id) {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      if (this.totalCount % this.limit === 1) {
        this.page = this.totalPage - 1;
      }
      this.getTodos();
    },
    /*async searchTodo(searchText) {
      console.log(searchText);
      await axios.get(`http://localhost:3000/todos?text_like=${searchText}`);
      this.getTodos();
    }*/
    /*async changeCount(pageNum, count) {
      const req = await axios.get(
        `http://localhost:3000/todos?_page=${pageNum}&_limit=${count}`
      );
      console.log(req.data);
      this.todos = req.data;
    },*/
    movePage(page) {
      this.page = page;
      this.getTodos();
    },
    completeTask(todo) {
      todo.isComplete = !todo.isComplete;
    },
  },
};
</script>

<style lang="scss" scoped>
input,
button,
select:focus {
  outline: none;
}
</style>
