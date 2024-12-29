import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { editBlog, resetBlogEdit } from '../redux/Blog/blog.slide'

function EditBlogModel(props: any) {
  const { isOpenEditModal, setIsOpenEditModal, dataBlog } = props
  const dispatch = useAppDispatch()
  const [id, setId] = useState<number | undefined>()
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const isEditBlogSuccess = useAppSelector(
    (state) => state.blog.isEditBlogSuccess
  )
  useEffect(() => {
    if (isOpenEditModal === true) {
      setIsOpenEditModal(false)
      setTitle('')
      setAuthor('')
      setContent('')
      toast('🦄 Wow so easy! Create success')
      dispatch(resetBlogEdit())
      //reset redux
    }
  }, [isEditBlogSuccess])
  useEffect(() => {
    if (dataBlog && dataBlog.id) {
      setId(dataBlog.id)
      setTitle(dataBlog.title) // Assuming 'title' is the property for the title
      setAuthor(dataBlog.author) // Assuming 'author' is the property for the author
      setContent(dataBlog.content) // Assuming 'content' is the property for the content
    }
  }, [dataBlog])

  const handleSubmit = () => {
    console.log('>>> check create: ', { title, author, content, id })
    dispatch(editBlog({ title, author, content, id }))
  }

  return (
    <>
      <Modal show={isOpenEditModal} onHide={() => setIsOpenEditModal(false)}>
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
            <FloatingLabel controlId="floatingTextarea2" label="content">
              <Form.Control
                as="textarea"
                placeholder="content"
                style={{ height: '100px' }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
    </>
  )
}

export default EditBlogModel
