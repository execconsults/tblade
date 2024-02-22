const body = document.querySelector('body')
const toggleBtn = document.getElementById('toggleBtn')
let darkMode = localStorage.getItem("dark-mode");
const logo = document.getElementById('logo-main')
const leftbtn = document.getElementById('leftBtn')
const sidenav = document.querySelector('.sidenav')
const noneClass = document.querySelectorAll('.none-class')
const content = document.querySelector('.content')
const totalbtn = document.querySelectorAll('.missing')
const removetotalbtn = document.querySelector('.removetotal')
const totalcard = document.querySelector('.totalcard')

//dark Mode
const enableDarkMode = () => {
    body.classList.toggle('dark')

    localStorage.setItem("dark-mode", "enabled");
  };
  
  const disableDarkMode = () => {
    body.classList.remove('dark')
  
    localStorage.setItem("dark-mode", "disabled");
  };
  
  if (darkMode === "enabled") {
    enableDarkMode(); // set state of darkMode on page load
  }
  
  toggleBtn.addEventListener("click", (e) => {
    console.log('ok')
    darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
    if (darkMode === "disabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
  
    }
  });
  

if(leftbtn){
  leftbtn.addEventListener('click',function(e){
    sidenav.classList.toggle('tab-left')
    logo.classList.toggle('logo-left')
    for(let classes of noneClass){
      classes.classList.toggle('none')
    }
    content.classList.toggle('left')
  })
}

for(let totalbtns of totalbtn){
  totalbtns.addEventListener('click',function(e){
    totalcard.classList.remove('none')
  })
}
removetotalbtn.addEventListener('click',function(e){
  totalcard.classList.toggle('none')
})