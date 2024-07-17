
let tablinks = document.getElementsByClassName("tab-links");
let tabconts = document.getElementsByClassName("tab-conts");

function opentab(tabname) {
    for(tablink of tablinks) {
        tablink.classList.remove("act-link");
    }

    for(tabcont of tabconts) {
        tabcont.classList.remove("act-tab");
    }

    event.currentTarget.classList.add("act-link");

    document.getElementById(tabname).classList.add("act-tab");
}


let menus = document.getElementById("menus");

function openmenu(){
    menus.style.right = "0";
}

function closemenu() {
    menus.style.right = "-200px";
}

// nav bar function kapil
function highlightMenuOnScroll() {
    const sectionIds = ['#header', '#about', '#services', '#projects', '#contact-section'];
    const sections = sectionIds.map(id => document.querySelector(id));
    const navLinks = document.querySelectorAll('#menus a');

    let activeSectionIndex = sections.length - 1; 

    for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop - window.scrollY - 50 <= 0) {
            activeSectionIndex = i;
            break;
        }
    }

    navLinks.forEach((link) => {
        link.classList.remove('active-menu-item');
    });

    if (sections[activeSectionIndex]) {
        const activeSectionId = sections[activeSectionIndex].getAttribute('id');
        const activeNavLink = document.querySelector(`#menus a[href="#${activeSectionId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active-menu-item');
        }
    }
}

window.addEventListener('DOMContentLoaded', highlightMenuOnScroll);
window.addEventListener('scroll', highlightMenuOnScroll);






// Google Sheets API inspired from https://github.com/jamiewilson/form-to-google-sheets.git

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyU1ZNZ133KuEdOq9hL81KC-JSrlaQw7KJRzS2IBSmJ25zxbippdeOlwZ4G4oh2dqU0GA/exec'
  const form = document.forms['submit-to-google-sheet']

  const submitMsg = document.getElementById("submit-msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => { 
        submitMsg.innerHTML = "Message Submitted"
        setTimeout(function() {
            submitMsg.innerHTML = ""
        }, 5000)
        form.reset()
    })
      .catch(error => console.error('Error!', error.message))
  })