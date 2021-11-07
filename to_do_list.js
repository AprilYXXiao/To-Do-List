// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~HttpRequest API
class ListItem {
    constructor(id, title, isTask, isOverdue, counter) {
      this.id = id;
      this.title = title;
      this.isTask = isTask;
      this.isOverdue = isOverdue;
      this.counter = counter;
    }
  }
  
  const itemArr = [
    new ListItem(1, "Campaign Tasks", true, true, 1),
    new ListItem(2, "Learning", false, false, 14),
    new ListItem(3, "Stories", false, false, 2),
    new ListItem(4, "Sc Task", true, true, 1),
    new ListItem(5, "Portal Surveys", false, false, 2),
    new ListItem(6, "Sport", false, false, 4),
    new ListItem(7, "Sport", true, false, 7),
  ];

// create all task list
function createAllListHTMLTemp(arr) {
    let htmlTmp = "";
    arr.forEach((ele) => {
      htmlTmp += `<div class="row">
          <div class="left">
            <input type="checkbox" id="list1" name="list1" />
            <label for="list1"> ${ele.title}</label>
          </div>
          <div class="right">
            <button class="overdue-indicator"><span> ${ele.counter} Overdue</span></button>
            <button class="duesoon-indicator"><span> ${ele.counter} Due Soon</span></button>
          </div>
          </div>`;
    });
    return htmlTmp;
  }


// create finished list
function createPartListHTMLTemp(arr) {
    let htmlTmp = "";
    arr.forEach((ele) => {
      if (ele.isTask !== true) {
        htmlTmp += `<div class="row">
              <div class="left">
                <input type="checkbox" id="list1" name="list1" />
                <label for="list1"> ${ele.title}</label>
              </div>
              <div class="right">
                <button class="overdue-indicator"><span> ${ele.counter} Overdue</span></button>
                <button class="duesoon-indicator"><span> ${ele.counter} Due Soon</span></button>
              </div>
              </div>`;
      }
    });
    return htmlTmp;
  }

// toggle button????
function changeButton(arr) {
    const buttonDueSoon = document.querySelectorAll(".duesoon-indicator");
    const buttonOverdue = document.querySelectorAll(".overdue-indicator");
    buttonDueSoon.forEach((ele, i) => {
      if (arr[i].isOverdue === true) {
        //   console.log("yes");
        buttonOverdue[i].classList.add("display-overdue");
        buttonDueSoon[i].classList.add("hidden");
      } else {
        buttonOverdue[i].classList.add("hidden");
        buttonDueSoon[i].classList.add("display-duesoon");
      }
    });
  }

// render counter
// make toggle work
let htmlListTmp;
const bottomEle = document.querySelector(".bottom");

const checkbox = document.getElementById("myonoffswitch");
htmlListTmp = createPartListHTMLTemp(itemArr);
bottomEle.innerHTML = htmlListTmp;

function render(checkbox) {
  if (checkbox.checked === true) {
    htmlListTmp = createAllListHTMLTemp(itemArr);
    bottomEle.innerHTML = htmlListTmp;
    changeButton(itemArr);
  } else {
    htmlListTmp = createPartListHTMLTemp(itemArr);
    bottomEle.innerHTML = htmlListTmp;
    changeButton(itemArr);
  }
}

changeButton(itemArr);
