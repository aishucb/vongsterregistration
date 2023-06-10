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
    <div>
      <form id="myForm" onSubmit={handleFormSubmit}>
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
          <div>
            <label>Gender</label>
            <input name="Gender" required />
            <br />
            <label>City</label>
            <input name="City" required />
            <br />
            <label>Grade</label>
            <select name="Grade">
              <option value="1" selected>
                1st Grade
              </option>
              <option value="2">2nd Grade</option>
              <option value="3">3rd Grade</option>
              <option value="4">4th Grade</option>
              <option value="5">5th Grade</option>
            </select>
            <br />
            <label>School</label>
            <input name="School" required />
            <br />
            <label>Phone No</label>
            <input name="Phone No" required />
            <br />
            <label>Email</label>
            <input name="Email" type="email" required />
            <br />
            <label>Areas of interest</label>
            <br />
            <input type="checkbox" name="Areas of interest" value="Option 1" /> Option 1
            <br />
            <input type="checkbox" name="Areas of interest" value="Option 2" /> Option 2
            <br />
            <input type="checkbox" name="Areas of interest" value="Option 3" /> Option 3
            <br />
            <input type="checkbox" name="Areas of interest" value="Option 4" /> Option 4
          </div>
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SaveFormData;
