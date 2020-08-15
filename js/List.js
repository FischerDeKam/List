var listType = '';

function appStart(type) {
  listType = type;
  load();
}

function addRow() {
  var listItem = document.getElementById("listItem");
  var table = document.getElementById("display-table");
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  row.insertCell(0).innerHTML= listItem.value;
  row.insertCell(1).innerHTML= 
  '<svg xmlns="http://www.w3.org/2000/svg" onClick="deleteRow(this)" class="icon icon-tabler icon-tabler-trash" width="52" height="52" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F44336" fill="none" stroke-linecap="round" stroke-linejoin="round" style="float: right;"><path stroke="none" d="M0 0h24v24H0z"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>';
  document.getElementById("listItem").value="";
}
 
function deleteRow(obj) {  
  var index = obj.parentNode.parentNode.rowIndex;
  var table = document.getElementById("display-table");
  table.deleteRow(index);
}

function save() {
  var r = confirm("Overwrite save data?");
  if (r == true) {
    var listToSave = document.getElementById("display-table").innerHTML;
    var d = new Date();
    listLastSaveDate = d.toLocaleString();
    switch(listType) {
      case 'Grocery':
        localStorage.setItem('SavedGroceryList', listToSave);
        localStorage.setItem('GroceryListLastSaveDate', listLastSaveDate);
        break;
      case 'Chores':
        localStorage.setItem('SavedChoresList', listToSave);
        localStorage.setItem('ChoresListLastSaveDate', listLastSaveDate);
        break;
      case 'ToDo':
        localStorage.setItem('SavedToDoList', listToSave);
        localStorage.setItem('ToDoListLastSaveDate', listLastSaveDate);
        break;
      default:
        console.log('save(): Type Error: ', listType);
        break;
    }
    // sets the date on screen
    document.getElementById('listLastSaveDate').innerHTML = listLastSaveDate;
    // snackbar DIV
    var x = document.getElementById("saveSnackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  }
}

function load() {
  switch(listType) {
    case 'Grocery':
      var loadSavedList = localStorage.getItem('SavedGroceryList');
      if (loadSavedList) {
        document.getElementById("display-table").innerHTML = loadSavedList;
      }
      var savedLastSaveDate = localStorage.getItem('GroceryListLastSaveDate');
      if (savedLastSaveDate) {
        document.getElementById('listLastSaveDate').innerHTML = savedLastSaveDate;
      }
      displayLoadSnackbar();
      break;
    case 'Chores':
      var loadSavedList = localStorage.getItem('SavedChoresList');
      if (loadSavedList) {
        document.getElementById("display-table").innerHTML = loadSavedList;
      }
      var savedLastSaveDate = localStorage.getItem('ChoresListLastSaveDate');
      if (savedLastSaveDate) {
        document.getElementById('listLastSaveDate').innerHTML = savedLastSaveDate;
      }
      displayLoadSnackbar();
      break;
    case 'ToDo':
      var loadSavedList = localStorage.getItem('SavedToDoList');
      if (loadSavedList) {
        document.getElementById("display-table").innerHTML = loadSavedList;
      }
      var savedLastSaveDate = localStorage.getItem('ToDoListLastSaveDate');
      if (savedLastSaveDate) {
        document.getElementById('listLastSaveDate').innerHTML = savedLastSaveDate;
      }
      displayLoadSnackbar();
      break;
    default:
      console.log('load(): Type Error: ', listType);
    break;
  }
}

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function displayLoadSnackbar() {
  // snackbar DIV
  var x = document.getElementById("loadDataSnackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}