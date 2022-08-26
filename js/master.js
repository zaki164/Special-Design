// hellpers //
function handleActiveAlass(arr, li) {
    arr.forEach(li => li.classList.remove('active'))
    li.classList.add('active')
}
// function handleActiveAlass(ele) {
//     ele.target.parentElement.forEach(li => li.classList.remove('active'))
//     ele.classList.add('active')
// }
function showMenu() {
    mytoggle.classList.toggle('show');
    mytoggleMenu.classList.toggle('open');
}
// reset function 
function resetfun(myarr) {
    myarr.forEach((ele, i, arr) => {
        i == 0 ? handleActiveAlass(arr, ele) : '';
    })
}


// header //
let navElements = document.querySelectorAll('.elements li a');
navElements.forEach(ele => {
    ele.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(`.${e.target.textContent.toLowerCase()}`).scrollIntoView({
            behavior: "smooth"
        })
        showMenu();
    })
})
let mytoggle = document.querySelector('.toggler');
let mytoggleMenu = document.querySelector('.elements');
mytoggle.onclick = function (e) {
    e.stopPropagation();
    showMenu();
}
mytoggleMenu.onclick = function (e) {
    e.stopPropagation();
}
document.addEventListener('click', function (e) {
    if (e.target !== mytoggle && e.target !== mytoggleMenu) {
        if (mytoggleMenu.classList.contains('open')) {
            showMenu();
        }
    }
})


//  setbox  //
let mydivtoggler = document.querySelector('.set');
let sidebar = document.querySelector('.setbox');
let check = false;
function spinAndOpen() {
    mydivtoggler.children[0].classList.toggle('fa-spin');
    mydivtoggler.classList.toggle('white-color');
    sidebar.classList.toggle('open');
    check = !check;
    localStorage.setItem('setbox', check)
}
mydivtoggler.onclick = () => spinAndOpen();
if (localStorage.getItem('setbox')) {
    if (localStorage.getItem('setbox') == 'true') {
        mydivtoggler.click();
    }
}
sidebar.addEventListener('click', function(e) {
    e.stopPropagation();
})
document.addEventListener('click', function(e) {
    if (e.target !== sidebar && e.target !== mydivtoggler) {
        if (sidebar.classList.contains('open')) {
            mydivtoggler.click();
        }
    }
})
// set colors
let mycolors = document.querySelectorAll('.colors ul li');
if (window.localStorage.getItem('color')) {
    document.documentElement.style.setProperty('--main-color', localStorage.getItem('color'));
    mycolors.forEach(li => {
        if (li.dataset.color == localStorage.getItem('color')) {
            handleActiveAlass(mycolors, li)
        }
    })
}
mycolors.forEach(li => {
    li.addEventListener('click', e => {
        handleActiveAlass(mycolors, li)
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        localStorage.setItem('color', e.target.dataset.color);
    })
})
// set random background
let handleInterval
let landingPage = document.querySelector('.landing');
let mybuttons = document.querySelectorAll('.random a');
function intervalhandle() {
    handleInterval =  setInterval(() => {
        let num = (Math.floor(Math.random() * 5)) + 1
        landingPage.style.backgroundImage = `url(imgs/0${num}.jpg)`
    }, 4000)
}
intervalhandle();
if (localStorage.getItem('randbackground')) {
    mybuttons.forEach(li => {
        if (li.dataset.background == localStorage.getItem('randbackground')) {
            handleActiveAlass(mybuttons, li)
        }
    })
    if (localStorage.getItem('randbackground') == 'no') {
        clearInterval(handleInterval);
    }
}
mybuttons.forEach(li => {
    li.addEventListener('click', e => {
        e.preventDefault();
        handleActiveAlass(mybuttons, li)
        if (e.target.dataset.background == 'no') {
            clearInterval(handleInterval);
            // landingPage.style.backgroundImage = `url(imgs/01.jpg)`
            localStorage.setItem('randbackground', 'no')
        } else {
            intervalhandle();
            localStorage.setItem('randbackground', 'yes')
        }
    })
})
//handle reset button 
let reset = document.querySelector('.reset');
reset.onclick = function () {
    resetfun(mycolors);
    resetfun(mybuttons);
    resetfun(myhandlebullets);
    mycolors.forEach(li => {
        if (li.classList.contains('active')) {
                document.documentElement.style.setProperty('--main-color', li.dataset.color);
                localStorage.setItem('color', li.dataset.color);
        }
    })
    mybuttons.forEach(li => {
        if (li.classList.contains('active')) {
            if (li.dataset.background == 'no') {
                clearInterval(handleInterval);
                localStorage.setItem('randbackground', 'no')
            } else {
                intervalhandle();
                localStorage.setItem('randbackground', 'yes')
            }
        }
    })
    myhandlebullets.forEach(li => {
        if (li.classList.contains('active')) {
            if (li.dataset.bullets == 'no') {
                bulletnav.style = 'display: none'
                localStorage.setItem('showBullets', 'no')
            } else {
                bulletnav.style = 'display: block'
                localStorage.setItem('showBullets', 'yes')
            }
        }
    })
}
// reset.onclick = function () {
//     localStorage.clear();
//     window.location.reload();
// }


