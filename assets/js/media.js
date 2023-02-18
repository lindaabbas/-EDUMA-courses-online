let mediaQuery = window.matchMedia('(max-width:767px)');
if(mediaQuery.matches){
    let newHead = document.getElementById('myCarousel');
    newHead.outerHTML = 
`   <div class=" w-100  first  ">
<img class="carousel-img " src="assets/img/slide1.jpg" alt="" />
<div class="container d-flex align-items-center">
    <div class="carousel-caption  h-100 text-start">
        <h1>the best theme for <p class="main-head">education</p>
        </h1>
        <p><a class="btn main-btn border-0 rounded-0" href="#">buy now</a></p>
    </div>
</div>
</div>`;

document.querySelector('.event').classList.remove('head');
}