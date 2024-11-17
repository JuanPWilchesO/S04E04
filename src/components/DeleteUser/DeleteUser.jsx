import './DeleteUser.css'

function DeleteUser({ user, onSave, cancelAction }) {
  return (
    <div>
      <h4>{`¿Realmente deseas eliminar a ${user.first_name} ${user.last_name}?`}</h4>
      <div className='btn-group delete__buttons'>
        <button className='btn btn-warning' onClick={() => onSave(user.id)}>Eliminar</button>
        <button className='btn btn-danger' onClick={cancelAction}>Cancelar</button>
      </div>
    </div>
  )
}

export default DeleteUser 