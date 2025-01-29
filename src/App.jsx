import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useCrudApi from './hooks/useCrudApi'

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  birthday: '',
  image_url: ''
}

function App() {
  const { data, request, pending, error } = useCrudApi()
  const [values, setValues] = useState(initialValues)
  const [edit, setEdit] = useState(null)
  const baseUrl = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/'


  useEffect(() => {
    request({ url: baseUrl + 'users' })
  }, [])

  const add = (user) => {
    console.log("datos #######", user);

    request({
      url: baseUrl + 'users',
      method: 'POST',
      body: user
    })
  }

  const update = (id, userEdit) => {
    console.log('update #######', id, userEdit);
    request({
      url: baseUrl + `users/${id}`,
      method: 'PUT',
      body: userEdit
    })
    setEdit(null)
  }
  const remove = (id) => {
    console.log('remove #######', id);
    request({
      url: baseUrl + `users/${id}`,
      method: 'DELETE',
      id
    })
  }


  const handleChange = ({ name, value }) => {

    setValues({ ...values, [name]: value })

  }

  const handleEdit = (user) => {
    console.log('edit #######')
    setEdit(user.id)
    setValues(user)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (edit) {
      update(edit, values)
      setEdit(null)
    } else {
      add(values)
    }

    console.log(values);
    // request(url, 'POST', newUser)
    setValues(initialValues)
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">

      <div className="bg-blue-400 p-8 rounded-lg shadow-lg   border border-gray-300 mt-10">
        <h1 className='text-3xl text-blue-100'>Form by Mark</h1>
        <br />
        <form className="fspace-y-4" onSubmit={handleSubmit}>
          <div className="mt-2">
            <label className='label'>
              First Name:
              <input className='input' type="text" name="first_name" value={values.first_name} onChange={(e) => handleChange(e.target)} />
            </label>
          </div>
          <div>
            <label className='label'>
              Last Name:
              <input className='input' type="text" name="last_name" value={values.last_name} onChange={(e) => handleChange(e.target)} />
            </label>
          </div>
          <div>
            <label className='label '>
              Email:
              <input className='input' type="email" name="email" value={values.email} onChange={(e) => handleChange(e.target)} />
            </label>
          </div>
          <div>
            <label className='label'>
              Birthday:
              <input className='input' type="date" name="birthday" value={values.birthday} onChange={(e) => handleChange(e.target)} />
            </label>
          </div>
          <div>
            <label className='label'>
              Password:
              <input className='input' type="password" name="password" value={values.password} onChange={(e) => handleChange(e.target)} />
            </label>
          </div>
          <div>
            <label className='label'>
              ImageURL:
              <input className='input' type="text" name="image_url" value={values.image_url} onChange={(e) => handleChange(e.target)} />
            </label>
          </div>
          <br />
          <button className='button' type="submit">{edit ? 'Edit' : 'Create'}</button>
        </form>


      </div>
      <div className="bg-blue-400 p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-300 mt-10">

        {pending ? <p>Loading...</p> :
          <div className='card'>
            <ul>
              {data && data.results && data.results.map(user => (
                <li key={user.id}>
                  <div className='mt-10 flex flex-col items-center grid-cols-2 gap-4 w-full'>
                    <div className=" bg-white p-4 rounded-lg shadow-lg border border-gray-300 w-64">
                      {/* Imagen de perfil */}
                      <img
                        className="w-32 h-32 rounded-full object-cover mb-4"
                        src={user.image_url ? user.image_url : 'https://picsum.photos/200/300'}
                        alt={user.first_name}
                      />

                      {/* Información del usuario */}
                      <p className="bg-white border border-gray-400 text-black p-2 rounded-lg mb-2">First Name: {user.first_name}</p>
                      <p className="bg-white border border-gray-400 text-black p-2 rounded-lg mb-2">Last Name: {user.last_name}</p>
                      <p className="bg-white border border-gray-400 text-black p-2 rounded-lg mb-2">Email: {user.email}</p>
                      <p className="bg-white border border-gray-400 text-black p-2 rounded-lg mb-2">Birthday: {user.birthday}</p>


                      <button className='button'
                        onClick={() => handleEdit(user)}>Edit</button>
                      <br />
                      <button className='button'
                        onClick={() => remove(user.id)}>Delete</button>

                    </div>


                  </div>

                </li>
              ))}
            </ul>
          </div>

        }



      </div>

    </div>


  )
}

export default App
