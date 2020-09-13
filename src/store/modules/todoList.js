import { createAction, handleActions } from "redux-actions"

// action type 정의하기
const CHANGE_INPUT = "CHANGE_INPUT"
const CREATE_TODO = "CREATE_TODO"
const DELETE_TODO = "DELETE_TODO"
const MODE_TO_READ = "MODE_TO_READ"
const MODE_TO_MODIFY = "MODE_TO_MODIFY"
const SELECT_ITEM_TO_MODIFY = "SELECT_ITEM_TO_MODIFY"
const MODIFY_TODO = "MODIFY_TODO"
const SELECT_COMPLETED_TODO = "SELECT_COMPLETED_TODO"
const RESET_INPUT = "RESET_INPUT"
const RESET_ID_TO_MODIFY = "RESET_ID_TO_MODIFY"

let id = 1
// action creator 정의하기
export const changeInput = createAction(CHANGE_INPUT, (text) => text)
export const createTodo = createAction(CREATE_TODO, (text) => text)
export const deleteTodo = createAction(DELETE_TODO, (id) => id)
export const modeToRead = createAction(MODE_TO_READ)
export const modeToModify = createAction(MODE_TO_MODIFY)
export const selectItemToModify = createAction(SELECT_ITEM_TO_MODIFY, (id) => id)
export const modifyTodo = createAction(MODIFY_TODO, (id, text) => ({ id: id, text: text }))
export const selectCompletedTodo = createAction(SELECT_COMPLETED_TODO, (id) => id)
export const resetInput = createAction(RESET_INPUT)
export const resetIdToModify = createAction(RESET_ID_TO_MODIFY)

// 초기 상태 정의
const initialState = {
  input: "",
  mode: "read",
  list: [
    {
      id: 0,
      text: "Watch tutorial in youtube",
      done: false,
    },
    {
      id: 1,
      text: "Solving an algorithm problem in programmers",
      done: false,
    },
  ],
  idToModify: "",
}

// handleActions로 리듀서 함수 작성
const todoReducer = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload,
    }),
    [CREATE_TODO]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: ++id,
        text: action.payload,
        done: false,
      }),
    }),
    [MODIFY_TODO]: (state, action) => ({
      ...state,
      list: state.list.map((todo) => (todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo)),
    }),
    [DELETE_TODO]: (state, action) => ({
      ...state,
      list: state.list.filter((todo) => todo.id !== action.payload),
    }),
    [MODE_TO_READ]: (state, action) => ({
      ...state,
      mode: "read",
    }),
    [MODE_TO_MODIFY]: (state, action) => ({
      ...state,
      mode: "modify",
    }),
    [SELECT_ITEM_TO_MODIFY]: (state, action) => ({
      ...state,
      idToModify: action.payload,
    }),
    [SELECT_COMPLETED_TODO]: (state, action) => ({
      ...state,
      list: state.list.map((todo) => (todo.id === action.payload ? { ...todo, done: true } : todo)),
    }),
    [RESET_INPUT]: (state, action) => ({
      ...state,
      input: "",
    }),
    [RESET_ID_TO_MODIFY]: (state, action) => ({
      ...state,
      idToModify: "",
    }),
  },
  initialState
)

export default todoReducer
