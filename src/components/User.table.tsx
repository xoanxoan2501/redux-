import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchListUser } from '../redux/user/uses.slide'
// import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import AddUserModal from '../model/user.creat.model'
import EditUserModal from '../model/user.edit.model'
import { DeleteUserModel } from '../model/user.delete.model'
function UsersTable() {
  const dispatch = useAppDispatch()
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [dataUser, setDataUser] = useState<any>(null)

  useEffect(() => {
    dispatch(fetchListUser())
    // toast('🦄 Wow so easy!')
  }, [dispatch])

  const users = useAppSelector((state) => state.user.listUsers)

  const handleEditUser = (user: any) => {
    setDataUser(user)
    setIsOpenEditModal(true)
  }
  const handleDeleteUser = (user: any) => {
    setDataUser(user)
    setIsOpenDeleteModal(true)
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <h4>Table user</h4>
        <Button variant="primary" onClick={() => setIsOpenCreateModal(true)}>
          Add new
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <AddUserModal
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      />

      <EditUserModal
        isOpenEditModal={isOpenEditModal}
        setIsOpenEditModal={setIsOpenEditModal}
        dataUser={dataUser}
      />

      <DeleteUserModel
        dataUser={dataUser}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
    </>
  )
}

export default UsersTable
