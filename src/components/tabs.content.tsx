import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import UsersTable from './User.table'
import { Container } from 'react-bootstrap'
import BlogTable from './Blog.table'

function TabsContent() {
  return (
    <Container>
      <Tabs
        defaultActiveKey="user"
        id="uncontrolled-tab-example"
        className="mb-3 mt-3"
      >
        <Tab eventKey="user" title="Users">
          <UsersTable />
        </Tab>
        <Tab eventKey="blog" title="Blogs">
          <BlogTable />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default TabsContent
