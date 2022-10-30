import './AdminLogin.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../slices/AdminSlice';
function AdminLogin() {
    const { register, handleSubmit, formState: { error } } = useForm();
    let dispatch = useDispatch()
    const onFromSubmit = (loginData) => {
        dispatch(adminLogin(loginData));
    }
    return (
        <>
            <form className="w-25 p-5 m-5 mx-auto form highlight" onSubmit={handleSubmit(onFromSubmit)}>
                <h2 className='pb-4'>Admin Login</h2>
                <div className="form-group form-floating pb-3">
                    <input type="text" name="adminid" className="form-control" placeholder="Enter Your Id" {...register("adminid", { required: true })} />
                    <label htmlFor="adminId" className="form-label fs-5">Enter Your Id</label>
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
export default AdminLogin;