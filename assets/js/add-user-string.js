function printNewUserButton () { return document.getElementById('create_new_user_entry') }
function sendNewUserButton () { return document.getElementById('create_and_send') }
function userEntryElement () { return document.getElementById('user-entry-form') }

document.addEventListener('DOMContentLoaded', function () {

  // Listen for click events on the buttons (if available on the page)
  const printUserButton = printNewUserButton()
  if (printUserButton !== null) {
    printUserButton.addEventListener('click', printUserEntry)
  }
  const sendUserButton = sendNewUserButton()
  if (sendUserButton !== null) {
    sendUserButton.addEventListener('click', sendUserEntry)
  }
})

function createNewUserEntry() {
  // get values and write into object. Empty if null

  // make keyword string out of keyword inputs, keywords bound together by "_" seperated by " "
  var keywordstring = ""
  if (document.getElementById("keyword1").value !== null) {
    const keyword1 = document.getElementById("keyword1").value.trim().replaceAll(",", "").replaceAll("#", "").replaceAll(" ", "_")
    keywordstring = keywordstring.concat(keyword1 + " ")
    console.log(keywordstring)
  }
  if (document.getElementById("keyword2").value !== null) {
    const keyword2 = document.getElementById("keyword2").value.trim().replaceAll(",", "").replaceAll("#", "").replaceAll(" ", "_")
    keywordstring = keywordstring.concat(keyword2 + " ")
    console.log(keywordstring)
  }
  if (document.getElementById("keyword3").value !== null) {
    const keyword3 = document.getElementById("keyword3").value.trim().replaceAll(",", "").replaceAll("#", "").replaceAll(" ", "_")
    keywordstring = keywordstring.concat(keyword3)
  }
  //double check to avoid "  " if keywords are empty
  const keywords = keywordstring.trim().replaceAll(",", "")

  // create Object for new user with all inputs
  const newUser = new Object();
  newUser.keywords = keywords
  if (document.getElementById("account").value !== null) {
    newUser.account = document.getElementById("account").value.replaceAll(",", "")
  } else {
    newUser.account = ""
  }
  if (document.getElementById("name").value !== null && document.getElementById("name").value.trim() !== "") {
    newUser.name = document.getElementById("name").value.replaceAll(",", "")
  } else {
    newUser.name = "–"
  }
  if (document.getElementById("url").value !== null) {
    newUser.url = document.getElementById("url").value.replaceAll(",", "")
  } else {
    newUser.url = ""
  }
  if (document.getElementById("language").value !== null) {
    newUser.language = document.getElementById("language").value.replaceAll(",", "")
  } else {
    newUser.language = ""
  }
  if (document.getElementById("verification_link").value !== null) {
    newUser.verification = document.getElementById("verification_link").value.replaceAll(",", "")
  } else {
    newUser.verification = ""
  }
  if (document.getElementById("update").checked !== null) {
    newUser.update = document.getElementById("update")
    console.log(newUser.update.checked)
  }


  //const user_csv_string = newUser.account + "," + newUser.name + "," + newUser.url + "," + newUser.keywords + "," + newUser.language

  return newUser
}

// function for inputting csv strung on page
function printUserEntry() {
  const newUser = createNewUserEntry()
  let is_update = ""
  if (newUser.update.checked == true) {
    is_update = "UPDATE USER:"
  } else {
    is_update = "NEW USER:"
  }
  const user_csv_string = newUser.account.trim() + "," + newUser.name.trim() + "," + newUser.url.trim() + "," + newUser.keywords.trim() + "," + newUser.language.trim()
  console.log(user_csv_string)
  const container = document.createElement('p')
  container.setAttribute("id", "created_user_entry")
  container.appendChild(document.createTextNode(is_update))
  container.appendChild(document.createElement("br"))
  container.appendChild(document.createTextNode(user_csv_string))
  container.appendChild(document.createElement("br"))
  container.appendChild(document.createTextNode("Verfication link: " + newUser.verification))
  const element = document.getElementById('created_user_entry')
  element.replaceWith(container)
}

// function for opening email window and inputting csv string
function sendUserEntry() {
  const newUser = createNewUserEntry()
  let is_update = ""
  if (newUser.update.checked == true) {
    is_update = "UPDATE USER:"
  } else {
    is_update = "NEW USER:"
  }

  const user_csv_string = newUser.account + "," + newUser.name + "," + newUser.url + "," + newUser.keywords + "," + newUser.language
  const email_adress = document.getElementById("mail_contact").innerText
  const email_subject = encodeURIComponent(document.getElementById("mail_subject").innerText)
  const email_body = encodeURIComponent("(Add your message here)\n\n\n--–" + is_update + "–––\nUser info: " + user_csv_string + "\nVerification link: " + newUser.verification)
  const sendurl = "mailto:" + email_adress
    + "?subject=" + email_subject
    + "&body=" + email_body
  window.location = sendurl

}
