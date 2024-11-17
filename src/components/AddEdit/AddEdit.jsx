import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const schema = yup
.object({
  first_name: yup.string().required('Se necesita un nombre'),
  last_name: yup.string().required('Se necesita un apellido'),
  email: yup.string().required('Se necesita un email'),
  birthday: yup.date().required('Se neesita una fecha de nacimiento'),
  password: yup.string().required('Se necesita una contraseña')
})

function AddEdit({ user = null, onSave, cancelAction }) {
  
  const defaultValues = {
    first_name: user?.firstname || '',
    last_name: user?.lastname || '',
    email: user?.email || '',
    birthday: user?.birthday || '',
    password: user?.password || ''
  }

  const { handleSubmit, register, watch, formState: {errors}, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  })

  useEffect(() => {
    if(user) {
      reset(user)
    } else {
      reset(defaultValues)
    }
  }, [user])

  const onSubmit = (data) => {
    if(user) {
      onSave(data, user.id)
    } else {
      onSave(data)
    }
  }
  return (
    <div>
      <h2>{ user ? 'Actualizar' : 'Registro' }</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label row">Firstname:</label>
          <input className="form-control" type="text" {...register("first_name")} />
          <span>{errors.username && errors.username.message}</span>
        </div>
        <div className="mb-3">
          <label className="form-label row">Lastname:</label>
          <input className="form-control" type="text" {...register("last_name")} />
          <span>{errors.password && errors.password.message}</span>
        </div>
        <div className="mb-3">
          <label className="form-label row">Email:</label>
          <input className="form-control" type="email" {...register("email")} />
          <span>{errors.email && errors.email.message}</span>
        </div>
        <div className="mb-3">
          <label className="form-label row">Birthday:</label>
          <input className="form-control" type="date" {...register("birthday")} />
          <span>{errors.birthday && errors.birthday.message}</span>
        </div>
        <div className="mb-3">
          <label className="form-label row">Password:</label>
          <input className="form-control" type="password" {...register("password")} />
          <span>{errors.password && errors.password.message}</span>
        </div>
        <div className="btn-group mx-auto">
          <button className="btn btn-success" type="submit">
            {user ? 'Actualizar' : 'Guardar'}
          </button>
          <button className="btn btn-danger" onClick={cancelAction}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default AddEdit
