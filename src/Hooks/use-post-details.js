import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchpost } from "../RTK/postslice"
import { useParams } from "react-router-dom"
const  usePostDetails = () => {
    const {id}= useParams() 
    const dispatch = useDispatch()
    const { loading, error, record } = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(fetchpost(id))
    }, [dispatch, id])
    return { loading, error, record };
}
export default usePostDetails;