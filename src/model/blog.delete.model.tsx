import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { deleteBlog, resetBlogDelete } from '../redux/Blog/blog.slide'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export function DeleteBlogModel(props: any) {
  const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props
  const dispatch = useAppDispatch()
  const isDeleteBlogSuccess = useAppSelector(
    (state) => state.blog.isDeleteBlogSuccess
  )
  useEffect(() => {
    if (isDeleteBlogSuccess === true) {
      setIsOpenDeleteModal(false)
      toast('🦄 Wow so easy! Create success')

      dispatch(resetBlogDelete())
    }
  })
  const handleSubmit = () => {
    console.log('>>> check delete: ', { id: dataBlog?.id ?? '' })
    dispatch(deleteBlog({ id: dataBlog?.id ?? '' }))
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
        <h4> Delete the blog: {dataBlog?.title ?? ''}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setIsOpenDeleteModal(false)}>Close</Button>
        <Button onClick={() => handleSubmit()}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}
