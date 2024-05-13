import {
    Button,
} from "react-bootstrap";
import './postlistitem.css';
import { Link, useNavigate } from "react-router-dom";
function Postlistitem(props) {
    const { data, deleteRecord, islogedin } = props;
    const navigate = useNavigate()
    const records = data && data.length > 0 ?
        (
            data.map((rec, idx) => {
                return (
                    <tr key={rec.id}>
                        <td style={{ width: "10%", textAlign: "center" }}>{++idx}</td>
                        <td style={{ width: "30%", textAlign: "center" }}>
                            <Link className="Link" to={`post/${rec.id}/details`}>
                                {rec.title.length > 22 ? `${rec.title.slice(0, 22)}...` : rec.title}
                            </Link>
                        </td>
                        <td style={{ width: "40%", textAlign: "center" }}>
                            {rec.description.length > 30 ? `${rec.description.slice(0, 30)}...` : rec.description}
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>{rec.views}</td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                            <div className="d-flex">
                              <Link className="btn btn-info me-2 text-white text-decoration-none" to={`post/${rec.id}/details`}>View</Link>
                                <Button className="me-2" variant="success" onClick={() => navigate(`post/${rec.id}/edit`)}>Edit</Button>
                                <Button className="me-2" variant="danger" onClick={() => deleteRecord(rec)} disabled={!islogedin}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                )

            })
        )
        : null
    return (
        <>
            {records}
        </>
    )
}
export default Postlistitem;