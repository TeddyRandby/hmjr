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

export const UseBookCounter = ():[string, (amount: number)=>void, (amount: number)=>void] => {

  const initialState = "001";

  function reducer(state: string,action: {type: string, amount: number}): string {
    let newState: string;

    switch(action.type) {
      case "increment":
        newState = numberToBook(parseInt(state) + action.amount);
        break;
      case "decrement":
        newState = numberToBook(parseInt(state) - action.amount);
        break;
      default:
        throw new Error(`Action ${action.type} not handled.`)
    }

    return newState;
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, (amount: number) => dispatch({type: "increment", amount}), (amount:number) => dispatch({type: "decrement",amount})]
}
