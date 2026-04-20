$(document).ready(function() {
  displaySelect();
});

function clear() {
  $("#select").remove();
  $("#mask").remove();
}

function displaySelect() {
  $(document.body).prepend(
    '<div id="select">' +
      "<a href='javascript:init(\"addition\"), clear()'> <img src='img/addition.png' alt='雜ｳ縺礼ｮ�' /> </a> " +
      "<a href='javascript:init(\"subtraction\"), clear()'> <img src='img/subtraction.png' alt='蠑輔″邂�' /> </a> " +
      "<a href='javascript:init(\"multiplication\"), clear()'> <img src='img/multiplication.png' alt='縺九￠邂�' /> </a> " +
    '</div>'
  );

  $(document.body).append(
    '<div id="mask"></div>'
  );

  $("body").fadeIn(500);
}
