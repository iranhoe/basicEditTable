function editTableCell(table) {
    var datas = table.querySelectorAll("td");
    const possiblePadding = 7;
    datas.forEach(function(tdElement){
        tdElement.addEventListener("click", () => editContent(tdElement));
        tdElement.addEventListener("keydown", (e) => selectNext(e, tdElement));
    });

    var selectNext = function(e, tdElement) {
        if (e.keyCode == 9) {
            e.preventDefault();
            if (tdElement.nextElementSibling != null) {
                editContent(tdElement.nextElementSibling);
            } else if (tdElement.parentNode.nextElementSibling != null) {
                editContent(tdElement.parentNode.nextElementSibling.children[0]);
            }
        }

        if (e.keyCode == 39) {
            e.preventDefault();
            if (tdElement.nextElementSibling != null) {
                editContent(tdElement.nextElementSibling);
            }
        }

        if (e.keyCode == 37) {
            e.preventDefault();
            if (tdElement.previousElementSibling != null) {
                editContent(tdElement.previousElementSibling);
            }
        }
        if (e.keyCode == 40) {
            e.preventDefault();
            let i = 0;
            let child = tdElement;
            while( (child = child.previousElementSibling) != null ) i++;
            if (tdElement.parentNode.nextElementSibling != null) {
                editContent(tdElement.parentNode.nextElementSibling.children[i]);
            }
        }
        if (e.keyCode == 38) {
            e.preventDefault();
            let i = 0;
            let child = tdElement;
            while( (child = child.previousElementSibling) != null ) i++;
            if (tdElement.parentNode.previousElementSibling != null) {
                editContent(tdElement.parentNode.previousElementSibling.children[i]);
            }
        }
    }

    var editContent = function(tdElement){
        if (tdElement.getAttribute("edit") != "edit") {
            tdElement.setAttribute("edit", "edit");
            var input = document.createElement("INPUT");
            input.setAttribute("type", "text");
            input.value = tdElement.innerText;
            tdElement.innerHTML = "";
            tdElement.appendChild(input);
            tdElement.classList.toggle("selected");
            input.focus();
            input.style.width = (tdElement.clientWidth - possiblePadding) + "px";
            input.style.height = (tdElement.clientHeight - possiblePadding ) + "px";
            input.addEventListener("blur", function(){
                tdElement.innerHTML = input.value;
                tdElement.setAttribute("edit", "");
                tdElement.classList.toggle("selected");
            });
        }
    }
}