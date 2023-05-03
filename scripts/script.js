const searchLink = document.querySelector(".search__link .icon-reg"),
  mainContent = document.querySelector(".main__content"),
  mainClose = document.querySelectorAll(".main__close"),
  mainBlock = document.querySelector(".main__block"),
  mainSolo = document.querySelector(".main__solo"),
  moviesLink = document.querySelectorAll(".movies__link"),
  formMein = document.querySelector(".form__main"),
  headerInput = document.querySelector(".header__input"),
  anime = document.querySelector(".anime"),
  pagination = document.querySelector(".pagination"),
  headerBtn = document.querySelector(".header__btn"),
  headerAbs = document.querySelector(".header__abs"),
  headerItems = document.querySelector(".header__items");

/* menu bars */
headerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  this.classList.toggle("active");
  headerItems.classList.toggle("active");
  headerAbs.classList.toggle("active");
  body.classList.toggle("active");
});

headerAbs.addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    this.classList.remove("active");
    headerBtn.classList.remove("active");
    headerItems.classList.remove("active");
    body.classList.remove("active");
  }
});
/* menu bars */

/* host */

const host = "https://kinopoiskapiunofficial.tech";
const hostName = "X-API-KEY";
const hostValue = "df5db1aa-9e6c-4ce2-8e7c-efda502d8e53";

class Kino {
  constructor() {
    this.date = new Date().getMonth();
    this.curYear = new Date().getFullYear();
    this.months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    // console.log(this.months[1]);
    this.curMonth = this.months[this.date];
    // console.log(this.curMonth);
    // console.log(this.date);
  }
  fOpen = async (url) => {
    let response = await fetch(url, {
      headers: {
        [hostName]: hostValue,
      },
    });

    if (response.ok) return response.json();
    else throw new Error(`Cannot accsess ${url}`);
  };

  getTopMoves = (page = 1) =>
    this.fOpen(
      `${host}/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`
    );

  getSoloFilm = (id) => this.fOpen(`${host}/api/v2.1/films/${id}`);

  getMostAwaited = (page = 1, year = this.curYear, month = this.curMonth) =>
    this.fOpen(
      `${host}/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`
    );

  getReviews = (id) =>
    this.fOpen(`${host}/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`);

  getFranes = (id) =>
    this.fOpen(`${host}/api/v2.2/films/${id}/images?type=STILL&page=1`);

  getSorch = (page = 1, keyword) =>
    this.fOpen(
      `${host}/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`
    );

  getPrimyera = (month = this.curMonth, year = this.curYear) =>
    this.fOpen(`${host}/api/v2.2/films/premieres?year=${year}&month=${month}`);
}

const db = new Kino();

// db.getTopMoves().then(res => {
//     console.log(res);
// })
// db.getSoloFilm(448).then(res => {
//     console.log(res);
// })
// db.getMostAwaited().then(res => {
//     console.log(res);
// })
// db.getReviews(435).then(res => {
//     console.log(res);
// })
// db.getFranes(435).then(res => {
//     console.log(res);
// })
// db.getPrimyera().then(res => {
//     console.log(res);
// })

/* host */

/* render */

function renderTrendMoves(elem = [], fn = [], film = [], pages = []) {
  anime.classList.add("active");

  elem.forEach((item, i) => {
    let parent = document.querySelector(`${item} .swiper-wrapper`);
    // console.log(parent);
    db[fn[i]](pages[i])
      .then((date) => {
        // console.log(date)

        date[film[i]].forEach((el) => {
          // console.log(el);

          let slade = document.createElement("div");
          slade.classList.add("swiper-slide");
          slade.innerHTML = `
                    <div class="movie__item">
                        <img src="${el.posterUrlPreview}" alt="${
            el.nameEn || el.nameRu
          }" loading="lazy">
                    </div>
                    `;
          parent.append(slade);
          // console.log(parent);
        });
        anime.classList.remove("active");
      })
      // db.getTopMoves(1)

      .then(() => {
        elem.forEach((item) => {
          new Swiper(`${item}`, {
            slidesPerView: 1,
            spaceBetween: 27,
            // slidesPerGroup: 3,
            // loop: true,
            // loopFillGroupWithBlank: true,
            navigation: {
              nextEl: `${item} .swiper-button-next`,
              prevEl: `${item} .swiper-button-prev`,
            },
            breakpoints: {
              1440: {
                slidesPerView: 6,
              },
              1200: {
                slidesPerView: 5,
              },
              960: {
                slidesPerView: 4,
              },
              720: {
                slidesPerView: 3,
              },
              500: {
                slidesPerView: 2,
              },
            },
          });
        });
      })

      .catch((e) => {
        console.log(e);
      });
  });
}
renderTrendMoves(
  [".trend__tv-slider ", ".popular__actors-slider"],
  ["getTopMoves", "getMostAwaited"],
  ["films", "releases"],
  [1, 1]
);

/* render */

/* rand */

function randMovies(num) {
  return Math.trunc(Math.random() * num + 1);
}

/* rand */

/* render header */

