import {useReducer} from "react"

export const validateBook= (val: number):string => {
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

export const validateEntryIndex = (val: number): number => {
  if (val < 0)
    return 0
  return val;
}

export const UseCounter = (initialState: number ):[number, (amount: number)=>void, (amount: number)=>void, (amount: number)=>void] => {

  function reducer(state: number ,action: {type: string, amount: number}): number{

    switch(action.type) {
      case "increment":
        return (state + action.amount);
      case "decrement":
        return (state - action.amount);
      case "set":
        return (action.amount);
      default:
        throw new Error(`Action ${action.type} not handled.`)
    }

  }

  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, (amount: number) => dispatch({type: "increment", amount}), (amount:number) => dispatch({type: "decrement",amount}), (amount:number)=> dispatch({type:"set", amount})]
}
