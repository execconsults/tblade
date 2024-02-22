const calender = document.querySelector('.calender')
date = document.querySelector(".date")
daysContainer = document.querySelector(".days")
prev = document.querySelector(".prev")
next = document.querySelector(".next")
todayBtn = document.querySelector(".today-btn")
gotoBtn = document.querySelector(".goto-btn")
dateInput = document.querySelector(".date-input")
eventDay = document.querySelector(".event-day");
eventDate = document.querySelector(".event-date");
eventsContainer = document.querySelector(".events");
addEventSubmit = document.querySelector(".add-btn-event");
// addEventDescription = "No description";
classEventDate = document.querySelectorAll(".class-event-date");
classEventTitle = document.querySelectorAll(".class-event-title");
classEventcard = document.querySelectorAll(".calender-card");

for(let titles of classEventTitle){
    values = JSON.parse(titles.value)
    console.log(values)
}

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
//defult event arrays
// const eventArr = [
     
//     {
//         day: 7,
//         month: 1,
//         year: 2023,
//         events:[
//             {
//                 title: "Have a nice day from",
//                 time: "12:00 AM",
//                 description: "nice day menue"
//             },
           
//         ]
//     },
// ]


// console.log(eventArr)
// getEvents() 

let eventArr = [];



for(let eventdate of classEventTitle ){
    values = JSON.parse(eventdate.value)
    const dateValue = values.Date.split("/");
    let newEvent = {day:0,month:0,year:0,events:[]};
    let day = dateValue[1];
    let month = dateValue[0];
    let year = dateValue[2];
        newEvent.day = day;
        newEvent.month = month 
        newEvent.year = year
        newEvent.events = [{
           
            title: values.Title,
            time: values.DayType,

        }]
        
        updateEvent(newEvent)
        eventArr.push(newEvent);

 }

    // console.log(eventArr)
    



//current event 


// eventArr.forEach((items)=>{
//            items.push(newEvent);
// })
    
// console.log(eventArr)




