"use strict";
/*-----read from json file---- */
<<<<<<< HEAD
let keyWords = [];

function Image(item) {
  this.title = item.title;
  this.image_url = item.image_url;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}

Image.prototype.render = function () {
  let hornClone = $(".photo-template").clone();
  hornClone.find("h2").text(this.title);
  hornClone.find("p").text(this.description);
  hornClone.find("img").attr({
    src: this.image_url,
    alt: this.title,
  });
  hornClone.attr("class", `${this.keyword}`);
  hornClone.attr("id", "photo-template");
  $("main").append(hornClone);
};

function readJson() {
=======
let My_array = [];
let toPush = [];
function Image(url, title, description, keyword, horns) {
  this.title = title;
  this.img = url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  toPush.push(this);
}
console.log(toPush);

Image.prototype.render = function () {
  let $photo = $(
    `<div id="photo-template" class=${this.keyword}></div>`
  ).clone(); ///array

  $photo.append($(`<h2>${this.title}</h2>`));
  $photo.append($(`<img src=${this.img}></img>`));
  $photo.append($(`<p>${this.description}</p>`));
  $("main").append($photo);
};

Image.readJson = () => {
>>>>>>> 8244417cd1d1c8d9fc83d0a8716223fecd84c977
  const ajaxSetting = {
    method: "get",
    datatype: "json",
  };

  $.ajax("data/page-1.json", ajaxSetting).then(doStuff);
<<<<<<< HEAD
}

readJson();

function doStuff(HornData) {
  HornData.forEach((item) => {
    let newImage = new Image(item);
    newImage.render();
    if (!keyWords.includes(newImage.keyword)) keyWords.push(newImage.keyword);
  });
  $(".photo-template").first().remove();
  renderKeywords();
}
/*--------------filter----------------*/
function renderKeywords() {
  keyWords.forEach((item) => {
    let $keyword = $(".option").clone();
    $keyword.text(item);
    $("select").append($keyword);
=======
};

function doStuff(data) {
  data.forEach((item, i) => {
    let { image_url, title, description, keyword, horns } = item;
    new Image(image_url, title, description, keyword, horns).render();
    if (!My_array.includes(keyword)) My_array.push(keyword);
  });
  filterr();
}
$(() => Image.readJson());
/*--------------filter----------------*/
function filterr() {
  $("select").on("change", filterFunction);

  My_array.forEach((item, i) => {
    let $keyword = $(".option").clone();
    $keyword.text(item);
    $("select").append($keyword);
    $keyword.attr("id", i);
>>>>>>> 8244417cd1d1c8d9fc83d0a8716223fecd84c977
    $keyword.attr("value", item);
    $keyword.removeClass("option");
  });
}
<<<<<<< HEAD

$("select").on("change", filterFunction);
function filterFunction() {
  let select = $(this).val();
  if (select == "default") {
    $("div").show();
  } else {
    $("div").hide();
    $(`.${select}`).show();
  }
=======
function filterFunction() {
  let select = $(this).children("option:selected").val();
  $("main").children().addClass("hide");
  $(`.${select}`).removeClass("hide");
>>>>>>> 8244417cd1d1c8d9fc83d0a8716223fecd84c977
}
