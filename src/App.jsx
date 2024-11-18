import { useEffect, useState } from "react"
import useFetch from "./hooks/useFetch"
import HomeLayout from "./layouts/HomeLayout"
import AddEdit from "./components/AddEdit/AddEdit.jsx"
import UserList from "./components/UserList/UserList.jsx"
import Modal from "./components/Modal/Modal.jsx"
import DeleteUser from "./components/DeleteUser/DeleteUser.jsx"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'

function App() {

  const [users, setUsers, loading, error] = useFetch()
  const [isOpen, setIsOpen] = useState(false)
  const [currentChildren, setCurrentChildren] = useState(null)

  useEffect(() => {
    readUsers()
  }, [])

  //Get users
  const readUsers = () => {
    setUsers({ url: 'https://users-crud-api-81io.onrender.com/api/v1/users' })
  }

  //Create user
  const addUser = (dataForm) => {
    setUsers({
      url: 'https://users-crud-api-81io.onrender.com/api/v1/users',
      method: 'post',
      body: dataForm
    })
    setIsOpen(false)
    setCurrentChildren(null)
  }

  //Update user
  const editUser = (dataForm, id) => {
    setUsers({
      url: `https://users-crud-api-81io.onrender.com/api/v1/users/${id}`,
      method: 'patch',
      body: dataForm
    })
    setIsOpen(false)
    setCurrentChildren(null)
  }

  //Delete user
  const deleteUser = (id) => {
    setUsers({
      url: `https://users-crud-api-81io.onrender.com/api/v1/users/${id}`,
      method: 'delete'
    })
    setIsOpen(false)
    setCurrentChildren(null)
  }

  const openAdd = () => {
    setIsOpen(true)
    setCurrentChildren(<AddEdit onSave={addUser} cancelAction = {cancelAction}/>)
  }

  const openEdit = (user) => {
    setIsOpen(true)
    setCurrentChildren(<AddEdit user = {user} onSave={editUser} cancelAction = {cancelAction}/>)
  }

  const openDelete = (user) => {
    setIsOpen(true)
    setCurrentChildren(<DeleteUser user = {user} onSave = {deleteUser} cancelAction = {cancelAction}/>)
  }

  const cancelAction = () => {
    setIsOpen(false)
    setCurrentChildren(null)
  }

  return (
    
    <HomeLayout>
      <div className="navbar bg-success fixed-top">
        <div>
          <h1 className="h1 text-light">Usuarios</h1>
        </div>
        <div>
          <button className="btn btn-outline-light" onClick={openAdd}>
            <i class="bi bi-person-fill-add"></i>  Agregar usuario</button>
        </div>
      </div>
      <div className="container-fluid mt-5 pt-5">
        { loading ? (
          <h2>Cargando...</h2>
        ) : (
          <UserList users = {users} openEdit={openEdit} openDelete = {openDelete}/>
        )}
      </div>

      <Modal isOpen = {isOpen} setIsOpen={setIsOpen}>
        {currentChildren}
      </Modal>
    </HomeLayout>
  )
}

export default App