//add day functoion
function initCalender(){
    // to get prev month days and current month days
    const firstDay = new Date(year,month,1)
    const lastDay = new Date(year,month+1,0)
    const prevLastDay = new Date(year,month,0)
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;
         //update date top of calender
    date.innerHTML = months[month] + " " + year;
    //adding days to dom
    let days = "";
    //prev month days
    for(let x = day; x > 0; x--){
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`
    }
    //current month days
    for(let i = 1; i <= lastDate; i++){
        // if event present  on current day
        let event = false;
        eventArr.forEach((eventObj)=>{
            if(
                eventObj.day == i &&
                eventObj.month == month + 1 &&
                eventObj.year == year
            ){
                event = true;
            }
        })
        //if day is today add class active
        if(i == new Date().getDate() &&
         year == new Date().getFullYear() && 
         month == new Date().getMonth()){
            activeDay = i
            getActiveDay(i)
            updateEvent(i)

            //if event found
            if(event){
                days += `<div class="day today active event">${i}</div>`
            } else{
                days += `<div class="day today">${i}</div>`

            }
        } //add reminding days
    else{
        if(event){
            days += `<div class="day event">${i}</div>`
        } else{
            days += `<div class="day">${i}</div>`

        }
    }
    }
    //next month days
    for(let j = 1; j <= nextDays; j++){
        days += `<div class="day next-date">${j}</div>`
    }
    //current month days
    daysContainer.innerHTML = days;
    //add lister after creating days
    addLister();
}
initCalender()

//prev month
function prevMonth(){
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    initCalender();
}
//next month
function nextMonth(){
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    initCalender();
}
// add event listener on prev month and next month
prev.addEventListener("click",prevMonth);
next.addEventListener("click",nextMonth);

// goto date and today function
todayBtn.addEventListener("click",function(){
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalender();
})
dateInput.addEventListener("keyup",function(){

    dateInput.value = dateInput.value.replace(/[^0-9]/g, "");
})
gotoBtn.addEventListener("click",gotoDate)

function gotoDate(){
    const dateValue = dateInput.value.split("-");
    if(dateValue.length == 3){
        if(dateValue[0] > 0 && dateValue[0] < 13 && dateValue[1] > 0 && dateValue[1] < 32 && dateValue[2].length == 4){
            month = dateValue[1];
            year = dateValue[0];
            day = dateValue[2];
            initCalender();
            return;
        }
        // if(dateValue[0] > 0 && dateValue[0] < 13 && dateValue[1].length == 4){
        //         month = dateValue[0] - 1;
        //         year = dateValue[1];
        //         initCalender();
        //         return;
            
        // }
        console.log(dateValue)

    }
}

const addEventBtn = document.querySelector(".add-event");
addEventContainer = document.querySelector(".add-event-wraper");
addEventCloseBtn = document.querySelector(".close");

addEventTitle = document.querySelector(".event-name");
addEventFrom = document.querySelector(".event-time-form");
addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click",function(){
    addEventContainer.classList.add("event-active");
    addEventBtn.classList.add("none");
})
addEventCloseBtn.addEventListener("click",function(){
    addEventContainer.classList.remove("event-active");
    addEventBtn.classList.remove("none");

})
document.addEventListener("click",function(e){
if(e.target == addEventContainer && !addEventContainer.cotains(e.target)){
    addEventContainer.classList.remove("event-active");
    addEventBtn.classList.remove("none");
}
})

addEventTitle.addEventListener("input",function(e){
    addEventTitle.value = addEventTitle.value.slice(0,50);
})

addEventFrom.addEventListener("input",function(e){
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if(addEventFrom.value.length == 2){
        addEventFrom.value += ":";
    }
    if(addEventFrom.value.length > 5){
        addEventFrom.value = addEventFrom.value.slice(0,5);
    }
})
//same with time
addEventTo.addEventListener("input",function(e){
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if(addEventTo.value.length == 2){
        addEventTo.value += ":";
    }
    if(addEventTo.value.length > 5){
        addEventTo.value = addEventTo.value.slice(0,5);
    }
})



//add lister on days
function addLister(){
    const days = document.querySelectorAll(".day");
    days.forEach((day)=>{
        day.addEventListener("click",function(e){

           activeDay = Number(e.target.innerHTML);
            //call active day fter click
           getActiveDay(e.target.innerHTML);
           updateEvent(Number(e.target.innerHTML));
            console.log(updateEvent)

           days.forEach((day)=>{
                day.classList.remove("active");
              })
              if(e.target.classList.contains("prev-date")){
                  prevMonth(() =>{
                    const days = document.querySelectorAll(".day");
                    //after going pev month
                    days.forEach((day)=>{
                        if(!day.classList.contains("prev-date") &&
                           day.innerHTML == e.target.innerHTML){

                           }{
                            day.classList.add("active");
                           }
                        })
                  }, 100)
              }else   if(e.target.classList.contains("next-date")){
                prevMonth(() =>{
                  const days = document.querySelectorAll(".day");
                  //after going pev month
                  days.forEach((day)=>{
                      if(!day.classList.contains("next-date") &&
                         day.innerHTML == e.target.innerHTML){

                         }{
                          day.classList.add("active");
                         }
                      })
                }, 100)
            } else{
                e.target.classList.add("active");
              }

        })
    })
}
//active day event and tag

function getActiveDay(date){
    const day = new Date(year,month,date);
    const dayName = day.toLocaleDateString("en-US",{weekday:"long"});
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}
//function to show event of day
function updateEvent(date){
    let events = ""
    eventArr.forEach((event)=>{
        if(
            date == event.day &&
            month + 1 == event.month &&
            year == event.year
        ) {
            event.events.forEach((event)=>{
                events += `
                <div class="event">
                <div class="title flex">
                    <i class="fas fa-circle"></i>
                    <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">${event.time}</div>

            </div><br>
            `
        })
       }
    })
    if(events == ""){
        events = `
        <div class="no-event">
        <h3 class="text-bold font-bold">No Event</h3>
        </div>`;
    }
    
    eventsContainer.innerHTML = events;
    //save events when new is added
    saveEvents()
}

//function that add event to event array
addEventSubmit.addEventListener("click",function(e){
    const eventTitle = addEventTitle.value;
    const eventTimeForm = addEventFrom.value;
    const eventTImeTo = addEventTo.value;
    console.log(eventTitle,eventTimeForm,eventTImeTo)
    if(eventTitle == "" || eventTimeForm == "" || eventTImeTo == ""){
        alert("Please fill all the fields");
        return;
    }
    const timeFormArr = eventTimeForm.split(":");
    const timeToArr = eventTImeTo.split(":");
    if(
        // timeToArr.length == 2 ||
        // timeFormArr.length == 2
        timeFormArr[0] > 23 ||
        timeFormArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
    ){
        alert("Please enter valid time");
        return;
    }
    const timeFrom = convertTime(eventTimeForm);
    const timeTo = convertTime(eventTImeTo);
    console.log(timeTo,timeFrom)

    const newEvent = {
        title:eventTitle,
        time:timeFrom + " - " + timeTo,
        // description:addEventDescription,
    }
    console.log(newEvent)
    let eventAdded = false;
    //check if event is added or not
    if(eventArr.length == 0){
        eventArr.forEach((items)=>{
            if(
                items.day == activeDay &&
                items.month == month + 1 &&
                items.year == year
            ){
                items.events.push(newEvent);
                eventAdded = true;
            }
        })
        
    }

    //if event erray empty
    if(!eventAdded){
        eventArr.push({
        day:activeDay,
        month:month + 1,
        year:year,
        events:[newEvent]
        })
    }
    
    addEventContainer.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";
    //show added events
    updateEvent(activeDay);
    //add event class to new added day
    const activeDayElem = document.querySelector(".day.active");
    if(!activeDayElem.classList.contains("event-added")){
        activeDayElem.classList.add("event");
    }
 
})
//convert time to 12 hour format
function convertTime(time){
    const timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time  = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}

// function removew
eventsContainer.addEventListener("click",function(e){
  if(e.target.classList.contains("event")){
      const eventTitle = e.target.children[0].children[1].innerHTML;
     eventArr.forEach((event)=>{
            if(
            event.day == activeDay &&
            event.month == month + 1 &&
            event.year == year
        ){
        event.events.forEach((item,index)=>{
         if(item.title == eventTitle){
               event.events.splice(index,1);
           }
        });
        // if no event left in remove active
        if(event.events == 0){
            eventArr.splice(eventArr.indexOf(event),1);
            const activeDayElem = document.querySelector(".day.active");
            if(activeDayElem.classList.contains("event")){
                activeDayElem.classList.remove("event");
            }
        }
         }  
  })
  updateEvent(activeDay);
}
})


function saveEvents(){
    localStorage.setItem("events",JSON.stringify(eventArr));
}
function getEvents(){
    if(localStorage.getItem("events" === null)){
        return;
    }
    eventArr.push(... JSON.parse(localStorage.getItem("events")))

}
        
