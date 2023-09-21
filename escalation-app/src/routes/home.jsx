import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import * as React from 'react';
import Button from '@mui/material/Button';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';


export default function Home() {
  const escalations = [{
    escalation_id: 1,
    header: "Esclation - Mandatory Traning",
    next_assgniee: "Name",
    pending_with: "Kamila Radomwksa",
    requested_by: "John Kowalsky",
    created_on: "13 FEB 2023",
    tag:"Trainings",
    comments: [{added_on:"13 FEB 2023", added_by:"Wojciech Zajda", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae sollicitudin tellus. Cras id pulvinar sapien. Mauris blandit lobortis scelerisque. Aliquam varius sem nec consectetur vulputate. Sed eu eleifend lacus, et pharetra velit. Vestibulum pretium quam a malesuada sodales. Aenean nec magna ultrices, mattis metus condimentum, lobortis velit. Nullam porttitor aliquet magna, sit amet mattis nunc eleifend eu. Suspendisse finibus nisi ut velit vulputate, in gravida quam tincidunt."}]
  }];

  return (
    <Accordion defaultActiveKey="0">
    {Escalations(escalations)}
  </Accordion>
  );
}

function Escalations(escalations) {
  // yes, this is a `let` for later
  console.log(escalations)
  const rows = [];
  for (let i = 0; i < escalations.length; i++) {
      rows.push(<Accordion.Item eventKey={{i}}>
      <Accordion.Header><div className="accord-header"><div>{escalations[i].header}</div> <Badge>{escalations[i].tag}</Badge></div></Accordion.Header>
      <Accordion.Body className="body-accordion">
      <div>
      <h4 className="">Workflow</h4>
      <Timeline >
      <TimelineItem className="timeline-container"> 
        <TimelineSeparator>
          <TimelineDot/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Next Assgniee: {escalations[i].next_assgniee}</TimelineContent>
      </TimelineItem>
      <TimelineItem className="timeline-container">
        <TimelineSeparator>
          <TimelineDot></TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Pending with: {escalations[i].pending_with}</TimelineContent>
      </TimelineItem>
      <TimelineItem className="timeline-container">
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          Requested by: {escalations[i].requested_by}<br/>
          Created on: {escalations[i].created_on}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
    </div>
    <div>
      Comments
        <div className="comment-container">
          {escalations[i].comments.map(function(object,i){
            return <div className="comment-single-container"> 
            Added on: <b>{object.added_on}</b><br/>
            Added by: <b>{object.added_by}</b><br/>
            <div> <br/>
            {object.content}
            </div>
          </div>
          })}
        </div>
      </div>
      <div></div>
    <div className="button-container">
      <Button variant="outlined" onClick={() => ResolveIssue(escalations[i].escalation_id)}>Mark as Solved</Button> <Button variant="contained" onClick={() => AddComment(escalations[i].escalation_id)}>Add Comment</Button>
    </div>
      
      </Accordion.Body>
    </Accordion.Item>);
  }
  console.log(rows)
  return (rows);
}
function ResolveIssue(id) {
  console.log("resolve" + id)
}
function AddComment(id) {
  console.log("Add comment" + id)
}