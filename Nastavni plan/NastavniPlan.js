const urlAllSubjects = "http://www.fulek.com/VUA/SUPIT/GetNastavniPlan";
var urlSubject = "http://www.fulek.com/VUA/supit/GetKolegij/";

var arrData = [];
var arrInfo = [];
var subjectNames = [];

var ects = 0;
var sati = 0;

var tbl = document.querySelector("#tbody");

function GetData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", urlAllSubjects, true);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(xhr.responseText);

      data.forEach(element => {
        arrData.push([element.label, element.value]);
      });
    }

    GetInfo();
  };
}

function GetInfo() {
  arrData.forEach(element => {
    let url;
    url = urlSubject + element[1];

    const xhrInfo = new XMLHttpRequest();
    xhrInfo.open("GET", url);
    xhrInfo.send();

    xhrInfo.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(xhrInfo.responseText);

        subjectNames.push(data.kolegij);

        arrInfo.push([
          data.id,
          data.kolegij,
          data.ects,
          data.sati,
          data.predavanja,
          data.vjezbe,
          data.tip,
          data.semestar
        ]);
      }
    };
  });
}

function ModifyRow(ui) {
  let findData = arrInfo.find(element => element[1] == ui.item.label);

  var n = 0;
  var s = 0;
  var ectsData = document.getElementById("ects");
  var timeData = document.getElementById("sati");

  if (!document.getElementById(findData[1])) {
    $("tbody").append(`<tr id="${findData[1]}">
    <td>${findData[1]}</td>
    <td class="ects">${findData[2]}</td>
    <td class="sati">${findData[3]}</td>
    <td>${findData[4]}</td>
    <td>${findData[5]}</td>
    <td>${findData[6]}</td>
    <td><button class="btn">Obriši</button></td>
    </tr>`);

    n = findData[2];
    ects += n;
    ectsData.innerHTML = ects;

    s = findData[3];
    sati += s;
    timeData.innerHTML = sati;
  }

  $(".btn")
    .unbind()
    .click(function() {
      n = parseInt(
        $(this)
          .closest("tr")
          .find(".ects")
          .text()
      );
      ects -= n;
      ectsData.innerHTML = ects;

      s = parseInt(
        $(this)
          .closest("tr")
          .find(".sati")
          .text()
      );
      sati -= s;
      timeData.innerHTML = sati;

      $(this)
        .closest("tr")
        .remove();
    });
}

$(function() {
  GetData();

  $('[type="text"]').autocomplete({
    source: function(request, response) {
      var results = $.ui.autocomplete.filter(subjectNames, request.term);

      response(results.slice(0, 10));
    },
    select: function(event, ui) {
      if ($(".tableHead").css({ visibility: "hidden" })) {
        $(".tableHead").css({ visibility: "visible" });
      }

      ModifyRow(ui);

      if ($("#tableFooter").css({ visibility: "hidden" })) {
        $("#tableFooter").css({ visibility: "visible" });
      }
    }
  });
});
