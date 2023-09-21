
import React, { useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';

function EscalationRunner() {
  const [selectedValue, setSelectedValue] = useState(''); // State to store the selected value
  const [inputFields, setInputFields] = useState([]); // State to store input field data

  // Define an object that maps the selected value to the corresponding input fields.
  const predefinedFields = {
    option2: [
      { label: 'Number of hours missing', name: 'missingHours' },
      { label: 'project', name: 'project' },
    ],
    option1: [
      { label: 'List of tranings (separated by ";") ', name: 'trainings' },
      { label: 'Due date for trainings', name: 'duedate' },
    ],
    // Add more options as needed
  };
  const steps = [{asagniee:"Tester", urgency:"High", deadline:"14d", notification: "Teams"}]
  // Function to handle the dropdown selection
  const handleDropdownChange = (event) => {
    const selected = event.target.value;
    setSelectedValue(selected);
    setInputFields(predefinedFields[selected]);
  };
  function handleSubmit(){
    console.log(selectedValue)
  }
  return (
    <div>
      <h1>Dynamic Fields Page</h1>
      <select className='template-selector' value={selectedValue} onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        <option value="option1">Mandatory Traning Escalation</option>
        <option value="option2">Clarity Escalation</option>
        {/* Add more options as needed */}
      </select>

      {/* Render the predefined input fields based on the selected value */}
      <div>
      {selectedValue != ""?(
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem> 
          <TimelineSeparator>
          <TimelineDot className='timeline-dot'>0</TimelineDot >
          <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <form>
              {inputFields.map((field) => (
                <div key={field.name}>
                  <div className='timeline-summary'>{field.label}:</div>
                  <input type="text" name={field.name} />
                </div>
              ))}
          </form>

          <h4>Next Steps</h4>
          </TimelineContent>
        </TimelineItem>
        {steps.map((step, index) => (
                  <TimelineItem > 
                  <TimelineSeparator>
                  <TimelineDot className='timeline-dot'>{index+1}</TimelineDot >
                  <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className='timeline-summary'><b>Assignee:</b> {step.asagniee}</div>
                    <div className='timeline-summary'><b>Urgency:</b> {step.urgency}</div>
                    <div className='timeline-summary'><b>Response Due:</b> {step.deadline}</div>
                    <div className='timeline-summary'><b>Notification:</b> {step.notification}</div>

                  </TimelineContent>
                </TimelineItem>
        ))}
      </Timeline>): (<div><br/> Select template first to submit escalation</div>)}
      <div className='summary-button-container'><Button>Cancel</Button> <Button onClick={()=> handleSubmit()}>Submit</Button></div>
      
      </div>
    </div>

  );
}


export default EscalationRunner;