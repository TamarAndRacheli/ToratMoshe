import useAxios from 'axios-hooks'
import { useEffect } from 'react'

export const useGetAxiosApi = (url)=>{
    const{data, louding, error, refetch}=useAxios(url)

    useEffect(()=>{console.log("data",data);},[data]);
    useEffect(()=>{console.log("error", error),[error]})

    return {data, louding, error, refetch} //data, louding, - כל זמן שלא קיבל את הנתונים error, refetch - ע"מ להפעיל מחדש פונקציה לאחר שהיה שינוי בטבלה
}