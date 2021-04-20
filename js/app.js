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
  // console.log(this);
  $("#images_section_main").append(imageMergedTemplate);
};

function readJson(number) {
  const ajaxSetting = {
    method: "get",
    datatype: "json",
  };
  if (number === 1) {
    $("#images_section_main").children().remove();
    $.ajax(`data/page-1.json`, ajaxSetting).then(doStuff);
  }
  if (number === 2) {
    $("#images_section_main").children().remove();
    $.ajax(`data/page-2.json`, ajaxSetting).then(doStuff);
  }
  // if (number === 5) {
  //   // $.ajax(`data/page-1.json`, ajaxSetting).then(doStuff);
  //   $("#images_section_main").children().remove();
  //   $.ajax(`data/page-1.json`, ajaxSetting).then(doStuff);
  // }
}
readJson(1);

function doStuff(HornData) {
  keyWords = [];
  HornData.forEach((item) => {
    let newImage = new Image(item);
    newImage.render();

    if (!keyWords.includes(newImage.keyword)) {
      keyWords.push(newImage.keyword);
    }
  });

  renderKeywords();
}

/*--------------filter----------------*/
function renderKeywords() {
  $("#filter").children().remove();

  keyWords.forEach((item) => {
    let x = { y: item };
    let template = $("#filterTemplate").html();
    let filterMergedTemplate = Mustache.render(template, x);
    $("#filter").append(filterMergedTemplate);
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

///////// buttons

function page1Handler() {
  readJson(1);
}
function page2Handler() {
  readJson(2);
}

$("#page1").click(page1Handler);
$("#page2").on("click", page2Handler);
