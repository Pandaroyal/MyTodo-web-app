window.addEventListener("load", () => {
    const form = document.querySelector("#form");
    const input = document.querySelector(".task");
    const mytask = document.querySelector(".itemHeading");
    let count=0,pn=0,todo =[];
    if(mytask.hasChildNodes()){
        const d = document.querySelector(".noEle");
        d.remove();
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = input.value;
        if(!task){
            if(count==0){
                count=1;
                const p = document.createElement("p");
                p.innerHTML="Please, write youe task";
                form.appendChild(p);
            }
            return;
        }else{
            if(count==1){
                const p = document.querySelector("p");
                p.remove();
                count=0;
            }
            createList(task);
            todo.push(task);  
            save();
        }
    })
    function createList(task){
        const taskList = document.createElement("div");
        const myTask_input = document.createElement("input");
        const edit_btn = document.createElement("button");
        const del_btn = document.createElement("button");

        mytask.appendChild(taskList);
        taskList.appendChild(myTask_input);
        taskList.appendChild(edit_btn);
        taskList.appendChild(del_btn);

        taskList.classList.add("taskList");

        myTask_input.classList.add("myTask");
        myTask_input.type="text";
        myTask_input.value=task;
        myTask_input.setAttribute("readonly", "readonly"); 
                
        edit_btn.classList.add("edit");
        edit_btn.innerText="edit";
                
        del_btn.classList.add("delete");
        del_btn.innerText="delete";
                
        myTask_input.addEventListener("input",() => {
            myTask_input.text = myTask_input.value;
        })
        let edit=false;
        edit_btn.addEventListener("click", () =>{    
        if(edit){
            if(confirm("Save changes")){
                const index = todo.indexOf(localStorage.getItem("temp"));
                todo[index]=myTask_input.value;
                save();
                myTask_input.setAttribute("readonly","readonly");
                edit_btn.innerText="edit";
                edit=false;
                }
            }else{
                localStorage.setItem("temp",myTask_input.value);
                myTask_input.removeAttribute("readonly");
                myTask_input.focus();
                edit_btn.innerText="save";
                edit=true;
            }
        })
        del_btn.addEventListener("click", () =>{
            if(confirm("Do you really want to delete it?")){
                todo = todo.filter(t => t!=myTask_input.value);
                console.log(todo);
                taskList.remove();
                save();
            }
        })
        return {myTask_input,edit_btn,del_btn};
    }
    function save(){
        const save = JSON.stringify(todo);
        localStorage.setItem("value",save);
    }
    function prevTodo(){
        const prev = JSON.parse(localStorage.getItem("value"));
        prev.forEach(element => {
            createList(element);
            todo.push(element);
        });
    }
    prevTodo();     
})