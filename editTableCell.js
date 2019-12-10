function editTableCell(table) {
    var datas = table.querySelectorAll("td");
    datas.forEach(function(element){
        element.addEventListener("click", function(){
            if (element.getAttribute("edit") != "edit") {
                element.setAttribute("edit", "edit");
                var input = document.createElement("INPUT");
                input.setAttribute("type", "text");
                input.value = element.innerText;
                element.innerHTML = "";
                element.appendChild(input);
                input.focus();
                input.style.width = "96px";
                input.addEventListener("blur", function(){
                    element.innerHTML = input.value;
                    element.setAttribute("edit", "");
                });
            }
        })
    });
}