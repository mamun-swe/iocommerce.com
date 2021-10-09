import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

export function useQuery() {
    let location = useLocation()
    const parsed = queryString.parse(location.search)
    return parsed
}