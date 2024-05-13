import {
  Table,
} from "react-bootstrap";
import Postlistitem from "./Postlistitem";
import { memo } from "react";
function Postlist(props) {
  const { data , deleteRecord ,islogedin } = props;
  return (
    <>
     <div style={{ display: "flex", justifyContent: "center" }}>
      <Table striped bordered hover> 
        <thead>
          <tr>
            <th style={{ width: "10%", textAlign: "center" }}>#</th>
            <th style={{ width: "30%", textAlign: "center" }}>Title</th>
            <th style={{ width: "40%", textAlign: "center" }}>Description</th>
            <th style={{ width: "10%", textAlign: "center" }}>Views</th>
            <th style={{ width: "10%", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <Postlistitem data={data} deleteRecord={deleteRecord} islogedin={islogedin} />
        </tbody>
      </Table>
      </div>
    </>
  )
}
export default  memo(Postlist);