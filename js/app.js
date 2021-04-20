"use strict";
/*-----read from json file---- */
let My_array = [];
let toPush = [];

function Image(item) {
  this.title = item.title;
  this.img = item.image_url;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
  toPush.push(this);
}
console.log('aaaaaaaaaaaaaaaaa',toPush[0]);

Image.prototype.render = function () {
  // let $photo = $(
    //   `<div id="photo-template" class=${this.keyword}></div>`
    // ).clone(); ///array
    
    // $photo.append($(`<h2>${this.title}</h2>`));
  // $photo.append($(`<img src=${this.img}></img>`));
  // $photo.append($(`<p>${this.description}</p>`));
  // $("main").append($photo);

  let hornClone = $('.photo-template').clone();
  hornClone.find('h2').text(this.title);
  hornClone.find('p').text(this.description);
  hornClone.find('img').attr({
    src:this.img,
    alt:this.title
  })
  hornClone.attr('class',this.keyword);
  $("main").append(hornClone);
};

function readJson (){
  const ajaxSetting = {
    method: "get",
    datatype: "json",
  };

  $.ajax("data/page-1.json", ajaxSetting).then(doStuff);
}

// $(() =>readJson());
readJson();

function doStuff(HornData) {
  // console.log({HornData});
  HornData.forEach((item, i) => {
    // let { image_url, title, description, keyword, horns } = item;
    // new Image(image_url, title, description, keyword, horns).render();
    let newImage = new Image(item);
    newImage.render();
    if (!My_array.includes(newImage.keyword)) {
      console.log('jjjjjj')
      My_array.push(newImage.keyword);
  }

  });
  $('.photo-template').first().remove();
console.log('aaaaaaaaaaaaaaaaa',toPush[0]);

  // $('#photo-template').remove();
  renderKeywords();
}
/*--------------filter----------------*/
function renderKeywords() {
  My_array.forEach((item, i) => {
    let $keyword = $(".option").clone();
    $keyword.text(item);
    $("select").append($keyword);
    // $keyword.attr("id", i);
    $keyword.attr("value", item);
    $keyword.removeClass("option");

    // let optionTag = `<option value='${item}'> ${item}</option>`
    // $("select").append(optionTag);

  });
}


$("select").on("change", filterFunction);
function filterFunction() {
  // console.log($(this).val());
  // let select = $(this).children("option:selected").val();
  
  let select = $(this).val();
  if(select=='default') {
    $('div').show();
  } else {
    $('div').hide();
    $(`.${select}`).show();
  }
  // $("main").children().addClass("hide");
  // $(`.${select}`).removeClass("hide");
  

}
