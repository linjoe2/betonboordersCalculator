
$( document ).ready(function() {
  var voorrijkosten = 75
  var minumum = 150
  var factor = 1

// producten 
var FactuurTotaal = {}
var borenTotaal = []
var zagenTotaal = []
var frezenTotaal = []
var slopenTotaal = []
var aircoTotaal = []
var kruipTotaal = []


  $( ".stap1-form" ).change(function() {
    if(this.value === "part") {
      $(".stap2").show()
      $(".verwijzing").hide()
    }else if(this.value === "zak"){
      $(".verwijzing").show()
       $(".stap2").hide()
       ()
    }
  });


// stap 2

// location guesser
  function handleResponse(response) {
    console.log('ip ' + response.state_prov);
    $(".provincie").val(response.state_prov).change();
  }
  _ipgeolocation.getGeolocation(handleResponse, "eb6bf307f9e14621880a9ce4e5a54ac4");

  $( ".provincie" ).change(function() { 
    console.log('val '+ this.value) 
    $(".stap3").show()
    if(this.value === "Groningen" || this.value === "fr"){
        voorrijkosten = 100
        minumum =230
        factor = 1.3
        maximum = 700

    }else if(this.value === "Limburg"){
        voorrijkosten = 50
        minumum = 180
        factor = 1.2
        maximum = 400

    }else if(this.value === "Zeeland"){
        voorrijkosten = 75
        minumum = 175
        factor = 1.1
        maximum = 400

    }else if(this.value === "Zuid-Holland" ||  this.value === "Noord-Holland" || this.value === "Utrecht" || this.value === "Almere")
    {
        voorrijkosten = 50
        minumum = 150
        factor = 1
        maximum = 400

    }else if(this.value === "Drenthe" || this.value === "ov")
    {
        voorrijkosten = 75
        minumum = 200
        factor = 1.2
        maximum = 600

    }else if(this.value === "Noord-Brabant"){
        voorrijkosten = 50
        minumum = 180
        factor = 1
        maximum = 400

    }else if(this.value === "Flevoland"){
        voorrijkosten = 75
        minumum = 180
        factor = 1.1
        maximum = 400

    }else if(this.value === "Gelderland"){
        voorrijkosten = 0
        minumum = 0
        factor =  0
        maximum = 0

    }else if(this.value === "Waddeneilanden"){
        $(".buitenregio").show()
    }

 });




// stap 3

// boren

  $('#Boren').click(function(){
    if($('#BorenSectie:visible').length) {
        $('#BorenSectie').hide();
      }else{
        $('#BorenSectie').show();
      } 
  })

  $('#borenPlus').click(function(){
    console.log('test')
    	$(".BorenItem:last").clone().insertAfter(".BorenItem:last");	
  })

  $('#borenMin').click(function(){
    console.log('test')
    	$(".BorenItem:last").remove();
  })


  $(document).on('input', '#borenaantal', function() {
   var val = this.value
  if(val > 9 ){
    console.log('10+')
  } 
  });


 $( "#BorenSectie" ).change(function( ) {
   var totalItems = []
   var bobject = {}

   $( ".BorenItem" ).each(function( index ) {
  index++
  $( ".BorenItem:nth-of-type("+ index +") :input" ).each(function( Index ) {
     if($( this ).attr("name") == "bloca"){
       bloca = $( this ).val()
           if(bloca == "Plafond"){
              bloca = 125
            }else if(bloca == "muur"){
              bloca = 25
            }else if(bloca == "Vloer"){
              bloca = 0
            }
        bobject.bloca = bloca
     }
    if($( this ).attr("name") == "BorenMM"){
       bmm = $( this ).val()
        if(bmm < 30){
         bmm = 30
        bloca = 0
        }else if(bmm > 160){
         bmm = 75
         }else if(bmm > 30){
         bmm = 50
        }
       bobject.bmm = bmm
     }
    if($( this ).attr("name") == "aantal"){
       borenaantal = $( this ).val()
       bobject.aantal = borenaantal
     }
    });
    bobject.totaal = bobject.aantal * (bobject.bloca + bobject.bmm)

    totalItems.push(bobject)
    bobject = {}
  });
  FactuurTotaal.BorenTotaal = totalItems
  console.log(FactuurTotaal)
  });


// zagen
   $('#Zagen').click(function(){
    if($('#ZagenSectie:visible').length) {
        $('#ZagenSectie').hide();
      }else{
        $('#ZagenSectie').show();
      } 
  })

  $( "#ZagenSectie" ).change(function( event ) {
   var totalItems = []
   var bobject = {}

   $( ".WandItem" ).each(function( index ) {
    index++
    console.log(index)
    $( ".WandItem:nth-of-type("+ index +") :input" ).each(function( Index ) {
     if($( this ).attr("name") == "hoogte"){
       bobject.hoogte = $( this ).val()
       }
      if($( this ).attr("name") == "breedte"){
       bobject.breedte = $( this ).val()
       }
      if($( this ).attr("name") == "dikte"){
       bobject.dikte = $( this ).val()
     }
      if($( this ).attr("name") == "staalNodig"){
        if($( this ).prop('checked')){
          bobject.staal = $( this ).val()
          }
       //bobject.staal = $( this ).val()
     }
    });

    if(bobject.breedte == 90 && bobject.hoogte == 230){
         if(bobject.dikte < 11){
            bobject.totaal = 350 
         } else if(bobject.dikte > 10 && bobject.dikte < 16) {
           bobject.totaal = 550
         } else if(bobject.dikte > 15 && bobject.dikte < 21) {
           bobject.totaal = 750
         } else if(bobject.dikte > 15 && bobject.dikte > 20) {
           console.log('offerte')
         }
       } else {
         if(bobject.dikte < 11){
            bobject.totaal = (bobject.breedte * bobject.hoogte) * 0.015
         } else if(bobject.dikte > 10 && bobject.dikte < 16) {
           bobject.totaal = (bobject.breedte * bobject.hoogte) * 0.0235
         } else if(bobject.dikte > 15 && bobject.dikte < 21) {
           bobject.totaal = (bobject.breedte * bobject.hoogte) * 0.0320
         } else if(bobject.dikte > 15 && bobject.dikte > 20) {
           console.log('offerte')
         }
       }

       
    totalItems.push(bobject)
    bobject = {}
  });

  $( ".TrapItem" ).each(function( index ) {
    index++
    console.log(index)
    $( ".TrapItem:nth-of-type("+ index +") :input" ).each(function( Index ) {
      console.log($( this ))
     if($( this ).attr("name") == "hoogte"){
       bobject.hoogte = $( this ).val()
       }
      if($( this ).attr("name") == "breedte"){
       bobject.breedte = $( this ).val()
       }
      if($( this ).attr("name") == "dikte"){
       bobject.dikte = $( this ).val()
     }
      if($( this ).attr("name") == "staalNodig"){
        if($( this ).prop('checked')){
          bobject.staal = $( this ).val()
          }
       //bobject.staal = $( this ).val()
     }
    });

    

       
    totalItems.push(bobject)
    bobject = {}
  });
  FactuurTotaal.zagenTotaal = totalItems
  console.log(FactuurTotaal)
});



// frezen  

   $('#Frezen').click(function(){
    if($('#FrezenSectie:visible').length) {
        $('#FrezenSectie').hide();
      }else{
        $('#FrezenSectie').show();
      } 
  })

 
  $('#Betonslopen').click(function(){
    console.log('test')
    $('#BetonslopenItem').append(' set')
  }); 

  $('#Airco').click(function(){
    if($('#AircoSectie:visible').length) {
        $('#AircoSectie').hide();
      }else{
        $('#AircoSectie').show();
      } 
  }); 

  $('#Kruipruimteventilatie').click(function(){
        if($('#KruipruimteventilatieSectie:visible').length) {
        $('#KruipruimteventilatieSectie').hide();
      }else{
        $('#KruipruimteventilatieSectie').show();
      } 
  }); 
  



// info tonen

$(".infoButton").click( function(){
      if($('.info:visible').length) {
        $('.info').hide();
      }else{
        $('.info').show();
      } 
})

}); 


function addMore() {

}
function deleteRow() {
	$('DIV.product-item').each(function(index, item){
		jQuery(':checkbox', this).each(function () {
            if ($(this).is(':checked')) {
				$(item).remove();
            }
        });
	});
}