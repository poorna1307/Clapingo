import './StudentDashboard.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserCard from './UserCard';
import FavList from './FavList';
import { useSelector } from 'react-redux';
function StudentDashboard() {
    const [teachersData, setTeachersData] = useState([]);
    let { studentObj, isPending, isFulfilled, isRejected, errMsg } = useSelector((state) => state.studentReducer)
    useEffect(() => {
        axios.get('http://localhost:5000/teacher-api/getteachers')
            .then(response => {
                setTeachersData(response.data.payload);
                console.log(studentObj.favoriteteacher);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    return (
        <>
            <div className="row justify-content-around">
                <div className="col-4 highlight p-3">
                    {
                        teachersData.map((teacherData, indx) => <UserCard data={teacherData} key={indx} />)
                    }
                </div>

                <div className="col-4 highlight p-3">
                    {
                        studentObj.favoriteteacher.map((favteacher, indx) => <FavList data={favteacher} teacherData={teachersData} key={indx} />)
                    }
                </div>
            </div>
        </>
    )
}

export default StudentDashboard;