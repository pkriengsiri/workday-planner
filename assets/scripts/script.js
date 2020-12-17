$(document).ready(function () {
  //DOM Variables
  var dayDisplayEl = $("#currentDay");
  var containerEl = $(".container");

  // JS Variables
  var workdayHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

  // Function Definitions
  function displayDay() {
    //Write the current day to the display
    var dayDisplay = moment().format("dddd, MMMM Do");
    dayDisplayEl.text(dayDisplay);
  }

  // Displays the time blocks in the container
  function displayTimeBlocks() {
    for (var i = 0; i < workdayHours.length; i++) {
      //create the row for each time-block
      var rowEl = $("<row>");
      rowEl.addClass("row time-block");

      //create the first column of the time block for the time
      var hourColEl = $("<col>");
      hourColEl.addClass("col-1 hour");
      hourColEl.text(moment().set("hour", workdayHours[i]).format("hA"));
      rowEl.append(hourColEl);

      //create the second column of the time block for the text
      var textColEL = $("<textarea>");
      textColEL.addClass("col-10 description");
      textColEL.data("workday-hour", workdayHours[i]);
      //change the css class for background color based upon the current hour
      if (moment().hour() > workdayHours[i]) {
        textColEL.addClass("past");
      } else if (moment().hour() < workdayHours[i]) {
        textColEL.addClass("future");
      } else if (moment().hour() === workdayHours[i]) {
        textColEL.addClass("present");
      }
      //set the text to localStorage saved value if it exists
      if (localStorage.getItem(workdayHours[i]) !== null) {
        var savedText = localStorage.getItem(workdayHours[i]);
        textColEL.text(savedText);
      }
      rowEl.append(textColEL);

      //create the third column for save button
      var buttonColEl = $("<button>");
      buttonColEl.addClass("col-1 saveBtn fas fa-save");
      buttonColEl.hover(
        function () {
          $(this).removeClass("fas fa-save");
          $(this).addClass("far fa-save");
        },
        function () {
          $(this).addClass("fas fa-save");
        }
      );
      rowEl.append(buttonColEl);

      //append the row
      containerEl.append(rowEl);
    }
  }

  // Saves the task to localStorage
  function saveTask(event) {
    var text = $(this.previousElementSibling).val();
    var workdayHour = $(this.previousElementSibling).data("workday-hour");
    localStorage.setItem(workdayHour, text);
  }

  // Function Calls
  displayDay();
  displayTimeBlocks();

  // Event Listeners
  containerEl.on("click", "button", saveTask);
});
