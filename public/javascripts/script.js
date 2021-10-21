
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
document.getElementById("deleteButtonContainer").classList()[0]="d-block";