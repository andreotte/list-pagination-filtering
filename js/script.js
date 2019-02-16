/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Select all student information
const studentNodeList = document.querySelectorAll('.student-item');
const pageDiv = document.querySelector('.page');
// Convert the node list of student info to an array
const studentArray = Array.from(studentNodeList);
// Set the amount of students displayed on each page
const itemsPerPage = 10;
// Set the page number
const pageNumber = Math.ceil(studentArray.length / itemsPerPage);
const searchButton = createElement('button', 'innerText', 'Search');
const paginationDiv = createElement('div', 'className', 'pagination');
const searchInput = createElement('input', 'placeholder', 'Search for students');

function createElement(elementName, property, value) {
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
}

//Function displays the property set of students based on user's page selection
function showPage(studentList, page) {
  //Set the student info display to none for the students after the selection
  for (let i = (page * itemsPerPage); i < studentList.length; i++) {
    studentList[i].style.display = "none";
  }
  //Set the student info display to none for the students before the selection
  for (let i = 0; i < (page * itemsPerPage) - itemsPerPage; i++) {
    studentList[i].style.display = "none";
  }
  //Display the students in the selection
  for (let i = (page * itemsPerPage) - itemsPerPage; i < page * itemsPerPage; i++) {
    studentList[i].style.display = '';
  }
}

//Function appends the page links and the search bar
function appendLinksSearch(pages) {
  function appendChild (parentNode, childNode) {
    parentNode.appendChild(childNode);
  }
  //Create page links
  appendChild(pageDiv, paginationDiv);
  const pageList = createElement('ul', 'className', 'page-list');
  appendChild(paginationDiv, pageList);

  for (let i = 0; i < pages; i ++) {
    const li = createElement('li', 'className', 'page-li');
    appendChild(pageList, li);
    const a = createElement('a', 'href', '#');
    a.innerText = i + 1;
    appendChild(li, a);
  }
  //Create search tool
  const header = document.querySelector('.page-header');
  const searchDiv = createElement('div', 'className', 'student-search');
  appendChild(header, searchDiv);
  appendChild(searchDiv, searchInput);
  appendChild(searchDiv, searchButton);
}
//Call function to load page links and search bar
appendLinksSearch(pageNumber);
//Call function to display first set of 10 students
showPage(studentArray, 1);
const pageList = document.querySelector('.page-list');

//Add functionality to page links
pageList.addEventListener('click', (e) => {
    console.log('got it');
    if (e.target.tagName === 'A') {

      showPage(studentArray, parseInt(e.target.innerText));
    }
});

//Add functionality to the search bar
searchButton.addEventListener('click', (e) => {
  const searchList = [];
  //Remove old page numbers
  while (pageList.firstChild) {
    pageList.removeChild(pageList.firstElementChild);
  }
  while (paginationDiv.firstChild) {
    paginationDiv.removeChild(paginationDiv.firstElementChild);
  }
  //Hide all the student items
  for (let i = 0; i < studentArray.length; i++) {
    studentArray[i].style.display = "none";
  }
  //Push the student items that match the search to searchList
  for (let i = 0; i < studentArray.length; i++)
    if (studentArray[i].innerText.includes(searchInput.value)){
      searchList.push(studentArray[i]);
    }
    //print "no results" to the page if searchList is empty
    if (searchList.length === 0) {
      paginationDiv.innerHTML = '<h3>No results</h3>';
    }
  //Call function to display first set of 10 students in search query
  showPage(searchList, 1);
  //Call function to append new page links
  appendLinksSearch(Math.ceil(searchList.length/itemsPerPage));
  const pageListSearch = document.querySelector('.page-list');

  //Event listener specific to the page numbers appended after a search
  pageListSearch.addEventListener('click', (e) => {
      console.log('got it');
      if (e.target.tagName === 'A') {
        showPage(searchList, parseInt(e.target.innerText));
      }
  });
});
