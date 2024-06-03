var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");

var bookmarkList = [];

if( localStorage.getItem("bookmarkStorage") !==null ){
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkStorage"));
    displayData();
}

function bookmarkSubmit() {
    if( validationName() == true && validationURL()==true){
        var bookMark = {
            name: bookmarkNameInput.value,
            url: bookmarkURLInput.value
          };
        
          bookmarkList.push(bookMark);
        
          localStorage.setItem( "bookmarkStorage"  ,  JSON.stringify(bookmarkList ) );
        
          displayData();
          clearBookmark();
          
          console.log(bookmarkList);
    }

}

function clearBookmark(){
    bookmarkNameInput.value=null;
    bookmarkURLInput.value=null;
    bookmarkNameInput.classList.remove('is-valid');
    bookmarkURLInput.classList.remove('is-valid');
    
}

function displayData() {
  var bookmarkData = "";
  for (i = 0; i < bookmarkList.length; i++) {
    bookmarkData += `
    <tr>
        <td>${i +1}</td>
        <td>${bookmarkList[i].name}</td>              
        <td>
        <a href="${bookmarkList[i].url}" class="btn btn-visit">
        <i class="fa-solid fa-eye pe-2"></i>
          visit</a>
        
            
        </td>
        <td>
                <button onclick="deleteItem( ${i}  ) " class="btn btn-danger " >
                    <i class="fa-solid fa-trash-can pe-2"></i>
                    Delete
                </button>
        </td>
    </tr>
        `
  }
  

  document.getElementById("tableContent").innerHTML = bookmarkData;
}

function deleteItem( indexItem ){
    bookmarkList.splice(  indexItem , 1 );
    displayData();
}

function validationName(){

    var msgAlertNameInput=document.getElementById('msgAlertName');
    var text = bookmarkNameInput.value;
    var regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if( regex.test (text) == true){
        bookmarkNameInput.classList.add('is-valid');
        bookmarkNameInput.classList.remove('is-invalid');
        msgAlertNameInput.classList.add('d-none');
        return true;
    }
    else{
        bookmarkNameInput.classList.add('is-invalid');
        bookmarkNameInput.classList.remove('is-valid');
        msgAlertNameInput.classList.remove('d-none');
        return false;

    }
}

function validationURL(){

    var msgAlertURLInput=document.getElementById('msgAlertURL');
    var text = bookmarkURLInput.value;
    var regex = new RegExp('^(https?:\\/\\/)?' + 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
    '((\\d{1,3}\\.){3}\\d{1,3}))' + 
    '(\\:\\d+)?' + 
    '(\\/[-a-z\\d%_.~+]*)*' + 
    '(\\?[;&a-z\\d%_.~+=-]*)?' + 
    '(\\#[-a-z\\d_]*)?$', 'i'); 
    if( regex.test (text) == true){
        bookmarkURLInput.classList.add('is-valid');
        bookmarkURLInput.classList.remove('is-invalid');
        msgAlertURLInput.classList.add('d-none');
        return true;
    }
    else{
        bookmarkURLInput.classList.add('is-invalid');
        bookmarkURLInput.classList.remove('is-valid');
        msgAlertURLInput.classList.remove('d-none');
        return false;

    }
}



