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
    <div id="formcontainer" style={{textAlign:"center",backgroundColor:"#003300",color:"white",paddingBottom: "25px"}}>
     
      <form id="myForm" onSubmit={handleFormSubmit} >
      <h6 className='section' style={{color:"white"}}>REGISTER <span style={{color:"#32cd32"}}>NOW</span></h6><br></br><br></br>
        <input name="Name" placeholder='Name' required style={{textAlign:"center"}} />
      
       
        <input name="Pronoun" placeholder='Pronoun'  required style={{textAlign:"center"}}/>
        <br />
        <input name="Age" placeholder="Age" required style={{textAlign:"center"}}/>
        <br />
        <button id="more" onClick={showMore} style={{textAlign:"center",border:"solid 5px white",width:"25%"}}>
          more
        </button>
        {showDetails && (
          <div className='style fade-in'>
            
            <select name="Genter" placeholder='genter' style={{textAlign:"center"}}>
            <option value="" disabled selected hidden>Gender</option>
              <option value="female" selected>
                Female
              </option>
              <option value="Male">Male</option>
              <option value="Rather not say">Rather not say</option>
            </select>
            <br />
           
            <input name="City" placeholder='City' required style={{textAlign:"center"}}/>
            <br />
            
            <select name="Grade" style={{textAlign:"center"}}>
            <option value="" disabled selected hidden>Grade</option>
              <option value="8" >8th Grade</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
            </select>
            <br />
            
            <input name="School" placeholder='School' required style={{textAlign:"center"}}/>
            <br />
           
            <input name="Phone No" placeholder='Phone No' required style={{textAlign:"center"}}/>
            <em>Please add the one with WhatsApp</em>
            <br />
            
            <input name="Email" type="email" placeholder='Email' required style={{textAlign:"center"}}/>
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
		<input name="Are you part of any social welfare projects organizations? If yes please share" style={{textAlign:"center"}}/>
		<br/>
		
		<select name="Would you like to be added to our WhatsApp group for more details?" style={{textAlign:"center"}}>
    <option value="" disabled selected hidden>Would you like to be added to our WhatsApp group for more details?</option>
      <option value="Yes" >Yes</option>
			<option value="No">No</option>
		</select>
		<br/>
        <button type="submit" style={{textAlign:"center",border:"solid 5px white",width:"25%"}}>Submit</button>
          </div>

        )}
        
      </form>
    </div>
  );
}

export default SaveFormData;
