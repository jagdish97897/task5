import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
	const [data, setData] = useState({
		// name: '',
		// email: '',
		// location: '',
		dept_name: '',
	})
	const navigate = useNavigate()
	
	const {id} = useParams();

	useEffect(()=> {
		axios.get('http://localhost:5000/get/'+id)
		.then(res => {
			setData({...data, 
               
				dept_name: res.data.Result[0].dept_name,
				 // name: res.data.Result[0].name,
				// email: res.data.Result[0].email,
				// location: res.data.Result[0].location
			})
		})
		.catch(err =>console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('http://localhost:5000/update/'+id, data)
		.then(res => {
			if(res.data.Status === "Success") {
				navigate('/addemployee')
			}
		})
		.catch(err => console.log(err));
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Update Employee</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="dept_name" class="form-label">dept_name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter dept_Name' autoComplete='off'
					onChange={e => setData({...data, dept_name: e.target.value})} value={data.dept_name}/>
				</div>
				<div class="col-12">
					<label for="inputcategory" class="form-label">category</label>
					<input type="text" class="form-control" id="category" placeholder='Enter category' autoComplete='off'
					onChange={e => setData({...data, category: e.target.value})} value={data.category}/>
				</div>
				<div class="col-12">
					<label for="inputlocation" class="form-label">location</label>
					<input type="text" class="form-control" id="location" placeholder="Enter location name" autoComplete='off'
					onChange={e => setData({...data, location: e.target.value})} value={data.location}/>
				</div>
				<div class="col-12">
					<label for="inputsalary" class="form-label">salary</label>
					<input type="text" class="form-control" id="salary" placeholder="enter salary" autoComplete='off'
					onChange={e => setData({...data, salary: e.target.value})} value={data.salary}/>
				</div>

				<div class="col-12">
					<label for="inputemployee_id" class="form-label">employee_id</label>
					<input type="text" class="form-control" id="employee_id" placeholder="enter employee_id" autoComplete='off'
					onChange={e => setData({...data, employee_id: e.target.value})} value={data.employee_id}/>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Update</button>
				</div>
			</form>
		</div>
  )
}

export default EditEmployee