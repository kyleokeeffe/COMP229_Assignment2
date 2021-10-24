// Filename:     script.js
// Student name: Kyle O'Keeffe
// StudentID:    301156790
// Date:         Oct. 23, 2021 


//Create event listeners for delete buttons for confirmation messages
if(getTitle == "Business Contacts" || getTitle == "Edit Business Contact"){
    let deleteButtons = document.querySelectorAll('.btn-danger');

    for(button of deleteButtons){
        button.addEventListener('click', (event)=>{
            if(!confirm("Are you sure?")){
                event.preventDefault();
            }
        });
    }
}

//Get password-confirm input box from signup form for validating against password input box 
if(getTitle == "Sign-up Form")
{
    const confirm = document.querySelector('input[name=password_confirm]');

    confirm.addEventListener('change', onChange); 
}

//Function for validating equality between password boxes on signup form  
function onChange() {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=password_confirm]');
    
    if (confirm.value === password.value) {
      confirm.setCustomValidity('');
    } else {
      confirm.setCustomValidity('Passwords do not match');
    }
}