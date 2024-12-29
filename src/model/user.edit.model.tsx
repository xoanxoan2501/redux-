import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { editUser, resetEdit } from '../redux/user/uses.slide'
import { toast } from 'react-toastify'

function EditUserModal(props: any) {
  const { isOpenEditModal, setIsOpenEditModal, dataUser } = props
  const [id, setId] = useState<number | undefined>()
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const isEditUserSuccess = useAppSelector(
    (state) => state.user.isEditUserSuccess
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (dataUser && dataUser.id) {
      setId(dataUser.id)
      setEmail(dataUser.email)
      setName(dataUser.name)
    }
  }, [dataUser])

  useEffect(() => {
    if (isEditUserSuccess === true) {
      setIsOpenEditModal(false)
      setEmail('')
      setName('')
      toast('🦄 Wow so easy! Update succeed')
      //reset redux
      dispatch(resetEdit())
    }
  }, [isEditUserSuccess])

  const handleSubmit = () => {
    console.log('Updated user: ', { email, name, id })
    dispatch(editUser({ id, email, name }))
  }

  return (
    <Modal show={isOpenEditModal} onHide={() => setIsOpenEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Name">
            <Form.Control
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => setIsOpenEditModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditUserModal
