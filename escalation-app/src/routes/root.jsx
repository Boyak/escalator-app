import { Navbar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { Outlet,Link  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineAssignment, MdOutlineAccountBox, MdOutlineDiversity2, MdOutlineNoteAdd,MdOutlineElevator } from "react-icons/md";

export default function Root() {
    return (
      <>
    <Navbar style={{backgroundColor: '#22577A'}} >
      <Container >
        <Navbar.Brand className="white-font" href="#home"><span className="white-font"> <MdOutlineElevator className="logo-icon"></MdOutlineElevator><b>E S C A L E T O R</b></span></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <span className="white-font">Welcome, <b>Wojciech Zajda</b></span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="ct-menu">
        <Link to="/template-creator">
            <div className="ct-menu-item">
                <MdOutlineAssignment></MdOutlineAssignment>
                <div class="ct-menu-header">Form Templates </div>
            </div>
        </Link>
        <Link to="/">
            <div className="ct-menu-item">
                <MdOutlineAccountBox></MdOutlineAccountBox>
                <div class="ct-menu-header">My Esscalations</div>
            </div>
        </Link>
        <div className="ct-menu-item">
            <MdOutlineDiversity2></MdOutlineDiversity2>
            <div class="ct-menu-header">Escalations for Me</div>
        </div>
        
        <Link to="/escalation-runner">
            <div className="ct-menu-item">
                <MdOutlineNoteAdd></MdOutlineNoteAdd>
                <div class="ct-menu-header"> New Escalation</div>
            </div>
        </Link>
        
    </div>
    <div className="main-container">
        <Outlet />
    </div>
    </>
    );
  }