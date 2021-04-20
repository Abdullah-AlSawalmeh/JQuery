"use strict";
/*-----read from json file---- */
let keyWords = [];

function Image(item) {
  this.title = item.title;
  this.image_url = item.image_url;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}

Image.prototype.render = function () {
  // let hornClone = $(".photo-template").clone();
  // hornClone.find("h2").text(this.title);
  // hornClone.find("p").text(this.description);
  // hornClone.find("img").attr({
  //   src: this.image_url,
  //   alt: this.title,
  // });
  // hornClone.attr("class", `${this.keyword}`);
  // hornClone.attr("id", "photo-template");
  // $("main").append(hornClone);
  let template = $("#imageTemplate").html();
  let imageMergedTemplate = Mustache.render(template, this);
  $("main").append(imageMergedTemplate);
};

function readJson() {
  const ajaxSetting = {
    method: "get",
    datatype: "json",
  };

  $.ajax("data/page-1.json", ajaxSetting).then(doStuff);
}

readJson();

function doStuff(HornData) {
  // HornData.forEach((item) => {
  //   let newImage = new Image(item);
  //   newImage.render();

  HornData.forEach((item) => {
    // console.log(neighborhoodObject);
    let newImage = new Image(item);
    newImage.render();

    if (!keyWords.includes(newImage.keyword)) {
      keyWords.push(newImage.keyword);
    }
  });

  // if (!keyWords.includes(newImage.keyword)) keyWords.push(newImage.keyword);
  console.log(keyWords);
  $(".photo-template").first().remove();
  renderKeywords();
}
/*--------------filter----------------*/
function renderKeywords() {
  keyWords.forEach((item) => {
    let $keyword = $(".option").clone();
    $keyword.text(item);
    $("select").append($keyword);
    $keyword.attr("value", item);
    $keyword.removeClass("option");
  });
}

$("select").on("change", filterFunction);
function filterFunction() {
  let select = $(this).val();
  if (select == "default") {
    $("div").show();
  } else {
    $("div").hide();
    $(`.${select}`).show();
  }
}
