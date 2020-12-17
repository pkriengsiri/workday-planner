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

  // GIVEN I am using a daily planner to create a schedule
  // WHEN I open the planner
  // THEN the current day is displayed at the top of the calendar
  //// *Target the ID "currentDay"
  //// *Set the text content to the current day (use moment.js?)
  //// *Display should look like "Thursday, September 5th"

  // WHEN I scroll down
  // THEN I am presented with time blocks for standard business hours
  //// Target the "container" class
  //// Create an array for the work hours 9am-5pm
  //// For each element in the array, create a new time block
  //// It looks like in the container area for time-blocks there's three columns
  //// Each row should be a time-block with three columns?
  //// |Hour | Description                      | Save Button|
  //// Add a data-attribute to the time block so that it can be referenced by an event handler

  // WHEN I view the time blocks for that day
  // THEN each time block is color-coded to indicate whether it is in the past, present, or future
  //// Get the current hour
  //// Use CSS to color code the blocks based on the current hour

  // WHEN I click into a time block
  // THEN I can enter an event
  //// Use event delegation and assign a click listener to the container block, pass in attribute for time block to limit to time blocks
  //// Target the time block text (should be a form element?)
  //// Edit the text

  // WHEN I click the save button for that time block
  // THEN the text for that event is saved in local storage
  //// Create a local storage key
  //// Save the event to the key

  // WHEN I refresh the page
  // THEN the saved events persist
  //// get the localStorage keys on page load
  //// Print them to the time blocks

  // Other notes:
});
