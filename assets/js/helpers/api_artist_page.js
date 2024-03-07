import { albums } from "../data/albums.js";
import { artists } from "../data/artists.js";

// console.log(artists);
// console.log(albums);
// idArtist khi click vào artist sẽ lấy danh sách các album của artist đó

// Lấy tham số albumId từ URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const artistIdFromMainPage = urlParams.get('artistId');

// console.log(artistIdFromMainPage);
// Sử dụng albumId và albumName theo nhu cầu của bạn

let artistFinded = artists.find(artist => artist._id === artistIdFromMainPage);


let albumFinded = artistFinded.id_albums; // laasy ra danh sach id cac album cua artist


async function getAlbumData(idAlbum) {
  return await albums.find(album => album._id === idAlbum);
}

async function getListAlbums() {
  let listAlbumData = [];
  for (const idAlbum of albumFinded) {
    try {
      const albumData = await getAlbumData(idAlbum);
      if(albumData) {
        listAlbumData.push(albumData);
      }
      else {
        console.log('Failed to fetch song data');
      }
    } catch (error) {
      console.error('Error fetching song data:', error);
    }
  }
  return listAlbumData; // Trả về albumData khi đã hoàn thành vòng lặp
}


const listDataArray = await getListAlbums(); // Lấy danh sách Album từ API

// console.log(listDataArray);

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inForArtist = $("header .artist");
const albumsOfArtist = $("#cardGridLen");
const header = $("header");
// console.log(header);

const imgArtist = artistFinded.image;
console.log(imgArtist);

header.style.cssText = `
  background: url(${imgArtist}) no-repeat center center/cover; 
  object-fit: cover;
  background-size: cover;
  aspect-ratio: 16/9;
`;
// console.log(inForArtist);
// console.log(albumsOfArtist);

// object app
const app = {
  render__one: function () {
    const htmls = `
            <figure>
            <a href="${artistFinded.image}"
              ><img
                src="${artistFinded.image}"
                alt="${artistFinded.name_Artist}"
            /></a>
          </figure>
          <div class="info__artist">
            <h1>${artistFinded.name_Artist}</h1>
            <div>
              <a
                href="javascript:download()"
                ><button type="button" class="btn-post-default">
                  Follwing
                </button></a
              >
            </div>
          </div>
          `;
    inForArtist.innerHTML += htmls;
  },
  render__two: () => {
    listDataArray.forEach((album) => {
      const html = `
        <div class="card-simple">
          <a href="album.html?albumId=${album._id}">
            <figure>
              <img
                src="${album.image}"
                alt="${album.name_Album}"
              />
            </figure>
            <h3>${album.name_Album}</h3>
          </a>
          <p><a href="artist.html">${album.name_Album}</a></p>
        </div>
      `;
      albumsOfArtist.innerHTML += html;
    });
  },
  handleEvents: function () {
  },
  start: function () {
    // Render Albums
    this.render__one();
    this.render__two();
  },
};

app.start();
