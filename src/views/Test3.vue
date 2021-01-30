<template>
  <Todolist
    :list="todos"
    @deleteTodo="deleteTodo"
    @addTodo="addTodo"
    :totalPage="totalPage"
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
      limit: 5,
      totalPage: 0,
    };
  },
  methods: {
    async getTodos() {
      //axios: GET, POST 등 RESTful API를 사용하기 위한 문법
      //async, await: 비동기 통신을 할 때 사용하지 않으면 페이지가 아예 로딩이 안 될 수도 있음
      //비동기 통신: 특정 조작을 했을 때만(예를 들면 클릭) 서버와 연결 되어 데이터를 보내주는 방식
      const responseData = await axios.get(
        "http://localhost:3000/todos?_sort=id&_order=desc&_page=${this.page}&_limit=${this.limit}"
      );
      this.todos = responseData.data;
      const totalCount = parseInt(this.todos.headers["x-total-count"]);
      const totalPage = () => {
        if (totalCount % this.limit != 0) {
          this.totalPage = parseInt(totalCount / this.limit) + 1;
        } else {
          this.totalPage = parseInt(totalCount / this.limit);
        }
      };
      totalPage();

      //this.listArray = responseData.data;
    },
    async addTodo(todoText, done) {
      //공백일 경우
      if (!todoText) return;

      const todoObj = {
        text: todoText,
        checked: done,
      };
      //todoText: 입력값
      //text는 key, this.todoText는 value
      await axios.post("http://localhost:3000/todos", todoObj).then(() => {
        todoText = "";
        this.getTodos();
      });
    },
    async deleteTodo(todo) {
      await axios.delete(`http://localhost:3000/todos/${todo}`);
      if (totalCount % this.limit === 1) {
        this.page = this.totalPage - 1;
      }
      this.getTodos();
    },
    /*nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },*/
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
  },
};
</script>

<style lang="scss" scoped></style>
