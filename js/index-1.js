$(document).ready(function() {
    count = $("#moneycount").val();
    
    $("#50000").on("click", function() {
        count = parseInt(count)+50000
        $("#moneycount").val(count);
    })
    
    $("#10000").on("click", function() {
        count = parseInt(count)+10000
        $("#moneycount").val(count);
    })
    
    $("#5000").on("click", function() {
        count = parseInt(count)+5000
        $("#moneycount").val(count);
    })


    aprice = $(".price").toArray();
    abox = $(".button-7").toArray();

    $.each(aprice,function(i, value) {
        if(value.innerHTML <= count){
            $.each(abox, function(ii, elt) {
                if(i == ii){
                    $(this).css("background-color","yellow");
                }
            })
        }
    });	

    

    $("#BLACKPINK").on("click", function() {
        if(count >= 80000){
            count = count - 80000;
            $("#moneycount").val(count);
            $("#1").fadeIn("slow");
            $.each(aprice,function(i, value) {
                if(value.innerHTML > count){
                    $.each(abox, function(ii, elt) {
                        if(i == ii){
                        $(this).css("background-color","lavender")
                                }
                                
                            })
                        }
                    });
                    
                }		
            })

    
});