// nav (side bar)(navigation bar) //
let myhandlebullets = document.querySelectorAll('.bullets a');
let bulletnav = document.querySelector('.nav')
if (localStorage.getItem('showBullets')) {
    myhandlebullets.forEach(ele => {
        if (ele.dataset.bullets == localStorage.getItem('showBullets')) {
            handleActiveAlass(myhandlebullets, ele);
        }
    })
    if (localStorage.getItem('showBullets') == 'no') {
        bulletnav.style = 'display: none'
    } else {
        bulletnav.style = 'display: block'
    }
}
myhandlebullets.forEach(li => {
    li.addEventListener('click', e => {
        e.preventDefault();
        handleActiveAlass(myhandlebullets, li);
        if (e.target.dataset.bullets == 'no') {
            bulletnav.style = 'display: none'
            localStorage.setItem('showBullets', 'no')
        } else {
            bulletnav.style = 'display: block'
            localStorage.setItem('showBullets', 'yes')
        }
    })
})
let mybullets = document.querySelectorAll('.bullet');
let divs = document.querySelectorAll('.landing ~ div');
mybullets.forEach((ele, i) => {
    ele.setAttribute('data-navigate', divs[i].className)
    ele.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(`.${e.target.dataset.navigate}`).scrollIntoView({
            behavior: "smooth"
        })
    })
})
let tooltip = document.querySelectorAll('.tooltip');
tooltip.forEach(ele => {
    ele.textContent = (ele.parentNode.dataset.navigate);
})



// section skills //
let skills = document.querySelector('.skills');
let myspans = document.querySelectorAll('.progress-bar');
window.onscroll = function () {

    let skillsoffsetTop = skills.offsetTop;
    let skillsHeight = skills.offsetHeight;
    
    let windowHeight = this.innerHeight;
    let windowScrollHeight = this.scrollY;
    
    if (windowScrollHeight > (skillsoffsetTop - skillsHeight) + 500) {
        myspans.forEach(li => {
            li.style.width = li.dataset.progress;
        })
    }


    // if (windowScrollHeight > (skillsoffsetTop + skillsHeight - windowHeight) - 500 ) {
    //     myspans.forEach(li => {
    //         li.style.width = li.dataset.progress;
    //     })
    // }

    // if (windowScrollHeight > (skillsoffsetTop + skillsHeight - windowHeight)) {
    //     myspans.forEach(li => {
    //         li.style.width = li.dataset.progress;
    //     })
    // }
}


// section Gallery //
let myImages = document.querySelectorAll('.images img');
myImages.forEach((img, i) => {
    img.addEventListener('click', (e) => {
        let mypopup = document.createElement('div');
        mypopup.className = 'popup';
        let popupheader = document.createElement('h4');
        let popupText = document.createTextNode(e.target.alt || i + 1);
        popupheader.appendChild(popupText);
        mypopup.appendChild(popupheader);
        let popupImg = document.createElement('img');
        popupImg.src = e.target.src;
        mypopup.appendChild(popupImg);
        let popupclose = document.createElement('span');
        popupclose.className = 'closepopup';
        let popupclosex = document.createTextNode("X");
        popupclose.appendChild(popupclosex);
        mypopup.appendChild(popupclose);
        document.body.appendChild(mypopup);
        let overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    })
})
document.addEventListener('click', e => {
    if (e.target.className == 'closepopup') {
        e.target.parentNode.remove();
        document.querySelector('.overlay').remove();
    }
})

