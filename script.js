// [day, month, year] array all span class invalid
let invalidInput = document.querySelectorAll(".invalid");

// [day, month, year] array all span class text-birthday
let writeBirthdayArray = document.querySelectorAll(".text-birthday");

// [day, month, year] array all tag input
let inputsBirthday = document.querySelectorAll("input");

let btnSubmit = document.querySelector("#btn-submit");
let btnClear = document.querySelector("#btn-clear");

/* *************************************************************************************** */
// function to calculate age
function calculateAge(birthday) {
  const now = new Date();
  const birthDate = new Date(birthday);

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

/* *************************************************************************************** */

// check everything in input if it is wrong
function isWrong() {
  // day
  invalidInput[0].innerHTML =
    inputsBirthday[0].value > 31 ||
    inputsBirthday[0].value == 0 ||
    inputsBirthday[0].value == "" ||
    /[^0-9]/gi.test(inputsBirthday[0].value)
      ? "invalid"
      : "";

  // month
  invalidInput[1].innerHTML =
    inputsBirthday[1].value > 12 ||
    inputsBirthday[1].value == 0 ||
    inputsBirthday[1].value == "" ||
    /[^0-9]/gi.test(inputsBirthday[1].value)
      ? "invalid"
      : "";

  // year
  invalidInput[2].innerHTML =
    inputsBirthday[2].value < 1000 ||
    inputsBirthday[2].value == 0 ||
    inputsBirthday[2].value == "" ||
    new Date().getFullYear() <= +inputsBirthday[2].value ||
    /[^0-9]/gi.test(inputsBirthday[2].value)
      ? "invalid"
      : "";

  // Check if the combination of day, month, and year forms a valid date
  const day = parseInt(inputsBirthday[0].value, 10);
  const month = parseInt(inputsBirthday[1].value, 10);
  const year = parseInt(inputsBirthday[2].value, 10);
  const birthday = new Date(year, month - 1, day);

  if (birthday.getDate() !== day || birthday.getMonth() + 1 !== month || birthday.getFullYear() !== year) {
    invalidInput.forEach((element) => {
      element.innerHTML = "invalid date";
    });
  }
}

/* *************************************************************************************** */

// to submit data to the page => (DOM)
function submitData() {
  const day = parseInt(inputsBirthday[0].value, 10);
  const month = parseInt(inputsBirthday[1].value, 10);
  const year = parseInt(inputsBirthday[2].value, 10);
  const birthday = new Date(year, month - 1, day);

  // check if any input is wrong or not
  if (
    !(
      inputsBirthday[2].value > 999 &&
      inputsBirthday[0].value != 0 &&
      inputsBirthday[0].value != "" &&
      new Date().getFullYear() > inputsBirthday[2].value &&
      birthday.getDate() === day &&
      birthday.getMonth() + 1 === month &&
      birthday.getFullYear() === year
    )
  ) {
    return isWrong();
  }

  const age = calculateAge(birthday);

  writeBirthdayArray[0].innerHTML = age.days;
  writeBirthdayArray[1].innerHTML = age.months;
  writeBirthdayArray[2].innerHTML = age.years;

  invalidInput.forEach((element) => {
    element.innerHTML = "";
  });
}

/* *************************************************************************************** */

// event to start code
btnSubmit.addEventListener("click", () => {
  inputsBirthday.forEach((element, index) => {
    if (
      /[^0-9]/gi.test(element.value) ||
      inputsBirthday[index].value == 0 ||
      inputsBirthday[index].value == ""
    ) {
      invalidInput[index].innerHTML = "invalid input";
    } else {
      invalidInput[index].innerHTML = "";
    }
  });

  writeBirthdayArray.forEach((element) => {
    element.innerHTML = "--";
  });

  submitData();
});

/* *************************************************************************************** */

// event to clear everything
btnClear.addEventListener("click", () => {
  writeBirthdayArray.forEach((element) => {
    element.innerHTML = "--";
  });

  invalidInput.forEach((element) => {
    element.innerHTML = "";
  });

  inputsBirthday.forEach((element) => {
    element.value = "";
  });
});
