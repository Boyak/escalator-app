import React, { useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineCircleNotifications, MdOutlineAdd } from "react-icons/md";
import Accordion from 'react-bootstrap/Accordion';



function TemplateCreator() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [formRecords, setFormRecords] = useState([
    {
      header: 'Default New 1',
      description: '',
      items: [{ firstName: '', lastName: '' }],
    },
  ]);

  const addItem = (recordIndex) => {
    const newFormRecords = [...formRecords];
    newFormRecords[recordIndex].items.push({ firstName: '', lastName: '' });
    setFormRecords(newFormRecords);
  };

  const addRecord = () => {
    setFormRecords([
      ...formRecords,
      {
        header: 'Default',
        description: '',
        items: [{ firstName: '', lastName: '' }],
      },
    ]);
  };

  const removeRecord = (index) => {
    const newFormRecords = [...formRecords];
    newFormRecords.splice(index, 1);
    setFormRecords(newFormRecords);
  };

  const handleInputChange = (recordIndex, field, event) => {
    setFormRecords((prevFormRecords) => {
      const newFormRecords = [...prevFormRecords];
      newFormRecords[recordIndex][field] = event.target.value;
      return newFormRecords;
    });
  };
  
  const handleItemInputChange = (recordIndex, itemIndex, event) => {
    setFormRecords((prevFormRecords) => {
      const newFormRecords = [...prevFormRecords];
      newFormRecords[recordIndex].items[itemIndex][event.target.name] = event.target.value;
      return newFormRecords;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formRecords.
    console.log(formRecords);
  };
  return (
  <div>
    <div>

      <div className='page-header'><h1>Escalation</h1><span onClick={()=>addRecord()}><MdOutlineAdd></MdOutlineAdd>Create New</span></div>
      <Accordion defaultActiveKey="0">
      {formRecords.map((record, recordIndex) => (
      <Accordion.Item eventKey={{recordIndex}}>
      <Accordion.Header>{record.header}</Accordion.Header>
      <Accordion.Body >
      <div className='escalation-container'>
      <Button onClick={handleShow}><MdOutlineCircleNotifications></MdOutlineCircleNotifications>Manage Notification Content</Button>
      <form onSubmit={handleSubmit}>
      <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
        {record.items.map((item, index) => (
          <TimelineItem className="timeline-container-creator"> 
          <TimelineSeparator>
          <TimelineDot className='timeline-dot'>{item.order = index}</TimelineDot >
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className='selector-container' key={index}>
            <div className='target-container'>
              <span>Asaginee</span><br/>
                <select name="delagate"   onChange={(e) => handleItemInputChange(recordIndex, index, e)}>
                  <option>-- default</option>
                  <option>Escalate to Manager</option>
                  <option>Escalate to Director</option>
                  <option>Escalate to Group Owner</option>
                  <option>-- Groups</option>
                  <option>Project Managment</option>
                  <option>IT Security</option>
                  <option>HR</option>
                  <option>-- People</option>
                  <option>Wojciech Zajda</option>
                  <option>Grzegorz Tukin</option>
                </select>
                {index > 0 && (
                <Button type="button" onClick={() => removeItem(index)}>
                  Remove
                </Button>
              )}
            </div>
            <div className="additional-data">
              <div>
                Urgency<br/>
                <select name="urgency"   onChange={(e) => handleItemInputChange(recordIndex, index, e)}>
                  <option>urgency</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div> 
                Due Days<br/>
                <input
                  placeholder='14 days'
                  type="text"
                  name="firstName"
                  value={item.firstName}
                  onChange={(e) => handleItemInputChange(recordIndex, index, e)}
                  required/>
              </div>
              <div>
                Notification Channels<br/>
              <select name="notification"   onChange={(e) => handleItemInputChange(recordIndex, index, e)}>
                  <option>Teams</option>
                  <option>email</option>
                  <option>SMS</option>
                </select>
              </div>

            </div>
          </div>
          </TimelineContent>
          </TimelineItem>
        ))}
        <Button type="button" onClick={()=>addItem(recordIndex)}>
          Add More Items
        </Button>
        <Button type="submit">Submit</Button>
      </Timeline>

      </form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='modal-content'>
          <div>
            <div>Header</div>
            <input className='template-selector'
            placeholder='Header'
                  type="text"
                  name="header"
                  value={record.header}
                  onChange={(e) => handleInputChange(recordIndex, 'header', e)}
                  required
                />
          </div>
          <div>
            <div>Content</div>
            <textarea style={{height: 200 + "px"}}
            className='template-selector'
                  type="text"
                  name="description"
                  value={record.description}
                  onChange={(e) => handleInputChange(recordIndex, 'description', e)}
                  required
              />
          </div>
      </div>              

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      </div>
      </Accordion.Body>
      </Accordion.Item>
      ))}
      </Accordion>
    </div>
  </div>
  );
}

export default TemplateCreator;