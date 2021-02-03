import {useReducer} from "react"

const numberToBook = (val: number):string => {
  // Minimum Book
  if (val < 1)
    return "001"
  // Maximum Book
  if (val > 860)
    return "860"

  // Convert valid book
  let rawStr: string = val + "";
  while (rawStr.length < 3)
    rawStr = "0" + rawStr;

  return rawStr;
}

export const UseBookCounter = ():[string, ()=>void, ()=>void] => {

  const initialState = "001";

  function reducer(state: string,action: string): string {
    let newState: string;

    switch(action) {
      case "increment":
        newState = numberToBook(parseInt(state) + 1);
        break;
      case "decrement":
        newState = numberToBook(parseInt(state) - 1);
        break;
      default:
        throw new Error(`Action ${action} not handled.`)
    }

    return newState;
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, () => dispatch("increment"), () => dispatch("decrement")]
}
