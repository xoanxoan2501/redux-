import Table from 'react-bootstrap/Table'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useEffect, useState } from 'react'
import { fetchListBlogs } from '../redux/Blog/blog.slide'
import { Button } from 'react-bootstrap'
import AddNewBlog from '../model/blog.creat.model'
import EditBlogModel from '../model/blog.edit.model'
import { DeleteBlogModel } from '../model/blog.delete.model'

function BlogTable() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchListBlogs())
    // toast.success("fetch success")
  }, [])
  const blogs = useAppSelector((state) => state.blog.listBlogs)
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const [isOpenEditModel, setIsOpenEditModal] = useState<boolean>(false)
  const [isOpenDeleteModel, setIsOpenDeleteModal] = useState<boolean>(false)
  const [dataBlog, setDataBlog] = useState({})

  const handleEditBlog = (blog: any) => {
    setDataBlog(blog)
    setIsOpenEditModal(true)
  }
  const handleDeleteUser = (blog: any) => {
    setDataBlog(blog)
    setIsOpenDeleteModal(true)
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <h4>Table blog</h4>
        <Button variant="primary" onClick={() => setIsOpenCreateModal(true)}>
          Add new
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>title</th>
            <th>author</th>
            <th>content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => {
            return (
              <tr key={blog.id}>
                {/* <td>{blog.id} </td> */}
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td> {blog.content}</td>
                <td style={{ display: 'flex' }}>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEditBlog(blog)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(blog)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <AddNewBlog
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      />
      <EditBlogModel
        isOpenEditModal={isOpenEditModel}
        setIsOpenEditModal={setIsOpenEditModal}
        dataBlog={dataBlog}
      />
      <DeleteBlogModel
        isOpenDeleteModal={isOpenDeleteModel}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        dataBlog={dataBlog}
      />
    </>
  )
}

export default BlogTable
