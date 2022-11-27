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