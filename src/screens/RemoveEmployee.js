import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function RemoveEmployee() {
	const { id } = useParams();
	const history = useHistory();
	const MySwal = withReactContent(Swal);

	useEffect(() => {
		async function removeEmployee() {
			await axios({
				url: `https://humanresources.cleverapps.io/employees/${id}`, 
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			}).then((res) => {
				const response = res.data
				if(response.code === 200) {
					MySwal.fire({
						title: <p>{response.message}</p>,
						toast: true,
						icon: "success",
						position: 'bottom-end',
						timer: 2500,
						timerProgressBar: true
					}).then(() => {
						history.push("/")	
					})
				}
			}).catch(err => {
				MySwal.fire({
					title: <p>{err.JsonResponse.data.message}</p>,
					toast: true,
					icon: "error",
					position: 'bottom-end',
					timer: 2500,
					timerProgressBar: true
				})
			})
		}
		removeEmployee();
	}, [])
	
	return (
		<div>
		</div>
	)
}

export default RemoveEmployee;