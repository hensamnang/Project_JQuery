function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    requestAPi();
    $('#reciption').on('change', () => {
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
        option += `
            <option value="${element.id}">${element.name}</option>
        `;
    });
    $('#reciption').append(option);
};
//function for get element  from recipes 
var getDataUrl = (recip) => {
    allData.forEach(item => {
        if (item.id == recip) {
            getHead(item.name, item.iconUrl);
            getIngredient(item.ingredients);
            getStruction(item.instructions);
            getNumber(item.nbGuests)
        };
    });
};

//function get name and iconUrl from recipes
var getHead = (name, icon) => {
    var heading = "";
    heading += `
    <div class="col-3"></div>
    <div class="col-3" class=" btn text-right"><h5>${name}</h5></div>
    <div class="col-3"><img src="${icon}" width="70%"></div>
    <div class="col-3"></div>
        `;
    $('#nameData').html(heading)
}

function getNumber(number){
    var multi = "";
        multi +=`
        <div class="col-4"></div>
            <div class="col-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <button class="btn btn-primary" type="button" id="minus">&minus;</button>
                    </div>
                    <input type="number" class="form-control text-center" value="${number}" disabled id="member" max="15"
                        min="0">
                    <div class="input-group-append">
                        <button class="btn btn-success" type="button" id="add">&#x2b;</button>
                    </div>
                </div>
            </div>
            <div class="col-4"></div>
        `;
        $('#number').html(multi)
}


//function get ingredients from recipes
var getIngredient = (ingre) => {
    ingre.forEach(ingredien => {
        getDataIngredient(ingredien);
    });
};
// var getDataIngredient = (inger) => {
//     var result = " ";
//     result += `
//     <tr>
//         <td><img src ="${inger.iconUrl}" width= "10%"></td>
//         <td>${inger.name}</td>
//         <td>${inger.quantity}</td>
//         <td>${inger.unit[0].toLowerCase()}</td>
//     </tr>
//     `;
//     $('#data').append(result);
// }

//function cut step from instruction
var getStruction = (instruct) => {
    var instrunction =instruct.split("<step>");
    var output= "";
    for(var i = 1; i < instrunction.length; i++){
        output+= `
            <tr class= "text-left">
                <td><strong class=" btn text-primary">step</strong>${i} : <br> ${instrunction[i]};</td>
            </tr>
        `;
           
        }
        $('#instruc').html(output);
    }