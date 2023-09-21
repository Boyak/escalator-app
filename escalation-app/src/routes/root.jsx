import { Navbar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { Outlet,Link  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineAssignment, MdOutlineAccountBox, MdOutlineDiversity2, MdOutlineNoteAdd } from "react-icons/md";

export default function Root() {
    return (
      <>
    <Navbar style={{backgroundColor: '#BEFFC7'}} >
      <Container >
        <Navbar.Brand href="#home">Escalator</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Wojciech Zajda</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="ct-menu">
        <Link to="/template-creator">
            <div className="ct-menu-item">
                <MdOutlineAssignment></MdOutlineAssignment>
                <div>Form Templates </div>
            </div>
        </Link>
        <Link to="/">
            <div className="ct-menu-item">
                <MdOutlineAccountBox></MdOutlineAccountBox>
                <div>My Esscalations</div>
            </div>
        </Link>
        <div className="ct-menu-item">
            <MdOutlineDiversity2></MdOutlineDiversity2>
            <div>Escalations for Me</div>
        </div>
        
        <Link to="/escalation-runner">
            <div className="ct-menu-item">
                <MdOutlineNoteAdd></MdOutlineNoteAdd>
                <div> New Escalation</div>
            </div>
        </Link>
        
    </div>
    <div className="main-container">
        <Outlet />
    </div>
    </>
    );
  }