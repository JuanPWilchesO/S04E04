import { useState } from "react"
import axios from "axios"

function useFetch() {

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function reqData ({ url, method = 'GET', body = null }) {
    
    setLoading(true)
    
    try {
      method = method.toUpperCase()
      const res = await axios({ url, method, data: method !== 'GET' ? body : null})
      const resData = res.data?.data || res.data
      switch (method) {
        case 'POST':
          setData(prev => [resData, ...prev])
          break;
        case 'PUT':
        case 'PATCH':
          setData((prev) => prev.map(item => item.id === resData.id ? resData : item))
          break;
        case 'DELETE':
          setData(prev => prev.filter((item) => item.id !== resData.id))
          break;
        default:
          setData(resData)
          break;
      }
    } catch (err){
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  return [data, reqData, loading, error]
}
export default useFetch
