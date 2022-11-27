// 先將會使用到的網址(index & poster url) 宣告變數(variable declaration)
const BASE_URL = "https://movie-list.alphacamp.io"
const INDEX_URL = BASE_URL + "/api/v1/movies/"
const POSTER_URL = BASE_URL + "/posters/"
//製作 movies 容器
const movies = []
//儲存符合篩選條件的項目,變成全域變數
let filteredMovies = [];
const MOVIES_PER_PAGE = 12;
const dataPanel = document.querySelector("#data-panel");
//Search
const searchForm = document.querySelector("#search-form"); //存放搜尋表單這個 DOM 元件
const searchInput = document.querySelector("#search-input"); // 取得 input 值
const searchBtn = document.querySelector("#search-submit-button")
//分頁
const paginator = document.querySelector("#paginator");

// 新增儲存現在頁面模式
let pageMode = "card"
//記錄現在點擊頁面
let savePage = 1
// 取得電影資料 串接 Index API
axios
  .get(INDEX_URL)
  .then((response) => {
    movies.push(...response.data.results)
    renderPaginator(movies.length)
    renderCardList(getMoviesByPage(1))
  })
  .catch((err) => console.log(err))
// 渲染電影清單 renderMovieList
//新增更改card樣式
function renderCardList(data) {
  let rawHTML = ""
  data.forEach((item) => {
    rawHTML += `<div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img
              src="${POSTER_URL + item.image}"
              class="card-img-top" alt="${item.title}" />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
           <div class="card-footer">
              <button class="btn btn-primary btn-show-movie"
                data-bs-toggle="modal"
                data-bs-target="#movie-modal"
                data-id = "${item.id}">More
              </button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id
      }">+</button>
            </div>
          </div>
        </div>
      </div >`
  })
  dataPanel.innerHTML = rawHTML
}
//新增更改list樣式
function renderBarList(data) {
  let rawHTML = ""
  data.forEach((item) => {
    rawHTML += `<div class="col-sm-12 mt-3 border-bottom">
        <div class="bar mb-2 d-flex justify-content-between">
          <h5>${item.title}</h5>
          <div class="bar-btn">
            <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal"
            data-id = "${item.id}">More</button>
            <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
          </div>
        </div>
      </div>
    `
  })
  dataPanel.innerHTML = rawHTML
}
// 監聽 data panel 確認點擊是 more還是+,並回傳對應data-id
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id))
  }
})
//新增切換card與bar模式
const cardStyle = document.querySelector(".card-style")
const listStyle = document.querySelector(".list-style")
cardStyle.addEventListener("click", function onCardStyleClicked(event) {
  pageMode = "card"
  renderCardList(getMoviesByPage(savePage))
})
listStyle.addEventListener("click", function onListStyleClicked(event) {
  renderBarList(getMoviesByPage(savePage))
})
//監聽表單提交事件
searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
  //取消預設事件
  event.preventDefault();
  //取得搜尋關鍵字
  const keyword = searchInput.value.trim().toLowerCase();

  //錯誤處理：輸入無效字串
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  //條件篩選
  if (filteredMovies.length === 0) {
    return alert("請輸入有效字串！");
  }
  //新增切換card與bar模式
  if (pageMode === "card") {
    renderCardList(getMoviesByPage(1))
    //重製分頁器
    renderPaginator(filteredMovies.length)
  } else {
    renderBarList(getMoviesByPage(1))
    //重製分頁器
    renderPaginator(filteredMovies.length)
  }

  savePage = 1
});
