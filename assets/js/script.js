
$(document).ready(function () {
    $('.carousel_01').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    })
    $('.carousel_02').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })
    $('.carousel_03').owlCarousel({
        loop: true,
        margin: 10,
        center: true,
        onDragged: triggerNext,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    function triggerNext(event) {
        if (event.target.classList.contains('carousel_03')) {
            $('.carousel_04').trigger('next.owl.carousel');
        }
        else if (event.target.classList.contains('carousel_04')) {
            $('.carousel_03').trigger('next.owl.carousel');
        }
    }
    $('.carousel_04').owlCarousel({
        loop: true,
        margin: 10,
        items: 1,
        onDragged: triggerNext,
    })
});


let countDownDate = new Date('Nov 30, 2023  15:00:00').getTime();
let countdown = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById('timer').innerHTML = 'Expired';
    }
})

let register = document.getElementById('registerPage')
let login = document.getElementById('loginPage')
let registerPage = document.getElementById('register-page')
let loginPage = document.getElementById('login-page')
let overlay = document.getElementById('overlay')
let overlayLog = document.getElementById('overlay-login')
register.addEventListener('click', function () {
    registerPage.style.display = 'block'
})
overlay.addEventListener('click', function () {
    registerPage.style.display = 'none'
})
overlayLog.addEventListener('click', function () {
    loginPage.style.display = 'none'
})
login.addEventListener('click', function () {
    loginPage.style.display = 'block'
    console.log('from login')
})

$(document).ready(function () {
    $(".chosenHeartIcon").click(function () {
        if ($(this).hasClass('iconHeartActive')) {
            $(this).removeClass("iconHeartActive");
            $(this).addClass("iconHeartInactive");
        } else {
            $(this).removeClass("iconHeartInactive");
            $(this).addClass("iconHeartActive");
        }

    });
});

// add to card
let btnCart = document.querySelectorAll('.popular-courses .btn-cart');
let imgPath = '';
let courseTitle = '';
let coursePrice = 0;
let courses = [];


let course = {
    'imgpath': '',
    'title': '',
    'price': ''
};

function addToCart() {
    btnCart.forEach((element) => {
        element.addEventListener('click', function (e) {
            imgPath = e.target.previousElementSibling.src.slice(
                e.target.previousElementSibling.src.indexOf('assets')
            );
            const courses = JSON.parse(localStorage.getItem('courses'));
            courseTitle = e.target.parentElement.parentElement.
                nextElementSibling.
                childNodes[3].textContent;
            coursePrice = e.target.parentElement.parentElement.
                nextElementSibling.
                childNodes[7].childNodes[3].textContent;
            //console.log( imgPath, courseTitle,coursePrice) 
            course['imgpath'] = imgPath;
            course['title'] = courseTitle;
            course['price'] = coursePrice;
            console.log(course)
            courses.unshift(course)
            console.log(courses)
            localStorage.setItem('courses', JSON.stringify(courses));
            Swal.fire('Course Added to your cart!')
            displayCourses();
        });

    });
}

addToCart();
displayCourses();


function displayCourses() {
    let result = '';
    courses = JSON.parse(localStorage.getItem('courses'));
    if (courses.length == 0) {
        result = `<h2 class="text-center pt-4 fs-6">No items added!</h2>`
    }

    courses.map((course, index) => {
        result += `
        <div class="row p-2 pt-3 align-content-center">
        <div class="col-2 p-0 img">
         <img class="w-100" src="${course['imgpath']}" alt=""/>
        </div>
        <div class="col-6">
         <h3 class="fs-6">${course['title']}</h3>
        </div>
        <div class="col-3 price">
        <span class="fs-5">${course['price']}</span>
        </div>
     </div>
     <div class="d-flex justify-content-between">
     <button class="btn bg-transparent text-danger" onclick="deleteCourse(${index})">
         <i class="fa-regular fa-trash-can fs-2"></i>
     </button>
     <button class="btn bg-warning">Buy Now</button>
    </div>
    <hr>
     `
    })

    document.getElementById('cartList').innerHTML = result;
}

let cartSection = document.getElementById('cart-section');


function deleteCourse(id) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id, 1);
            localStorage.setItem('courses', JSON.stringify(courses));
            displayCourses();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}
document.getElementById('close').addEventListener('click', function () {
    cartSection.style.display = "none";
})
document.getElementById('card').addEventListener('click', function () {
    cartSection.style.display = "unset";
})

