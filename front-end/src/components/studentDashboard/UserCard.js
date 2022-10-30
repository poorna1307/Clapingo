import { useEffect } from "react";
import { addFavTeacher } from '../../slices/StudentSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
function UserCard(props) {
    let { studentObj, isPending, isFulfilled, isRejected, errMsg } = useSelector((state) => state.studentReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(props.data);
        console.log(studentObj);
    }, [])
    const addToFav = () => {
        dispatch(addFavTeacher(props.data.teacherid));
        let teacherid = props.data.teacherid;
        let studentid = studentObj.studentid;
        axios.put('http://localhost:5000/student-api/update-fav', { studentid, teacherid })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <>
            <div className="row m-3 border p-2">
                <div className="col-3">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="img-fluid" />
                </div>
                <div className="col-6">
                    <h5>{props.data.teachername}</h5>
                    <span>{props.data.subject}</span>
                </div>
                <div className="col-3 align-self-end">
                    {studentObj.favoriteteacher.includes(props.data.teacherid) ? (
                        <button className="btn btn-light">Added to Fav</button>
                    ) : (
                        <button className="btn btn-success" onClick={addToFav}>Add to Fav</button>)}
                </div>
            </div>
        </>
    )
}

export default UserCard;