import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { createNewUser, resetCreate } from '../redux/user/uses.slide'
import { toast } from 'react-toastify'
function AddUserModal(props: any) {
  const { isOpenCreateModal, setIsOpenCreateModal } = props
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const IsCreateSuccess = useAppSelector((state) => state.user.isCreateSuccess)
  useEffect(() => {
    if (IsCreateSuccess === true) {
      setIsOpenCreateModal(false)
      setEmail('')
      setName('')
      toast('🦄 Wow so easy! Create success')
      dispatch(resetCreate())
      //reset redux
    }
  }, [IsCreateSuccess])
  const handleSubmit = () => {
    //call api
    console.log('>>> check create: ', { email, name })
    dispatch(createNewUser({ email, name })) //payload
  }

  return (
    <>
      <Modal
        show={isOpenCreateModal}
        onHide={() => setIsOpenCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
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
          <Button variant="warning" onClick={() => setIsOpenCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddUserModal
