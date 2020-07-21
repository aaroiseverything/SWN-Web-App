const calendar = document.querySelector("#calendarid");
const today = new Date().toDateString().slice(7,10).trim();
const dayinweek = new Date().getDay()+1; //+1 because our calendar starts on Sunday but getDay() Monday = 1

//this function checks if the day is today
function istoday(day){
    if (today == day){
        return true;
    }else{
        return false;
    }
}
//this checks if month has 28/29/30/31 days
const getDaysInMonth = date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

var positioninweek = parseInt(today)%7; //this is the position in SMTWTFS
var num = 0;
for (let i =0; i<=8; i++){
    if (positioninweek%7==parseInt(dayinweek)){
        break;
    }else{
        positioninweek += 1;
        calendar.insertAdjacentHTML("beforeend",`<div class='number'</div>`);
    }
}
for (let day = 1; day <= 31; day++ ){
    console.log(today);
    calendar.insertAdjacentHTML("beforeend", `<div class='number ${istoday(day)?"active":"" }'>${day}</div>`);
    if(day == getDaysInMonth(new Date())){
        break;
    }
}





