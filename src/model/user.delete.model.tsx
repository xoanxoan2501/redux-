import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { deleteUser, resetDelete } from '../redux/user/uses.slide'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export function DeleteUserModel(props: any) {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props
  const isDeleteUserSuccess = useAppSelector(
    (state) => state.user.isDeleteUserSuccess
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isDeleteUserSuccess === true) {
      setIsOpenDeleteModal(false)
      toast('🦄 Wow so easy! Create success')

      dispatch(resetDelete())
    }
  })
  const handleSubmit = () => {
    console.log('>>> check delete: ', { id: dataUser?.id ?? '' })
    dispatch(deleteUser({ id: dataUser?.id ?? '' }))
  }

  return (
    <Modal
      show={isOpenDeleteModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> Delete the user: {dataUser?.email ?? ''}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setIsOpenDeleteModal(false)}>Close</Button>
        <Button onClick={() => handleSubmit()}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}
