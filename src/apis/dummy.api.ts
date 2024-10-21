import {DummyItemI,} from '../types/dummy.type.ts'
export const fetchDummyImages=async (size:number):Promise<DummyItemI>=>{
  const response =await fetch(`https://dummyjson.com/image/${size}`);
  const blob= await response.blob()
  return {size, blob}
}