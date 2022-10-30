import { remFavTeacher } from '../../slices/StudentSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';

function FavList(props) {
    let { studentObj, isPending, isFulfilled, isRejected, errMsg } = useSelector((state) => state.studentReducer);
    const [status, setStatus] = useState(false);
    const [teacherData, setTeacherData] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        props.teacherData.map((teacher) => {
            if (teacher.teacherid === props.data) {
                setTeacherData(teacher);
            }
        })
        console.log(teacherData);
    }, [status])
    const removeFromFav = () => {
        dispatch(remFavTeacher(props.data));
        let teacherid = props.data;
        let studentid = studentObj.studentid;
        axios.put('http://localhost:5000/student-api/remove-fav', { studentid, teacherid })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        setStatus(!status);
    }
    return (
        <>
            <div className="row m-3 border p-2">
                <div className="col-3">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="img-fluid" />
                </div>
                <div className="col-6">
                    <h5>{teacherData.teachername}</h5>
                    <span>{teacherData.subject}</span>
                </div>
                <div className="col-3 align-self-end">
                    <button className="btn btn-danger" onClick={removeFromFav}>Remove</button>
                </div>
            </div>
        </>
    )
}

export default FavList;