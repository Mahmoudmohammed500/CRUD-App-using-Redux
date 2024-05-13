import { useDispatch, useSelector } from "react-redux";
import Postlist from "../Components/Postlist";
import { useCallback, useEffect } from "react";
import { deletepost, fetchposts } from "../RTK/postslice";
import Loading from "../Components/Loading";
import Add from "./Add";
import { Button } from 'react-bootstrap';
function Index() {
   const dispatch = useDispatch();
   const { records, loading, error } = useSelector((state) => state.posts);
   const { islogedin } = useSelector(state => state.auth)
   useEffect(() => {
      dispatch(fetchposts())
   }, [dispatch]);

   const deleteRecord = useCallback((record) => dispatch(deletepost(record)), [dispatch]);
   return (
      <>
         <Loading loading={loading} error={error}>
            <Postlist data={records} deleteRecord={deleteRecord} islogedin={islogedin} />
         </Loading>
      </>
   )
}
export default Index;
export {Add};
export {Button};

