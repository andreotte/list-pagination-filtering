/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentNodeList = document.querySelectorAll('.student-item');
const pageDiv = document.querySelector('.page');
// Convert the node list of student info to an array
const studentArray = Array.from(studentNodeList);
// Set the amount of students displayed on each page
const itemsPerPage = 10;
// Set the page number
const pageNumber = Math.ceil(studentArray.length / itemsPerPage);

function showPage(studentList, page) {
  for (let i = (page * itemsPerPage); i < studentList.length; i++) {
    studentList[i].style.display = "none";
  }
  for (let i = 0; i < (page * itemsPerPage) - itemsPerPage; i++) {
    studentList[i].style.display = "none";
  }
  for (let i = (page * itemsPerPage) - itemsPerPage; i < page * itemsPerPage; i++) {
    studentList[i].style.display = '';
  }
};

function appendPageLinks(pages) {
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  pageDiv.appendChild(paginationDiv);

  const pageList = document.createElement('ul');
  pageList.id = 'page-list';
  paginationDiv.appendChild(pageList);

  for (let i = 0; i < pages; i ++) {
    const li = document.createElement('li');
    pageList.appendChild(li);
    const a = document.createElement('a');
    a.innerText = i + 1;
    a.href = '#';
    li.appendChild(a);
  }
};

appendPageLinks(pageNumber);
showPage(studentArray, 1);

const pageList = document.querySelector('#page-list')

pageList.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      showPage(studentArray, parseInt(e.target.innerText))
    }
});