function renderHeader(pag) {
  db.getTopMoves(pag).then((date) => {
    anime.classList.add("active");
    // console.log(date);
    // anime.classList.add('active')
    let max = randMovies(date.films.length);
    // console.log(max);
    let filmId = date.films[max].filmId;
    // console.log(filmId);
    let filmReyting = date.films[max].rating;

    db.getSoloFilm(filmId).then((response) => {
      // console.log(response);

      let info = response.data;

      let headerText = document.querySelector(".header__text");

      let url = info.webUrl.split("kinopoisk").join("kinopoiskk");

      headerText.innerHTML = `
                <img class = "header__img" src="${
                  info.posterUrlPreview
                }" alt="">
                <h1 class="header__title">${info.nameRu || info.nameEn}</h1>
                <div class="header__balls">
                    <span class="header__year">${info.year}</span>
                    <span class="logo__span header__rating  header__year ">+${
                      info.ratingAgeLimits
                    }</span>
                    <div class="header__seasons header__year">${
                      info.seasons.length > 0 ? info.seasons[0] : ""
                    }</div>
                    <div class="header__stars header__year"><span class="icon-solid"></span><strong>${filmReyting}</strong></div>
                </div>
                <p class="header__descr">
                    ${info.description}
                </p>
                <div class="header__buttons">
                    <a href="${url}" target = "_blenk" class="header__watch"><span class="icon-solid"></span>watch</a>
                    <a href="#" class="header__more header__watch movie__item" data-id = "${
                      info.filmId
                    }">More information</a>
                </div>
                `;
    })

    .then(() => {
        let headerMore = document.querySelector(".header__more")
        headerMore.addEventListener("click" ,function (e) {
            e.preventDefault()
            let attr = this.getAttribute('data-id')
            console.log(attr);
            openSoloFilms(e)
        })
    })
    anime.classList.remove("active");
  });
}
let page = 13;
let rand = randMovies(page);
renderHeader(rand);
/* render header */

/* current date */

const strong = document.querySelector(".popular__actors-title strong");
const comingSoonBlock = document.querySelector(".coming__soon-block img");
const year = document.querySelector(".year");


strong.innerHTML = `${db.curMonth} ${db.curYear}`;
year.innerHTML = `${db.curYear}`;

anime.classList.add("active");
db.getPrimyera().then((res) => {
//   console.log(res);
  let rand = randMovies(res.items.length);
  comingSoonBlock.src = res.items[rand].posterUrlPreview;
  anime.classList.remove("active");
  let id = res.items[rand].kinopoiskId
//   console.log(id);
    db.getSoloFilm(id).then((response) => {
        let url = response.data.webUrl.split("kinopoisk").join("kinopoiskk");
        let headerWatchs = document.querySelector(".header__watchs");
        headerWatchs.innerHTML = ` <a href="${url}" target = "_blank" class="header__watch"><span class="icon-solid"></span>watch</a>`
    });
});

/* current date */

/* open solo films */
    function openSoloFilms (e) {
        e.preventDefault()
        mainContent.classList.add('active')
        body.classList.add('active')
    } 


    mainClose.forEach(closes => {
        closes.addEventListener("click" ,function (e) {
            e.preventDefault()
            mainContent.classList.remove('active')
            body.classList.remove('active')
        })
    });


/* open solo films */


/* render solo */

    async function renderSolo(id) {
        mainSolo.innerHTML = ""
        mainBlock.innerHTML = ""

        // anime.classList.add('active')

        ;(async function () {
            const [reviews,frames,solo] = await Promise.all([
                db.getReviews(id),
                db.getFranes(id),
                db.getSoloFilm(id),
            ]);
            return {reviews,frames,solo}
           
        })()
        .then(res => {
            console.log(res);
            let solo = res.solo.data;
            let genres = solo.genres.reduce((acc,item) => acc +  ` ${item.genre}`," ")
            console.log(genres);
            let countries = solo.countries.reduce((acc,item) => acc + ` ${item.country}` , "")
            console.log(countries);

            let url = solo.webUrl.split("kinopoisk").join("kinopoiskk");
            let facts = ""
            let frames = ""
            let reviews =""
            let fact = solo.facts.slice(0,5)
            fact.forEach((item,i) => {
              fact += `<li class="solo__facts">${i+1}: ${item}</li>`
            });
            console.log(fact);

            let frame = res.frames.items.slice(0,9)
            frame.forEach(item => {
              frames += `<img src="${
                item.previewUrl
              }" alt="">`
            });
            console.log(frames);
            let review = res.reviews.items.slice(1,10)
            console.log(review);
            review.forEach(item => {
              reviews += `
              <div class="main__item">
              <span class="review__descr-span">${item.author}</span>
              <p class="review__descr">${item.description}</p>
              </div>  
            `
            });



            let div = `
          
            <div class="solo__img">
                    <img src="${solo.posterUrlPreview}" alt="">
                    <a href="${url}" class="solo__link header__watch">Video ko'rmoq</a>
                </div>
                <div class="solo__content">
                    <h3 class="solo__title trend__tv-title">${solo.nameEn || solo.nameRu}</h3>
                    <ul>
                        <li class="solo__countries">Davlati: ${countries}</li>
                        <li class="solo__genres">Janiri: ${genres}</li>
                        <li class="solo__primyer">Dunyoga primyera bo'lgan yili: ${solo.premiereWorld}</li>
                        <li class="solo__year">Chiqan yili: ${solo.year}</li>
                        <li class="solo__slogon">Yosh chegarasi: ${solo.ratingAgeLimits != null ? solo.ratingAgeLimits : "Yo'q"}</li>
                        <li class="solo__slogon">Shiori: ${solo.slogan}</li>
                        <li class="solo__length"> Vaqti: ${solo.filmlength}</li>
                        <li class="solo__desc">Izoh: ${solo.description}</li>
                   
                    </ul>
                </div>

                <div class="solo__facts">
                    <h3 class="trend__tv-title">Qiziqarli faktlar</h3>
                </div>
       
                <div class="solo__facts">
                    <h3 class="trend__tv-title">Qiziqarli kadirlar</h3>
                </div>
                <div class="solo__images">${frames}</div>
                <div class="solo__facts">
                <h3 class="kament trend__tv-title">Kamentlar</h3>
                
                ${reviews}
                 </div>



          `
          console.log(frames);


          mainSolo.innerHTML = div

        })
    }

    renderSolo(785)

    

/* render solo */

