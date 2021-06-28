 var voorrijkosten = 75
var minumum = 150
var factor = 1
var diensten = []
var current = 0
var locatie = {woonplaats: null, provincie: null}

const formatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
})


$(document).ready(function () {


  // producten 
  var FactuurTotaal = {}
  var borenTotaal = []
  var zagenTotaal = []
  var frezenTotaal = []
  var slopenTotaal = []
  var aircoTotaal = []
  var kruipTotaal = []
  var totaalbedrag = 0

  function totaalBedrag(factuur) {
    for (var i = 0; i < factuur.length; i++) {
      totaalbedrag += factuur[i].totaal
    }


    FactuurTotaal.totaalbedrag = totaalbedrag
  };

  function postTotaal(tot) {
    tot = tot.toFixed(2) * factor
    if(tot == 0){

    }else if (tot < minumum) {
      tot = minumum
    } else if (tot >= maximum) {
      $('#voorrij').html('€ 0')
      tot = tot
    } else {
      $('#voorrij').html('€ ' + voorrijkosten)
      tot = tot + voorrijkosten
    }

    $(".exbtw").html(formatter.format(tot))
    $(".totbtw").html(formatter.format(tot * 1.21))
  }


  $("#Part").click(function () {
    $(".stap1").hide()
    $(".stap2").show()
    $(".verwijzing").hide()
    $(".progress-bar").css("width", "20%")
    $(".progress-bar").html("20%")
  })

  $("#Zak").click(function () {
    $(".stap1").hide()
    $(".verwijzing").show()
    $(".stap2").hide()
    $(".progress-bar").css("width", "80%")
    $(".progress-bar").html("80%")
  });


  // stap 2

  // location guesser



  $(".step2Back").click(function () {
    $(".stap1").show()
    $(".stap2").hide()
    $(".verwijzing").hide()
    $(".progress-bar").css("width", "0%")
    $(".progress-bar").html("0%")
  })

  $(".step2Next").click(function () {
    $(".stap2").hide()
    $(".verwijzing").hide()
    $(".stapKiezen").show()
    $(".progress-bar").css("width", "25%")
    $(".progress-bar").html("25%")
  })

  $(".stepKiezenBack").click(function () {
    $(".stap2").show()
    $(".stapKiezen").hide()
    $("#knoppen").hide()
    $(".progress-bar").css("width", "20%")
    $(".progress-bar").html("20%")
  })

function cloneInfo(){
  if ($('#boren').is(':checked')) {
    $(".offerteInfo").append($('.borenInfo').clone())
  }
  if ($('#frezen').is(':checked')) {
    $(".offerteInfo").append($('.frezenInfo').clone())
  }
  if ($('#kruipruimte').is(':checked')) {
    $(".offerteInfo").append($('.KruipruimteventilatieInfo').clone())
  }
}

  $(".stepKiezenNext").click(function () {
    diensten = []
    if ($('#boren').is(':checked')) {
      console.log('boren checked')
      diensten.push('#BorenSectie')
    }
    if ($('#zagen').is(':checked')) {
      console.log('zagen checked')
      diensten.push('#ZagenSectie')
    }
    if ($('#frezen').is(':checked')) {
      console.log('frezen checked')
      diensten.push('#FrezenSectie')
    }
    if ($('#slopen').is(':checked')) {
      console.log('slopen checked')
      diensten.push('#BetonslopenSectie')
    }
    if ($('#trap').is(':checked')) {
      console.log('trap checked')
      diensten.push('#trapsparingSectie')
    }
    if ($('#airco').is(':checked')) {
      console.log('airco checked')
      diensten.push('#AircoSectie')
    }
    if ($('#kruipruimte').is(':checked')) {
      console.log('kruipruimte checked')
      diensten.push('#KruipruimteventilatieSectie')
    }
    if (diensten.length == 0) {
      $(".stapKiezen h2").after('<p style="color: red">Maak eerst een selectie</p>')
    }else {
      $(".stapKiezen").hide()
      $(".verwijzing").hide()
      $(".stap3").show()
      //$("#knoppen").show()
      $(diensten[current]).show();
      console.log(current)
      var progress = Math.round(60/(diensten.length)*current + 30)
      $(".progress-bar").css("width", progress+"%")
      $(".progress-bar").html(progress+"%")
    }
    update()
    /*
    console.log(diensten)
    $(".stapKiezen").hide()
    $(".verwijzing").hide()
    $(".stap3").show()
    $("#knoppen").show()
    $('#BorenSectie').show();
    $("#voorrij").html(voorrijkosten)
    $(".progress-bar").css("width", "40%")
    $(".progress-bar").html("40%")
    */
  })

  $("#stap3Next").click(function () {
    if (diensten.length-1 == current) {
      $(".stap3").hide()
      $(".stap4").show()
      cloneInfo()
      $(".progress-bar").css("width", "90%")
    $(".progress-bar").html("90%")
    }else {
      $('.sectie').hide();
      current++
      $(diensten[current]).show();
    }
    var progress = Math.round(60/(diensten.length)*current + 30)
    $(".progress-bar").css("width", progress+"%")
    $(".progress-bar").html(progress+"%")
    console.log(current)

  })

  $("#stap3Back").click(function () {
   if (current == 0) {
     $(diensten[current]).hide();
      $(".stap3").hide()
      $(".stapKiezen").show()
      $(".progress-bar").css("width", "30%")
    $(".progress-bar").html("30%")
    }else {
      $('.sectie').hide();
      current--
      $(diensten[current]).show();
    }
    var progress = Math.round(60/(diensten.length)*current + 30)
    $(".progress-bar").css("width", progress+"%")
    $(".progress-bar").html(progress+"%")
    console.log(current)
  })



  // stap 3

  // boren

  $('#Boren').click(function () {
    $('.sectie').hide();
    $('#BorenSectie').show();
    $(".nav-link").removeClass("active")
    $(this).addClass("active")
  })

  $('#borenPlus').click(function () {
    $(".BorenItem:last").clone().insertAfter(".BorenItem:last");
    if ($('.BorenItem').length > 1) {
      $(".borenMin").show()
    }
  })

  $('.borenMin').click(function () {
    $(".BorenItem:last").remove();
    if ($('.BorenItem').length < 2) {
      $(".borenMin").hide()
    }
  })


  $(document).on('input', '#borenaantal', function () {
    var val = this.value
    if (val > 9) {
      $('.modal').modal('show')
      this.value = 10
    }
  });

  function update() {
    totaalbedrag = 0
    if(diensten.includes('#BorenSectie')){
      borenOphalen()
      totaalBedrag(FactuurTotaal.BorenTotaal)
    }
    if(diensten.includes('#ZagenSectie')){
      zagenOphalen()
      totaalBedrag(FactuurTotaal.zagenTotaal)
    }
    if(diensten.includes('#KruipruimteventilatieSectie')){
      kruipOphalen()
      totaalBedrag(FactuurTotaal.kruipTotaal)
    }
    if(diensten.includes('#FrezenSectie')) {
      frezenOphalen()
      totaalBedrag(FactuurTotaal.frezenTotaal)
    }

    
    console.log("bedrag" + FactuurTotaal.totaalbedrag)
    postTotaal(FactuurTotaal.totaalbedrag)


    offerte()

  };
  $(".sectie").change(function () { update() });


  function borenOphalen() {
    var totalItems = []
    var bobject = {}
    var type
    $(".BorenItem").each(function (index) {
      index++
      $(".BorenItem:nth-of-type(" + index + ") :input").each(function (Index) {
        if ($(this).attr("name") == "bloca") {
          bloca = $(this).val()
          if (bloca == "Plafond") {
            bloca = 125
            type = 'Plafond'
          } else if (bloca == "muur") {
            bloca = 25
            type = 'Muur'
          } else if (bloca == "Vloer") {
            bloca = 0
            type = 'Vloer'
          }
          bobject.bloca = bloca
          bobject.type = type
        }
        if ($(this).attr("name") == "BorenMM") {
          bmm = $(this).val()
          if (bmm < 30) {
            bmm = 30
            bloca = 0
          } else if (bmm > 160) {
            bmm = 75
          } else if (bmm > 30) {
            bmm = 50
          }
          bobject.bmm = bmm
        }
        if ($(this).attr("name") == "aantal") {
          borenaantal = $(this).val()
          bobject.aantal = borenaantal
        }
        if (bobject.aantal == 0) {
          bobject.totaal = 0
        } else {
          bobject.totaal = bobject.aantal * (bobject.bloca + bobject.bmm)
        }


        $(".totaal").eq(index - 1).html("&euro; " + bobject.totaal)
      });
      //bobject.totaal = bobject.aantal * (bobject.bloca + bobject.bmm)

      totalItems.push(bobject)
      bobject = {}
    });
    FactuurTotaal.BorenTotaal = totalItems
  }

  function zagenOphalen() {
    var totalItems = []
    var bobject = {}


    $(".WandItem.activeItem").each(function (index) {
      index++
      console.log(index)
      bobject.type = "Wandsparing zagen"
      $(".WandItem:nth-of-type(" + index + ") :input").each(function (Index) {
        if ($(this).attr("name") == "hoogte") {
          bobject.hoogte = $(this).val()
        }
        if ($(this).attr("name") == "breedte") {
          bobject.breedte = $(this).val()
        }
        if ($(this).attr("name") == "dikte") {
          bobject.dikte = $(this).val()
        }
        if ($(this).attr("name") == "staalNodig") {
          if ($(this).prop('checked')) {
            bobject.staal = $(this).val()
            console.log('checked')
            $('.modal').modal('show')
          }
        }
          if ($('#puin').prop('checked')) {
            bobject.puin = true
            $('#puinafvoer').show()
            console.log(bobject.hoogte)
            bobject.puinafvoer = puinafvoer(bobject.hoogte,bobject.breedte,bobject.dikte)
          } else {
            bobject.puin = false
            $('#puinafvoer').hide()
          }
      });

      if (bobject.breedte == 90 && bobject.hoogte == 230) {
        if (bobject.dikte < 11) {
          //bobject.dikte * 35 = bobject.totaal
          bobject.totaal = 350
        } else if (bobject.dikte > 10 && bobject.dikte < 16) {
          //bobject.dikte * 55 = bobject.totaal
          bobject.totaal = 550
        } else if (bobject.dikte > 15 && bobject.dikte < 21) {
          //bobject.dikte * 75 = bobject.totaal
          bobject.totaal = 750
        } else if (bobject.dikte > 15 && bobject.dikte > 20) {
          console.log('offerte')
          $('.modal').modal('show')
        }
      } else {
        if (bobject.dikte < 11) {
          bobject.totaal = (bobject.breedte * bobject.hoogte) * 0.015
        } else if (bobject.dikte > 10 && bobject.dikte < 16) {
          bobject.totaal = (bobject.breedte * bobject.hoogte) * 0.0235
        } else if (bobject.dikte > 15 && bobject.dikte < 21) {
          bobject.totaal = (bobject.breedte * bobject.hoogte) * 0.0320
        } else if (bobject.dikte > 15 && bobject.dikte > 20) {
          console.log('offerte')
          $('.modal').modal('show')
        }
      }


      totalItems.push(bobject)

      $(".WandItem span.totaal").eq(index - 1).html(formatter.format(bobject.totaal))

      bobject = {}
    });
/*    
    $(".TrapItem.activeItem").each(function (index) {
      index++
      console.log(index)
      bobject.type = "trapsparing zagen"
      $(".TrapItem:nth-of-type(" + index + ")  :input").each(function (Index) {
        console.log($(this))
        if ($(this).attr("name") == "maat") {
          if ($(this).prop('checked')) {
            bobject.maat = $(this).val()
          }
          if (bobject.maat == "standaard") { bobject.totaal = 1400 }
        }
        if ($(this).attr("name") == "staalNodig") {
          if ($(this).prop('checked')) {
            bobject.staal = $(this).val()
          }
          console.log(bobject.staal)
        }
        if ($(this).attr("name") == "dichtmaken") {
          bobject.dicht = $(this).prop('checked')
          console.log(bobject.dicht)
          if (bobject.dicht) {
            bobject.totaal = bobject.totaal + 600
          }
        }

      });
    
      totalItems.push(bobject)
      $(".TrapItem span.totaal").eq(index - 1).html(formatter.format(bobject.totaal))

      bobject = {}
    });
*/



    $(".KruipItem.activeItem").each(function (index) {
      index++
      bobject.totaal = 450
      bobject.type = "kruipluik zagen"
      $(".KruipItem:nth-of-type(" + index + ")   :input").each(function (Index) {
        console.log($(this))

        if ($(this).attr("name") == "dikker") {
          if ($(this).prop('checked')) {
            bobject.maat = $(this).val()
            bobject.totaal = 0
            $('.modal').modal('show')
          }
        }
      });

      totalItems.push(bobject)

      $(".KruipItem span.totaal").eq(index - 1).html(formatter.format(bobject.totaal))

      bobject = {}
    });



    $(".ZagenItem.activeItem").each(function (index) {
      bobject.type = "Beton zagen"
      bobject.lengte = $(".Zlengte").eq(index).val()
      bobject.dikte = $(".Zdikte").eq(index).val()
      if(bobject.dikte >= 25){
        $('.modal').modal('show')
      }
      bobject.totaal = bobject.lengte * bobject.dikte * 3
      totalItems.push(bobject)
      $(".ZagenItem span.totaal").eq(index).html(formatter.format(bobject.totaal))
    });

    FactuurTotaal.zagenTotaal = totalItems

  }

  function puinafvoer(h,l,d) {
    //var puinafvoer
    console.log(l + d + h)
    var kuub = (h * l * d)/1000000*2.5
    console.log('kuub= ' + kuub)
    if(kuub >= 3 && kuub <= 6){
        puinafvoer.text = '6 &#13221;'
        puinafvoer.conprijs = 175
        puinafvoer.kuub = 6
    } else if( kuub <= 3){
        puinafvoer.text = '3 &#13221;'
        puinafvoer.conprijs = 150
        puinafvoer.kuub = 3
    } else if(kuub >= 6 && kuub <= 9){
        puinafvoer.text = '3 &#13221; + 6 &#13221;'
        puinafvoer.conprijs = 325
        puinafvoer.kuub = 9
    } else if(kuub >=9 && kuub<= 12) {
       puinafvoer.text = '2 maal een 6 &#13221;'
       puinafvoer.conprijs = 350
       puinafvoer.kuub = 12
    }
    if($('#trap2').is(':checked')) {
      $('#etages').show()
      puinafvoer.trap =  $('#trapLopen').val();
    } else {
      $('#etages').hide()
      puinafvoer.trap = 1
    }
    
    if($('#lift').is(':checked')) {
      ruimprijs = 225
    } else {
      ruimprijs = 90
    }
    puinafvoer.metersLopen = $('#meterLopen').val()
    puinafvoer.opruimen = puinafvoer.trap * (Math.ceil(kuub) * ruimprijs)

    if(puinafvoer.metersLopen >= 25){
      puinafvoer.lopenprijs = puinafvoer.opruimen + (puinafvoer.metersLopen - 25) * 2
    } else {
      puinafvoer.lopenprijs = puinafvoer.opruimen
    }

    
    $('.containerformaat').html(puinafvoer.text)

    puinafvoer.totaal = puinafvoer.conprijs + puinafvoer.lopenprijs
    console.log(puinafvoer.totaal)
    return puinafvoer
  }



  function kruipOphalen() {
    var object = {}
    var totalItems = []
    renovatieAantal = $("#kokerAantal").val()
    koekoekAantal = $("#koekoekAantal").val()

    if (renovatieAantal > 5) {
      renovatieprijs = 60
    } else {
      renovatieprijs = 65
    }
    if (koekoekAantal > 5) {
      koekoekprijs = + 175
    } else{
      koekoekprijs = 180
    }
    object.koekoekprijs = koekoekprijs
    object.renovatieprijs = renovatieprijs
    object.renovatieAantal = renovatieAantal
    object.koekoekAantal = koekoekAantal
    object.koekoektotaal = koekoekAantal *koekoekprijs
    object.renovatietotaal = renovatieAantal * renovatieprijs
    object.totaal = renovatieAantal * renovatieprijs + koekoekAantal *koekoekprijs
    totalItems.push(object)

    FactuurTotaal.kruipTotaal = totalItems

  }

  function frezenOphalen() {
    var object = {}
    var totalItems = []

    // muur
    var muurLengte = $("#muurLengte").val();
    var muurPrijs = 20
    if (muurLengte > 9) {
      muurPrijs = 15
    }
    var muurTotaal = muurLengte * muurPrijs
    $("#muur .totaal").html(formatter.format( muurTotaal));

    totalItems.push({ type: "Sleuven muur", lengte: muurLengte, prijs: muurPrijs, totaal: muurTotaal })

    // Vloer
    var vloerLengte = $("#vloerLengte").val();
    var vloerPrijs = 20
    if (vloerLengte > 9) {
      vloerPrijs = 15
    }
    var vloerTotaal = vloerLengte * vloerPrijs
    $("#vloer .totaal").html(formatter.format(vloerTotaal));

    totalItems.push({ type: "Sleuven vloer", lengte: vloerLengte, prijs: vloerPrijs, totaal: vloerTotaal });

    // Plafond
    var plafondLengte = $("#plafondLengte").val();
    var plafondPrijs = 50
    var plafondTotaal = plafondLengte * plafondPrijs
    $("#plafond .totaal").html(formatter.format( plafondTotaal));


    totalItems.push({ type: "Sleuven plafond", lengte: plafondLengte, prijs: plafondPrijs, totaal: plafondTotaal })

    //contactdoos
    var contactAantal = $("#contactAantal").val();
    var contactPrijs = 15
    if (contactAantal > 9) {
      contactPrijs = 12.50
    }
    var contactTotaal = contactAantal * contactPrijs
    $("#doos .totaal").html(formatter.format(contactTotaal));

    totalItems.push({ type: "wandcontactdoos", aantal: contactAantal, prijs: contactPrijs, totaal: contactTotaal })

    //hoek om
    var hoekAantal = $("#hoekAantal").val();
    var hoekPrijs = 37.50
    var hoekTotaal = hoekAantal * hoekPrijs
    $("#hoek .totaal").html(formatter.format(hoekTotaal));

    totalItems.push({ type: "hoek om frezen", aantal: hoekAantal, prijs: hoekPrijs, totaal: hoekTotaal })

   

    FactuurTotaal.frezenTotaal = totalItems

  }

  // zagen
  $('#Zagen').click(function () {
    $('.sectie').hide();
    $('#ZagenSectie').show();
    $(".nav-link").removeClass("active")
    $(this).addClass("active")
  })


  $('#wandBtn').click(function () {
    if ($('.WandItem').is(":hidden")) {
      $('.WandItem').addClass('activeItem');
      $(".offerteInfo").append($('.wandsparingInfo').clone())
    } else {
      $(".WandItem:last").clone().insertAfter(".WandItem:last");
    }
    update()
  })

  $('#trapBtn').click(function () {
    //$('.TrapItem').addClass('activeItem');
    //update()
    $('.modal').modal('show')
  })

  $('#kruipBtn').click(function () {
    $('.KruipItem').addClass('activeItem');
    $(".offerteInfo").append($('.kruipluikInfo').clone())
    update()
  })

  $('#betonBtn').click(function () {
    $('.ZagenItem').addClass('activeItem');
    $(".offerteInfo").append($('.frezenInfo').clone())
    update()
  })

  // frezen  

  $('#Frezen').click(function () {
    $('.sectie').hide();
    $('#FrezenSectie').show();
    $(".nav-link").removeClass("active")
    $(this).addClass("active")
  })


  $('#Betonslopen').click(function () {
    $('.sectie').hide();
    $("#BetonslopenSectie").toggle();
    $(".nav-link").removeClass("active")
    $(this).addClass("active")
  });

  $('#Airco').click(function () {
    $('.sectie').hide();
    $('#AircoSectie').show();
    $(".nav-link").removeClass("active")
    $(this).addClass("active")
  });

  $('#Kruipruimteventilatie').click(function () {
    $('.sectie').hide();
    $('#KruipruimteventilatieSectie').show();
    $(".nav-link").removeClass("active")
    $(this).addClass("active")
  });




  // info tonen

  $(".infoButton").click(function () {
    $('.sectie:visible > .info').toggle();
  })




  $(document).on("click", "span.close", function () {
    if ($('.WandItem').length < 2) {
      $(this).parent().parent().removeClass("activeItem")
    } else {
      $(this).parent().parent().remove();
    }
    update()
  })


  function addMore() {

  }
  function deleteRow() {
    $('DIV.product-item').each(function (index, item) {
      jQuery(':checkbox', this).each(function () {
        if ($(this).is(':checked')) {
          $(item).remove();
          update()
        }
      });
    });
  }

  function infoIcon(info) { 
    if(info == 'kruipluik zagen') {info = '.kruipluikInfo'}
    if(info == 'Wandsparing zagen'){info = '.wandsparingInfo'}
    if(info == 'Beton zagen'){info = '.zagenInfo'}
    return `<td><a onclick='$(" ${info} ").toggle();'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg></a></td>`
    }



  function offerte() {
    $('#offerte').html("<table id='offerte' style='width:100%'><tr><th>Werkzaamheden</th><th>maatvoering</th><th>Prijs</th><th>Totaalprijs</th></tr</table>")
    //FactuurTotaal.BorenTotaal
    if(!!FactuurTotaal.BorenTotaal){
      for(i=0;i < FactuurTotaal.BorenTotaal.length; i++){
      $('#offerte table').append(`<tr><<td>${FactuurTotaal.BorenTotaal[i].type} boren</td><td>${FactuurTotaal.BorenTotaal[i].aantal} x ${FactuurTotaal.BorenTotaal[i].bmm} MM</td><td>&euro; ${FactuurTotaal.BorenTotaal[i].bloca + FactuurTotaal.BorenTotaal[i].bmm}</td>${FactuurTotaal.BorenTotaal[i].totaal}<td>&euro; ${FactuurTotaal.BorenTotaal[i].totaal}</td>${infoIcon('.borenInfo')}</tr>`)
      }
    }
    //FactuurTotaal.zagenTotaal
    if(!!FactuurTotaal.zagenTotaal){
     for(i=0;i < FactuurTotaal.zagenTotaal.length; i++){
       var huidige = FactuurTotaal.zagenTotaal[i]
       var gegevens = ''
      if(huidige.hoogte != null){gegevens +=` Hoogte: ${huidige.hoogte} MM`}
      if(huidige.breedte != null){gegevens +=` Breedte: ${huidige.breedte} MM`} 
      if(huidige.dikte != null){gegevens +=` Dikte: ${huidige.dikte} MM`}
      if(huidige.lengte != null){gegevens +=` Lengte: ${huidige.lengte} MM`}
      $('#offerte table').append(`<tr><td>${huidige.type}</td><td>${gegevens}</td><td>&euro; ${huidige.totaal}</td><td>&euro; ${huidige.totaal}</td>${infoIcon(huidige.type)}</tr>`)
      }   
    }


    //FactuurTotaal.frezenTotaal
    if(!!FactuurTotaal.frezenTotaal){
     for(i=0;i < FactuurTotaal.frezenTotaal.length; i++){
       var huidige = FactuurTotaal.frezenTotaal[i]
       var gegevens = ''
      if(huidige.aantal != 0 && huidige.lengte != 0){
        if(huidige.aantal != null){gegevens +=` aantal: ${huidige.aantal}`}
        if(huidige.lengte != null){gegevens +=` Lengte: ${huidige.lengte} meter`}
        $('#offerte table').append(`<tr><td>${huidige.type}</td><td>${gegevens}</td><td>&euro; ${huidige.prijs}</td><td>&euro; ${huidige.totaal}</td>${infoIcon('.frezenInfo')}</tr>`)
        }   
     }
    }

    //FactuurTotaal.kruipTotaal
    if(!!FactuurTotaal.kruipTotaal){
       var huidige = FactuurTotaal.kruipTotaal[0]
       var gegevens = ''
      if(huidige.koekoekAantal != 0 && huidige.koekoekAantal != null){
        $('#offerte table').append(`<tr><td>koekoeks koker</td><td> aantal: ${huidige.koekoekAantal}</td><td>&euro; ${huidige.koekoekprijs}</td><td>&euro; ${huidige.koekoektotaal}</td>${infoIcon('.KruipruimteventilatieInfo')}</tr>`)
      }   
      if(huidige.renovatieAantal != 0 && huidige.koekoekAantal != null){
        $('#offerte table').append(`<tr><td>renovatie koker</td><td>aantal: ${huidige.renovatieAantal}</td><td>&euro; ${huidige.renovatieprijs}</td><td>&euro; ${huidige.renovatietotaal}</td>${infoIcon('.KruipruimteventilatieInfo')}</tr>`)
      } 
      
    }

    //FactuurTotaal.totaalbedrag
    
    
    
    console.log('offerte')
    console.log(FactuurTotaal)

    /*

    kruipTotaal: 
   [ { koekoekprijs: 175,
       renovatieprijs: 65,
       renovatieAantal: '5',
       koekoekAantal: '6',
       totaal: 1375 } ],
    { BorenTotaal: [ { aantal: '1', totaal: 75, bmm: 50, bloca: 25 } ],
  totaalbedrag: 1020.5,
  zagenTotaal: 
   [ { type: 'Wandsparing zagen',
       hoogte: '230',
       puin: false,
       breedte: '90',
       dikte: '10',
       totaal: 350 },
     { totaal: 450, type: 'kruipluik zagen' },
     { type: 'Beton zagen', lengte: '1', dikte: '1', totaal: 3 } ],
  frezenTotaal: 
   [ { naam: 'muur', lengte: '1', prijs: 20, totaal: 20 },
     { naam: 'vloer', lengte: '1', prijs: 20, totaal: 20 },
     { naam: 'plafond', lengte: '1', prijs: 50, totaal: 50 },
     { naam: 'contact', aantal: '1', prijs: 15, totaal: 15 },
     { naam: 'hoek', aantal: '1', prijs: 37.5, totaal: 37.5 } ] }
  }
  
  */
  };

});




// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let placeSearch;
let autocomplete;
const componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name",
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    { types: ["geocode"] }
  );
  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(["address_component"]);

  autocomplete.setComponentRestrictions({
    country: ["nl"],
  });
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  var placeInfo = place.address_components
  console.log(placeInfo)
  for (i = placeInfo.length -1; i >= 0; i--) {
    if (placeInfo[i].types[0] == "administrative_area_level_1") {
      zetLocatie(placeInfo[i].short_name)
      locatie.provincie = placeInfo[i].short_name
    }
    if (placeInfo[i].types[0] == "administrative_area_level_2") {
      zetLocatie(placeInfo[i].short_name)
    }
    if (placeInfo[i].types[0] == "locality") {
      console.log('test')
      zetLocatie(placeInfo[i].short_name)
      locatie.woonplaats = placeInfo[i].short_name
    }
    console.log(locatie)
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy,
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

function zetLocatie(local) {
  console.log(local)
  if (local === "Heerewaarden" || local === "Tiel" || local === "Oss" || local === "Geldermalsen" || local === "Zaltbommel" || local === "Geldermalsen" || local === "Geldermalsen" || local === "Geldermalsen" )  {
    voorrijkosten = 50
    minumum = 150
    factor = 1
    maximum = 400
    $('.step2Next').show()
    $(".buitenregio").hide()

  } else if (local === "GR" || local === "fr") {
    voorrijkosten = 100
    minumum = 230
    factor = 1.3
    maximum = 700
    $('.step2Next').show()
    $(".buitenregio").hide()

  } else if (local === "LI") {
    voorrijkosten = 50
    minumum = 180
    factor = 1.2
    maximum = 400
    $('.step2Next').show()
    $(".buitenregio").hide()

  } else if (local === "ZL") {
    voorrijkosten = 75
    minumum = 175
    factor = 1.1
    maximum = 400
    $('.step2Next').show()
    $(".buitenregio").hide()

  } else if (local === "ZH" || local === "NH" || local === "UT" || local === "Almere") {
    voorrijkosten = 50
    minumum = 150
    factor = 1
    maximum = 400
    $('.step2Next').show()
    $(".buitenregio").hide()

  } else if (local === "DR" || local === "OV") {
    voorrijkosten = 75
    minumum = 200
    factor = 1.2
    maximum = 600
    $('.step2Next').show()
    $(".buitenregio").hide()

  } else if (local === "NB" || local === "GE") {
    voorrijkosten = 50
    minumum = 180
    factor = 1
    maximum = 400
    $('.step2Next').show()
    $(".buitenregio").hide()

  } else if (local === "FL") {
    voorrijkosten = 75
    minumum = 180
    factor = 1.1
    maximum = 400
    $('.step2Next').show()
    $(".buitenregio").hide()

  } else if (local ===  "Texel" || local ===  "Vlieland" || local ===  "Terschelling"|| local ===  "Ameland" || local ===  "Schiermonnikoog" ) {
    console.log('buiten regio')
    $(".buitenregio").show()
    $('.step2Next').hide()
  }
  $("#voorrij").html(formatter.format(voorrijkosten))

};
