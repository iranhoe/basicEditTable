function editDivTable(table) {
    let edit = false;

    var datas = table.getElementsByClassName("mt-rc");
    document.onkeydown = (e) => selectNext(e);
    for(let i = 0; i < datas.length; i++) {
        let tdElement = datas[i];
        tdElement.addEventListener("click", () => editContent(tdElement));
        tdElement.addEventListener("keydown", (e) => selectNext(e, tdElement));
    };

    var selectNext = function(e) {
        var tdElement = document.getElementsByClassName("selected")[0];
        if (e.keyCode === 9) {
            e.preventDefault();
            if (tdElement.nextElementSibling != null) {
                setSelectHighlight(tdElement.nextElementSibling);
            } else if (tdElement.parentNode.nextElementSibling != null) {
                setSelectHighlight(tdElement.parentNode.nextElementSibling.children[0]);
            }
            return;
        }
        
        if (e.keyCode === 13) {
            let input = document.getElementById("mt-input-edit");
            if (input != undefined) {
                input.blur();
            }
            return;
        }

        if (e.keyCode === 27) {
            edit = false;
            let input = document.getElementById("mt-input-edit");
            if (input != undefined) {
                input.blur();
            }
            return;
        }

        if (edit) {
            return;
        }

        if (e.keyCode === 39) {
            e.preventDefault();
            if (tdElement.nextElementSibling != null) {
                setSelectHighlight(tdElement.nextElementSibling);
            }
            return;
        }

        if (e.keyCode === 37) {
            e.preventDefault();
            if (tdElement.previousElementSibling != null) {
                setSelectHighlight(tdElement.previousElementSibling);
            }
            return;
        }

        if (e.keyCode === 40) {
            e.preventDefault();
            let i = 0;
            let child = tdElement;
            while( (child = child.previousElementSibling) != null ) i++;
            if (tdElement.parentNode.nextElementSibling != null) {
                setSelectHighlight(tdElement.parentNode.nextElementSibling.children[i]);
            }
            return;
        }

        if (e.keyCode === 38) {
            e.preventDefault();
            let i = 0;
            let child = tdElement;
            while( (child = child.previousElementSibling) != null ) i++;
            if (tdElement.parentNode.previousElementSibling != null) {
                setSelectHighlight(tdElement.parentNode.previousElementSibling.children[i]);
            }
            return;
        }

        let regex = /[a-zA-Z0-9_.-]/;
        console.log(e);
        if (tdElement != undefined && e.key.match(regex) && e.key.length == 1){
            editContent(tdElement, e.key);
        }
    }

    var editContent = function(element, value){
        if (!edit) {
            setSelectHighlight(element);
            setInputEdit(element, value);
        }
    }

    function setInputEdit(element, value){
        value = value || ""; 
        edit = true;
        let domRect = element.getBoundingClientRect();
        let input = document.createElement("INPUT");
        input.setAttribute("type", "text");
        input.id = "mt-input-edit";
        input.style.top = domRect.top  + 1 + "px";
        input.style.left = domRect.left + 1 + "px";
        input.style.width = domRect.width - 1 + "px";
        input.style.height = domRect.height - 3 + "px";
        if (value === "" ) {
            input.value = element.innerText ;
        }
        document.body.appendChild(input);
        input.focus();
        input.addEventListener("blur", function(){
            if (edit) {
                element.innerHTML = input.value;
            }
            input.parentNode.removeChild(input);
            edit = false;
        });
    }

    function setSelectHighlight(element) {
        let oldElement = document.getElementsByClassName("selected")[0];
        if (oldElement != undefined) {
            oldElement.classList.toggle("selected");
        }
        let selector = document.getElementById("mt-selection-highlight");
        let domRect = element.getBoundingClientRect();
        let input = document.getElementById("mt-input-edit");
        if (input != undefined) {
            input.blur();
        }
        element.classList.toggle("selected");
        selector.style.top = domRect.top - 1 + "px";
        selector.style.left = domRect.left - 1 + "px";
        selector.style.width = domRect.width + "px";
        selector.style.height = domRect.height + "px";
    }
}