function editDivTable(table) {
    let edit = false;
    let resizeColumn = false;

    const datas = table.getElementsByClassName("mt-rc");
    document.onkeydown = (e) => selectNext(e);
    for(let i = 0; i < datas.length; i++) {
        let tdElement = datas[i];
        tdElement.addEventListener("click", () => editContent(tdElement));
        tdElement.addEventListener("keydown", (e) => selectNext(e, tdElement));
    };

    let header = document.getElementById("my-headers");
    header.onmousemove = function(e) {
        if (e.target.className === "mt-hc") {
            const cursor = mouseResizeblePosition(e);
            if (cursor === "none") {
                e.target.style.cursor = "auto";
            }else{
                e.target.style.cursor = "col-resize";
            }
        }

        
    }
    header.onmouseout = function(e) {
        e.target.style.cursor = "auto";
    }
    header.onmousedown = function(e) {
        e.preventDefault();
        const domRect = header.getBoundingClientRect();
        const cursor = mouseResizeblePosition(e);
        const lineLeft = document.createElement("div");
        const lineRight = document.createElement("div");
        let element = e.target;
        if (cursor === "left") {
            element = e.target.previousElementSibling;
        }
        element.classList.add("my-hc-resize");
        lineLeft.classList.add("my-resizeline");
        lineLeft.style.top = 20 + domRect.top + "px";
        lineLeft.style.left = element.offsetLeft + "px";
        lineRight.classList.add("my-resizeline");
        lineRight.classList.add("my-follow");
        lineRight.style.top = 20 + domRect.top + "px";
        lineRight.style.left = element.offsetLeft + element.offsetWidth + "px";
        document.body.appendChild(lineLeft);
        document.body.appendChild(lineRight);
        resizeColumn = true;
    }
    document.onmouseup = function() {
        let lines = document.getElementsByClassName("my-resizeline");
        var element = document.getElementsByClassName("my-hc-resize")[0];
        if (element !== undefined) {
            let index = 0;
            let child = element;
            let table = document.getElementById("mytable");
            while( (child = child.previousElementSibling) != null ) index++;
            for (let i = 0; i < table.children.length; i++) {
                const row = table.children[i];
                const childResize = row.children[index];
                childResize.style.width = element.style.width; 
                childResize.style.maxWidth = element.style.maxWidth; 
            }
            
            element.classList.remove("my-hc-resize");
        }
        while(lines[0]) {
            lines[0].parentNode.removeChild(lines[0]);
        }
        refreshSelectHighlight();
        resizeColumn = false;
    }
    document.onmousemove = function(e){
        if (resizeColumn) {
            const line = document.getElementsByClassName("my-follow")[0];
            const element = document.getElementsByClassName("my-hc-resize")[0];
            if (line !== undefined) {
                line.style.left = e.x + 1 + "px";
            }
            if (element !== undefined) {
                element.style.width = e.x - element.offsetLeft - 2 + "px";
                element.style.maxWidth = e.x - element.offsetLeft - 2 + "px";
            }
        }
    }

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
        let selectedHeaders = document.getElementsByClassName("my-hc-selected");
        if (oldElement != undefined) {
            oldElement.classList.toggle("selected");
        }
        for (let i = 0; i < selectedHeaders.length; i++) {
            const selectedHeader = selectedHeaders[i];
            selectedHeader.classList.toggle("my-hc-selected");
        }
        let input = document.getElementById("mt-input-edit");
        if (input != undefined) {
            input.blur();
        }
        element.classList.toggle("selected");
        refreshSelectHighlight();
    }

    function refreshSelectHighlight(){
        const element = document.getElementsByClassName("selected")[0];
        const selector = document.getElementById("mt-selection-highlight");
        const headers = document.getElementById("my-headers");
        const firstHeader = headers.children[0];
        if (element !== undefined) {
            const domRect = element.getBoundingClientRect();
            selector.style.top = domRect.top - 1 + "px";
            selector.style.left = domRect.left - 1 + "px";
            selector.style.width = domRect.width - 1 + "px";
            selector.style.height = domRect.height - 1 + "px";
            let i = 0;
            let child = element;
            while( (child = child.previousElementSibling) != null ) i++;
            firstHeader.children[i].classList.add("my-hc-selected");
        }
    }

    const mouseResizeblePosition = function(e){
        if (hasClass(e.target, "mt-hc")) {
            const domRect = e.target.getBoundingClientRect();
            if(e.target.offsetLeft + domRect.width - 5 < e.x) {
                return "right";
            }
            if(e.target.offsetLeft + 5 > e.x) {
                return "left";
            }
            
            return "none";
        }
    }

    const hasClass = function (element, selector) {
        var className = " " + selector + " ";
        var eleClassName = (" " + element.className + " ").replace(/[\n\t\r]/g, " ");
        if (eleClassName.indexOf(className) > -1) {
            return true;
        }
    
        return false;
    }
}