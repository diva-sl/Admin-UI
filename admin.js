

// creating an array for adding numbers in a page
var countList = new Array();
//creating an array for adding number of pagess
var addPageList = new Array();
var presentPage = 1;
var countPerEachPage = 10;
var countOfPages = 0;

function prepareList() {
for (count = 0;count< 100; count++)
countList.push(count);
countOfPages = getCountOfPages();
}
//function for creating how many how many number per each page
function getCountOfPages() {
return Math.ceil(countList.length / countPerEachPage);
}
//function for moving to next page
function getNextPage() {
presentPage += 1;
loadMyPaginationList();
}
//function for moving previous page
function getPreviousPage() {
presentPage -= 1;
loadMyPaginationList();
}
//function for moving to first page
function getFirstPage() {
presentPage = 1;
loadMyPaginationList();
}
//function for moving last page
function getLastPage() {
presentPage = countOfPages;
loadMyPaginationList();
}
//function for creating how to move between the pages
function loadMyPaginationList() {
var start = ((presentPage - 1) * countPerEachPage);
var end = start + countPerEachPage;
addPageList = countList.slice(start, end);
createPageList();
validatePageCount();
}
//function for adding numbers to each page
function createPageList() {
document.getElementById("countList").innerHTML = "";
for (p = 0; p< addPageList.length; p++) {
document.getElementById("countList").innerHTML = document.getElementById("countList").innerHTML+ addPageList[p] + "<br/>";
}
}
//function for validating real time condition like if move to last page, last page disabled etc
function validatePageCount() {
document.getElementById("next").disabled = presentPage == countOfPages ? true : false;
document.getElementById("previous").disabled = presentPage == 1 ? true : false;
document.getElementById("first").disabled = presentPage == 1 ? true : false;
document.getElementById("last").disabled = presentPage == countOfPages ? true : false;
}
//function for loading pagination functionality
function loadMyPagination() {
prepareList();
loadMyPaginationList();
}