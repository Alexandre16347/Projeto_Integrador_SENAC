// *******************************************************************************************************************************************
// Area Search


let areaSearch = document.getElementById("areaSearch");

let area = document.createDocumentFragment();



// <div id="areaSearch">
//     <div id="divSearch">
//     <img src="src/media/search3.png" alt="Buscar..."/>
//     <input type="text" id="txtSearch" placeholder="Buscar..."/>
//     <button id="btnSearch">Buscar</button>
//     </div>
// </div>

// let areaSearch = document.createElement(`div`);
// areaSearch.setAttribute("id", "areaSearch");

let divSearch = document.createElement(`div`);
divSearch.setAttribute("id", "divSearch");

let imgSearch = document.createElement(`img`);
imgSearch.setAttribute("alt", "Buscar...");
imgSearch.setAttribute("src", "src/media/search3.png");

let txtSearch = document.createElement(`input`);
txtSearch.setAttribute("id", "txtSearch");
txtSearch.setAttribute("type", "text");
txtSearch.setAttribute("placeholder", "Buscar...");

let btnSearch = document.createElement(`button`);
btnSearch.append("Buscar");
btnSearch.setAttribute("id", "btnSearch");

divSearch.append(imgSearch);
divSearch.append(txtSearch);
divSearch.append(btnSearch);

area.append(divSearch);

areaSearch.append(area)