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
  HornData.forEach((item) => {
    let newImage = new Image(item);
    newImage.render();

    if (!keyWords.includes(newImage.keyword)) {
      keyWords.push(newImage.keyword);
    }
  });

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

// events functions
function filterFunction() {
  let select = $(this).val();
  if (select == "default") {
    $("div").show();
  } else {
    $("div").hide();
    $(`.${select}`).show();
  }
}

// events
$("select").on("change", filterFunction);
