function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    requestAPi();
    //hide and show number of person
    $('#number').hide();
    $('#person').hide();

    $('#reciption').on('change', () => {
    $('#number').show();
    $('#person').show();
        var chooseRecipes = $('#reciption').val();
        getDataUrl(chooseRecipes);
    });
});
function requestAPi() {
    $.ajax({
        dataType: 'Json',
        url: getUrl(),
        success: (data) => getRecipes(data.recipes),
    });
};
//loop all data from recipes 
var allData = [];
function getRecipes(rec) {
    allData = rec;
    var option = "";
    rec.forEach(element => {
        option += `<option value="${element.id}">${element.name}</option>`;
    });
    $('#reciption').append(option);
};
//function for get element  from recipes
var numQuantity;
var oldGuest ;
var getDataUrl = (recip) => {
    allData.forEach(item => {
        if (item.id == recip) {
            getHead(item.name, item.iconUrl);
            getDataIngredient(item);
            getStruction(item.instructions);
            getNumber(item.nbGuests);

            oldGuest= item.nbGuests;      
            numQuantity = item;                
        };
    });
};
//function get name and iconUrl from recipes
var getHead = (name, icon) => {
    var heading = "";
    heading += `
    <div class="col-3"></div>
    <div class="col-3" class=" btn text-right"><h2>${name}</h2></div>
    <div class="col-3"><img src="${icon}" width="70%"></div>
    <div class="col-3"></div>
    `;
    $('#nameData').html(heading);
};
//Progress bar for calulate number
var  getNumber = (number) =>{
    var multi = "";
        multi +=`
        <input  class="form-control text-center" value="${number}" disabled id="execute" max="15"min="0">
        `;
    $('#calculate').html(multi);
};
//calculate number of quest when click button
var numbers ; 
$('#add').on('click', function(){
    var addNumber = $('#execute').val();
   var increase = parseInt(addNumber) + 1;
   if(increase <= 15 ){
     $('#execute').val(increase);
     executeNumber(increase);
   }
});
$('#minus').on('click', function(){
    var minusNumber = $('#execute').val();
   var decrease = parseInt(minusNumber) - 1;
   if(decrease >= 1){
     $('#execute').val(decrease); 
    executeNumber(decrease);
   }
});
var executeNumber = (num) =>{
    var getQuantity= "";
    numQuantity.ingredients.forEach(quant => {
        getQuantity +=`
        <tr class ="text-center">
        <td><img src ="${quant.iconUrl}" width= "17%"></td>
        <td>${quant.quantity * num/oldGuest}</td>
        <td>${quant.unit[0].toLowerCase()}</td>
        <td>${quant.name}</td>
        </tr>
        `;
        $('#data').html(getQuantity);
    });
    return parseInt(num);
};
//create for get data from recipes
var getDataIngredient = (ing) => {
    // create for heading
    var ingredients = "";
    ingredients += `<h4 class="text-center">Ingredients</h4>`;
    //result ingredients from recipes
    var result = " ";
    ing.ingredients.forEach(ingre => {
        result += `
        <tr class ="text-center">
        <td><img src ="${ingre.iconUrl}" width= "17%"></td>
        <td>${ingre.quantity}</td>
        <td>${ingre.unit[0].toLowerCase()}</td>
        <td>${ingre.name}</td>
        </tr>
        `;
        $('#data').html(result);
        $('#ingredients').html(ingredients);
   });
};
//function cut step from instruction
var getStruction = (instruct) => {
    var instrunction =instruct.split("<step>");
    //create for verticalline
    var verticalline= "";
    verticalline +=` <div class="col-2"  style="border-right: 2px solid rgb(119, 119, 240);height: 300px;"></div>`;
    $('#vertical_line').html(verticalline);
    //create for instruction 
    var instruction = "";
        instruction += `<h4  class="text-left">Instruction</h4>`; 
        $('#instructions').html(instruction);
    //create for put intruction
    var outputInstruction= "";
    for(var i = 1; i < instrunction.length; i++){
        outputInstruction+= `
            <tr class= "text-left">
                <td><strong class=" btn text-primary">step</strong>${i}<br> ${instrunction[i]};</td>
            </tr>
            `;}
        $('#instruc').html(outputInstruction);
    };