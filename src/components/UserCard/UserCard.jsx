import './UserCard.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

function UserCard({ user, openEdit, openDelete }) {
  return (
    <div className = "col-xl-3 col-lg-6 card">
      <h3 className='card-title row text-center text-light'>{user?.first_name} {user?.last_name}</h3>
      <div className='card-body'>
        <div>
          <h4 className='card-subtitle text-primary text-center'>Correo</h4>
          <p className='card-text text-center text-black-50'>{user?.email}</p>
        </div>
        <div>
          <h4 className='card-subtitle text-primary text-center'>Cumpleaños</h4>
          <p className='card-text text-center text-black-50'>{user?.birthday}</p>
        </div>
      </div>
      <div className='row mx-auto'>
        <div className='btn-group me-2 col'>
          <button className='row btn btn-primary' onClick={() => openEdit(user)}><i class="bi bi-pencil-square"></i></button>
        </div>
        <div className='btn-group me-2 col'>
          <button className='row btn btn-danger' onClick={() => openDelete(user)}><i class="bi bi-trash-fill"></i></button>
        </div>
      </div>
    </div>
  )
}

export default UserCard