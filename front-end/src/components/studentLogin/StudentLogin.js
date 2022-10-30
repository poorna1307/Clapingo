import './StudentLogin.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { studentLogin } from '../../slices/StudentSlice';
function StudentLogin() {
    let { studentObj, isPending, isFulfilled, isRejected, errMsg } = useSelector((state) => state.studentReducer)
    const { register, handleSubmit, formState: { errors } } = useForm();
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const onFormSubmit = (loginData) => {
        dispatch(studentLogin(loginData))
    }
    useEffect(() => {
        if (isFulfilled) {
            navigate("/studentDashboard");
        }
    }, [isFulfilled, isRejected]);
    return (
        <>
            <form className="w-25 p-5 m-5 mx-auto form highlight" onSubmit={handleSubmit(onFormSubmit)}>
                <h2 className='pb-4'>Student Login</h2>
                <div className="form-group form-floating pb-3">
                    <input type="text" name="studentid" className="form-control" placeholder="Enter Your Id" {...register("studentid", { required: true })} />
                    <label htmlFor="studentId" className="form-label fs-5">Enter Your Id</label>
                </div>
                <div className="form-group form-floating pb-3">
                    <input type="password" name="password" className="form-control" placeholder="Enter Your Password" {...register("password", { required: true })} />
                    <label htmlFor="password" className="form-label fs-5">Enter Your Password</label>
                </div>

                <div className="form-gorup mt-3">
                    <button className="btn w-25 btn-primary" type="submit"
                    >Submit</button>
                </div>
            </form>
        </>
    )
}
export default StudentLogin;