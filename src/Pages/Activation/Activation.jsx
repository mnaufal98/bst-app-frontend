import axios from 'axios';
import { useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import urlAPI from '../../Support/Constant/urlAPI';


function Activation() {
	const _email = useRef();
	const navigate = useNavigate();
	// let userId = localStorage.getItem('id');
	const location = useLocation()

	const { token } = Object.fromEntries(new URLSearchParams(location.search));
	// console.log('ini woiiiii',email)

	const onSubmitCode = async () => {
		try {

			const result = await axios.post(`${urlAPI}/auth/activation`, {
				token: token
			})

            if (result.data.success) {
                toast.success(result.data.message);
              }

			setTimeout(() => {
				navigate('/login');
			}, 500);
		} catch (error) {
			if(error.response){
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message)
			}
		}
    };
    
    useEffect(() => {
        onSubmitCode()
    })
	return (
		<>
            <div>Your account is active now.</div>
            <Link to="/login">click this to login page</Link>
		</>
	);
}
export default Activation;