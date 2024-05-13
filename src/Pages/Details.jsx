import { useDispatch } from "react-redux";
import Loading from "../Components/Loading";
import usePostDetails from "../Hooks/use-post-details";
import { useEffect } from "react";
import WithGaurd from "../WithGaurd";
function Details() {
    const { loading, error, record } = usePostDetails()
    const dispatch = useDispatch()
    useEffect(() => {   // This useEffect is the last block of code execute on the details page >>
        return () => {  // mean that it execute after leaving the page
            dispatch({ type: "posts/CleanRecord" })  // to Clean Record when leave details page
        };
    }, [dispatch])
    return (
        <>
            <Loading loading={loading} error={error}>
                <div style={{  overflowX: "auto" }}>
                <h1> ID : {record?.id}</h1>
                <h3> Title : {record?.title}</h3>
                <h5> Description : {record?.description}</h5>
                <p> Views : {record?.views}</p>
                </div>
            </Loading>
        </>
    )
}
export default WithGaurd(Details);