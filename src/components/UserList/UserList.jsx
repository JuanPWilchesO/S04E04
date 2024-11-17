import UserCard from '../UserCard/UserCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserList.css'

function UserList({ users, openEdit, openDelete }) {
  return (
    <div className='row user__list'>
      {users.map((user) => (
        <UserCard
        key =  {user?.id}
        user = {user}
        openEdit = {openEdit}
        openDelete = {openDelete}
        />
      ))}
    </div>
  )
}

export default UserList