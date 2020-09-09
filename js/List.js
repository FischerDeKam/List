var listType = '';
var subItemIndex = 0;
var listBadge = 0;

function appStart(type) {
  listType = type;
  load();
}

function addRow(rowNumber) {
  var trashCan = '<svg xmlns="http://www.w3.org/2000/svg" onClick="deleteRow(this)" class="icon icon-tabler icon-tabler-trash trash-icon" width="52" height="52" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F44336" fill="none" stroke-linecap="round" stroke-linejoin="round" style="float: right;"><path stroke="none" d="M0 0h24v24H0z"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>';
  var arrowDownIcon = '<svg xmlns="http://www.w3.org/2000/svg" onclick="openSubitemNav(this)" class="icon icon-tabler icon-tabler-caret-down" width="52" height="52" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4CAF50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M18 15l-6-6l-6 6h12" transform="rotate(180 12 12)" /></svg>';
  var listItem = document.getElementById('listItem');
  var listSubitem = document.getElementById('listSubitem');
  var table = document.getElementById('display-table');
  var rowCount = table.rows.length;
  if (listItem.value !== "" || listSubitem.value !== "") {
    if (rowNumber >= 0) {
      var row = table.insertRow(rowNumber);
      row.insertCell(0).innerHTML = '\xa0\xa0\xa0' + listSubitem.value;
      row.insertCell(1).innerHTML = trashCan;
      document.getElementById("listSubitem").value = "";
    } else {
      var row = table.insertRow(rowCount);
      row.insertCell(0).innerHTML = listItem.value;
      row.insertCell(1).innerHTML = arrowDownIcon + trashCan;
      document.getElementById("listItem").value = "";
    }
  }
}

function addSubitem() {
  var listSubitem = document.getElementById('listSubitem');
  if (listSubitem.value !== "") {
    addRow(subItemIndex+1);
    closeSubitemNav();
  }
}
 
function deleteRow(obj) {  
  var index = obj.parentNode.parentNode.rowIndex;
  var table = document.getElementById('display-table');
  table.deleteRow(index);
}

function save() {
  var r = confirm("Save List?");
  if (r == true) {
    var listToSave = document.getElementById('display-table').innerHTML;
    var d = new Date();
    listLastSaveDate = d.toLocaleString();
    getBadgeValue();
    switch(listType) {
      case 'Grocery':
        localStorage.setItem('SavedGroceryList', listToSave);
        localStorage.setItem('GroceryListLastSaveDate', listLastSaveDate);
        localStorage.setItem('SavedGroceryListBadge', listBadge);
        break;
      case 'Chores':
        localStorage.setItem('SavedChoresList', listToSave);
        localStorage.setItem('ChoresListLastSaveDate', listLastSaveDate);
        localStorage.setItem('SavedChoresListBadge', listBadge);
        break;
      case 'ToDo':
        localStorage.setItem('SavedToDoList', listToSave);
        localStorage.setItem('ToDoListLastSaveDate', listLastSaveDate);
        localStorage.setItem('SavedToDoListBadge', listBadge);
        break;
      default:
        console.log('save(): Type Error: ', listType);
        break;
    }
    document.getElementById('listLastSaveDate').innerHTML = listLastSaveDate;
    document.getElementById('count-badge').innerHTML = listBadge;
    displaySaveSnackbar();
  }
}

