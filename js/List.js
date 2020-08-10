function appStart() {
  console.log('This app was made by Fischer DeKam :)');
  checkSaveList();
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
  var listToSave = document.getElementById("display-table").innerHTML;
  var d = new Date();
  lastSaveDate = d.toLocaleString();
  localStorage.setItem('SavedList', listToSave);
  localStorage.setItem('LastSaveDate', lastSaveDate);
  // sets the date on screen
  document.getElementById('lastSaveDate').innerHTML = lastSaveDate;
  // snackbar DIV
  var x = document.getElementById("saveSnackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}

function load() {
  // Check for saved items
  var loadSavedList = localStorage.getItem('SavedList');
  // If there are any saved items, update html
  if (loadSavedList) {
    document.getElementById("display-table").innerHTML = loadSavedList;
  }
  checkSaveList();
  // snackbar DIV
  var x = document.getElementById("loadDataSnackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}

function checkSaveList() {
  var savedLastSaveDate = localStorage.getItem('LastSaveDate');
  if (savedLastSaveDate) {
    document.getElementById('lastSaveDate').innerHTML = savedLastSaveDate;
  }
}