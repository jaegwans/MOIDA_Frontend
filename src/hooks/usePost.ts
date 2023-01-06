// // 커스텀 훅은 꼭 use로 시작해야함
// import { useCallback, useEffect, useState } from "react";
// import { instance } from "../libs/api";

// interface Record {
//   id: string;
//   createdTime: string;
//   fields: {
//     Name: string;
//     direction: "desc";
//   };
// }

// interface Response {
//   records: Record[];
// }

// const useTodos = () => {
//   const [todos, setTodos] = useState<Record[]>([]);

//   const saveTodos = useCallback(async () => {
//     const response = await instance.get<Response>("/todos");
//     setTodos(response.data.records);
//   }, []);

//   useEffect(() => {
//     saveTodos();
//   }, [saveTodos]);

//   return { todos, saveTodos };
// };

// export default useTodos;