function load() {
  switch(listType) {
    case 'Grocery':
      var loadSavedList = localStorage.getItem('SavedGroceryList');
      if (loadSavedList) {
        document.getElementById('display-table').innerHTML = loadSavedList;
      }
      var savedLastSaveDate = localStorage.getItem('GroceryListLastSaveDate');
      if (savedLastSaveDate) {
        document.getElementById('listLastSaveDate').innerHTML = savedLastSaveDate;
        displayLoadSnackbar();
      }
      var savedGroceryListBadge = localStorage.getItem('SavedGroceryListBadge');
      if (savedGroceryListBadge) {
        document.getElementById('count-badge').innerHTML = savedGroceryListBadge;
      }
      break;
    case 'Chores':
      var loadSavedList = localStorage.getItem('SavedChoresList');
      if (loadSavedList) {
        document.getElementById('display-table').innerHTML = loadSavedList;
      }
      var savedLastSaveDate = localStorage.getItem('ChoresListLastSaveDate');
      if (savedLastSaveDate) {
        document.getElementById('listLastSaveDate').innerHTML = savedLastSaveDate;
        displayLoadSnackbar();
      }
      var savedChoresListBadge = localStorage.getItem('SavedChoresListBadge');
      if (savedChoresListBadge) {
        document.getElementById('count-badge').innerHTML = savedChoresListBadge;
      }
      break;
    case 'ToDo':
      var loadSavedList = localStorage.getItem('SavedToDoList');
      if (loadSavedList) {
        document.getElementById('display-table').innerHTML = loadSavedList;
      }
      var savedLastSaveDate = localStorage.getItem('ToDoListLastSaveDate');
      if (savedLastSaveDate) {
        document.getElementById('listLastSaveDate').innerHTML = savedLastSaveDate;
        displayLoadSnackbar();
      }
      var savedToDoListBadge = localStorage.getItem('SavedToDoListBadge');
      if (savedToDoListBadge) {
        document.getElementById('count-badge').innerHTML = savedToDoListBadge;
      }
      break;
    default:
      console.log('load(): Type Error: ', listType);
    break;
  }
}

function openNav() {
  document.getElementById('mySidenav').style.width = "100%";
}

function closeNav() {
  document.getElementById('mySidenav').style.width = "0";
}

function openSubitemNav(obj) {
  subItemIndex = obj.parentNode.parentNode.rowIndex;
  document.getElementById('subitemSidenav').style.width = "100%";
}

function closeSubitemNav() {
  document.getElementById('subitemSidenav').style.width = "0";
}

function getBadgeValue() {
  var table = document.getElementById('display-table');
  if (table) {
    listBadge = table.rows.length;
  } else {
    listBadge = 0;
  }
  var badge = document.getElementById('count-badge').innerHTML;
  badge.innerHTML = listBadge;
}

function displayLoadSnackbar() {
  var x = document.getElementById('loadDataSnackbar');
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
}

function displaySaveSnackbar() {
  var x = document.getElementById('saveSnackbar');
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
}

function displayDeleteSnackbar() {
  var x = document.getElementById('deleteSnackbar');
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
}

function deleteList() {
  var r = confirm("Delete List?");
  if (r == true) {
    var listToDelete = document.getElementById('display-table').innerHTML;
    var dateToDelete = document.getElementById('listLastSaveDate').innerHTML;
    switch(listType) {
      case 'Grocery':
        listToDelete = '';
        dateToDelete = '';
        document.getElementById('display-table').innerHTML = listToDelete;
        document.getElementById('listLastSaveDate').innerHTML = dateToDelete;
        localStorage.setItem('SavedGroceryList', listToDelete);
        localStorage.setItem('GroceryListLastSaveDate', dateToDelete);
        getBadgeValue();
        localStorage.setItem('SavedGroceryListBadge', listBadge);
        document.getElementById('count-badge').innerHTML = listBadge;
        displayDeleteSnackbar();
        break;
      case 'Chores':
        listToDelete = '';
        dateToDelete = '';
        document.getElementById('display-table').innerHTML = listToDelete;
        document.getElementById('listLastSaveDate').innerHTML = dateToDelete;
        localStorage.setItem('SavedChoresList', listToDelete);
        localStorage.setItem('ChoresListLastSaveDate', dateToDelete);
        getBadgeValue();
        localStorage.setItem('SavedChoresListBadge', listBadge);
        document.getElementById('count-badge').innerHTML = listBadge;
        displayDeleteSnackbar();
        break;
      case 'ToDo':
        listToDelete = '';
        dateToDelete = '';
        document.getElementById('display-table').innerHTML = listToDelete;
        document.getElementById('listLastSaveDate').innerHTML = dateToDelete;
        localStorage.setItem('SavedToDoList', listToDelete);
        localStorage.setItem('ToDoListLastSaveDate', dateToDelete);
        getBadgeValue();
        localStorage.setItem('SavedToDoListBadge', listBadge);
        document.getElementById('count-badge').innerHTML = listBadge;
        displayDeleteSnackbar();
        break;
      default:
        console.log('load(): Type Error: ', listType);
      break;
    }
  }
}