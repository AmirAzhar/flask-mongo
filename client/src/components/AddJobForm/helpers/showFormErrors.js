import validator from "validator";

export default function showFormErrors(event) {
  let invalidFlag = [];
  if (!event.target.company.value.length > 0) invalidFlag[0] = 1;
  if (!event.target.jobTitle.value.length > 0) invalidFlag[1] = 1;
  if (!validator.isURL(event.target.link.value)) invalidFlag[2] = 1;
  if (event.target.remarks.value.length > 100) invalidFlag[3] = 1;

  if (invalidFlag.length) {
    if (invalidFlag[0]) {
      document.getElementById("invalidCompany").classList.remove("hidden");
      document.getElementById("invalidCompany").style.display = "visible";
    }
    if (invalidFlag[1]) {
      document.getElementById("invalidJob").classList.remove("hidden");
      document.getElementById("invalidJob").style.display = "visible";
    }
    if (invalidFlag[2]) {
      document.getElementById("invalidLink").classList.remove("hidden");
      document.getElementById("invalidLink").style.display = "visible";
    }
    if (invalidFlag[3]) {
      document.getElementById("invalidRemarks").classList.remove("hidden");
      document.getElementById("invalidRemarks").style.display = "visible";
    }
    return true;
  }
  return false;
}
