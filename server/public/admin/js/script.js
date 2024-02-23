// Status Button
const statusButtons = document.querySelectorAll("[button-status]");
let url = new URL(window.location.href);
if (statusButtons.length > 0) {
    statusButtons.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    });

}

// Search Form
const formSearch = document.getElementById("form-search");
if (formSearch) {
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;
        if (keyword == "") {
            url.searchParams.delete("keyword");
        }
        else {
            url.searchParams.set("keyword", keyword);
        }
        window.location.href = url.href;
    })
}


// Pagination
const paginationButtons = document.querySelectorAll("[page-number]");
if (paginationButtons.length > 0) {
    paginationButtons.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("page-number");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}


// Change status
const changeStatusButtons = document.querySelectorAll("[button-change-status]");
if (changeStatusButtons.length > 0) {
    const formChangeStatus = document.getElementById("form-change-status");
    changeStatusButtons.forEach(button => {
        button.addEventListener("click", () => {
            let path = formChangeStatus.getAttribute("data-path");
            const id = button.getAttribute("item-id");
            const status = button.getAttribute("item-status");
            const statusChanged = (status == "active" ? "inactive" : "active");
            const action = path + `/${statusChanged}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        });
    });
}





// CheckBox Button
const checkBoxItem = document.querySelector("[checkbox-multi]");
if (checkBoxItem) {
    const checkAllButton = checkBoxItem.querySelector("input[name='check-all']");
    const checkItemButtons = checkBoxItem.querySelectorAll("input[name='check-item']");
    checkAllButton.addEventListener("click", () => {
        checkItemButtons.forEach(button => {
            button.checked = checkAllButton.checked;
        });
    });
    checkItemButtons.forEach(button => {
        button.addEventListener("click", () => {
            const countCheckedButtons = checkBoxItem.querySelectorAll("input[name= 'check-item']:checked").length;
            if (countCheckedButtons == checkItemButtons.length) {
                checkAllButton.checked = true;
            }
            else {
                checkAllButton.checked = false;
            }
        });
    });
}

// Change Multi Status
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    const changeMultiInput = formChangeMulti.querySelector("input[name='ids']");
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();
        const checkedButtons = checkBoxItem.querySelectorAll("input[name= 'check-item']:checked");
        if (checkedButtons.length > 0) {
            const selectAction = formChangeMulti.querySelector("[select-action]");
            if (selectAction.value && selectAction.value == "delete-all") {
                const isConfirm = confirm("Bạn có muốn xóa những sản phẩm này không");
                if (!isConfirm) {
                    return;
                }
            }
            let ids = [];
            checkedButtons.forEach(button => {
                if (selectAction.value == "change-position") {
                    const position = button.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${button.value}-${position}`);
                }
                else {
                    ids.push(button.value);
                }
            });
            changeMultiInput.value = ids.join(" ");
            formChangeMulti.submit();
        }
        else {
            alert("Chưa chọn sản phẩm nào");
        }
    });
}

// Delete Item
const deleteItemButtons = document.querySelectorAll("[delete-item-button]");
if (deleteItemButtons.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    deleteItemButtons.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa không");
            if (isConfirm) {
                const path = formDeleteItem.getAttribute("data-path");
                const id = button.getAttribute("data-id");
                formDeleteItem.action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.submit();
            }
        });
    });
}

// Request Flash
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
    const closeAlertButton = showAlert.querySelector("[close-alert]");
    closeAlertButton.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}


// Sort
const sort = document.querySelector("[sort]");
if(sort){
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");

    sortSelect.addEventListener("change",(event)=>{
        const [sortKey,sortValue] = event.target.value.split("-");
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);
        window.location.href = url.href;
    });
    sortClear.addEventListener("click",()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    });

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    if (sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
        optionSelected.selected = true;
    }
}

// Preview Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change",(event)=>{
        const file = event.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}

// Table Permissions
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions){
    // Display permissions
    const dataRecords =  document.querySelector("[data-records]");
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    records.forEach((record,index)=>{
        const permissions = record.permissions;
        permissions.forEach(permission =>{
            const row = tablePermissions.querySelector(`tr[data-name=${permission}]`);
            const checkbox = row.querySelectorAll("input")[index];
            checkbox.checked = true;
        });
    });
    // Submit permissons
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", ()=>{
        let permissions = [];
        records.forEach(record=>{
            permissions.push({
                id: record._id,
                permissions: []
            });
        })
        
        const rows = tablePermissions.querySelectorAll("tr[data-name]");
        rows.forEach((row)=>{
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            inputs.forEach((input,index)=>{
                if(input.checked){
                    permissions[index].permissions.push(name);
                }
            });
        });

        const formChangePermissions = document.querySelector("#form-change-permissions");
        const submitInput = formChangePermissions.querySelector("input");
        submitInput.value = JSON.stringify(permissions);
        formChangePermissions.submit();
    });
}
