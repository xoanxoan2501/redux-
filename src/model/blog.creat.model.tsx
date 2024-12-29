import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { createNewBlog, resetBlogCreate } from '../redux/Blog/blog.slide'

function AddNewBlog(props: any) {
  const { isOpenCreateModal, setIsOpenCreateModal } = props
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const isCreateBlogSuccess = useAppSelector(
    (state) => state.blog.isCreateBlogSuccess
  )

  useEffect(() => {
    if (isCreateBlogSuccess) {
      // Reset state after successful blog creation
      setIsOpenCreateModal(false)
      setTitle('')
      setAuthor('')
      setContent('')
      toast('🦄 Wow so easy! Create success')
      dispatch(resetBlogCreate()) // Resetting Redux state
    }
  }, [isCreateBlogSuccess])
  const handleSubmit = () => {
    console.log('>>> check create: ', { title, author, content })
    dispatch(createNewBlog({ title, author, content }))
  }

  return (
    <>
      <Modal
        show={isOpenCreateModal}
        onHide={() => setIsOpenCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="title"
              className="mb-3"
            >
              <Form.Control
                type="title"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="author">
              <Form.Control
                placeholder="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="content">
              <Form.Control
                placeholder="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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

export default AddNewBlog
