import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import '../App.css';

function SaveFormData() {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const showMore = () => {
    document.getElementById("more").style.display="none";
    setShowDetails(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = $('#myForm').serializeArray();
    const areasOfInterest = [];

    $('input[name="Areas of interest"]:checked').each(function () {
      areasOfInterest.push($(this).val());
    });

    formData.push({ name: 'Areas of interest', value: areasOfInterest });

    $.ajax({
      url: 'https://api.apispreadsheets.com/data/NZq2ABehF72yT0dk/',
      type: 'post',
      data: formData,
      success: () => {
        alert('Form Data Submitted :)');
        navigate('/success');
      },
      error: () => {
        alert('There was an error :(');
      },
    });
  };

  return (
    <div id="formcontainer">
     
      <form id="myForm" onSubmit={handleFormSubmit}>
      <h6 className='section'>REGISTER <span style={{color:"#32cd32"}}>NOW</span></h6><br></br><br></br>
        <label>Name</label>
        <input name="Name" required />
        <br />
        <label>Pronoun</label>
        <input name="Pronoun" required />
        <br />
        <label>Age</label>
        <input name="Age" required />
        <br />
        <button id="more" onClick={showMore}>
          more
        </button>
        {showDetails && (
          <div className='style fade-in'>
            <label>Genter</label>
            <select name="Grade">
              <option value="female" selected>
                Female
              </option>
              <option value="Male">Male</option>
              <option value="Rather not say">Rather not say</option>
            </select>
            <br />
            <label>City</label>
            <input name="City" required />
            <br />
            <label>Grade</label>
            <select name="Grade">
              
              <option value="8" selected>8th Grade</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
            </select>
            <br />
            <label>School</label>
            <input name="School" required />
            <br />
            <label>Phone No</label>
            <input name="Phone No" required />
            <em>Please add the one with WhatsApp</em>
            <br />
            <label>Email</label>
            <input name="Email" type="email" required />
            <br />
            <label>Areas of interest</label>
            <br />
            <input type="checkbox" name="Areas of interest" value="Poverty Reduction" /> Poverty Reduction
            <br />
            <input type="checkbox" name="Areas of interest" value="Sustainable Development and Practices" /> Sustainable Development and Practices
            <br />
            <input type="checkbox" name="Areas of interest" value="Sanitation and Hygiene" /> Sanitation and Hygiene
            <br />
            <input type="checkbox" name="Areas of interest" value="Gender Empowerment" /> Gender Empowerment
            <br />
            <input type="checkbox" name="Areas of interest" value="Climate Change" /> Climate Change
            <br />
            <input type="checkbox" name="Areas of interest" value="Other" />Other
            <br />
            <label>Other areas of interest</label>
		<input name="Other areas of interest" />
		<br/>
        <label>Are you part of any social welfare projects organizations? If yes please share</label>
		<input name="Are you part of any social welfare projects organizations? If yes please share" />
		<br/>
		<label>Would you like to be added to our WhatsApp group for more details?</label>
		<select name="Would you like to be added to our WhatsApp group for more details?">
			<option value="Yes" selected>Yes</option>
			<option value="No">No</option>
		</select>
		<br/>
        <button type="submit">Submit</button>
          </div>

        )}
        
      </form>
    </div>
  );
}

export default SaveFormData;
