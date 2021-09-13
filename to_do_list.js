// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~HttpRequest API


const todoAPI = (() => {
   

    const data = {
        id: 1,
        title:'testtestets',
        isTask:true,
        isOverdue:true,
        counter:1
    }

   
    const getAllTodos = () => {
        let json = JSON.stringify(data);
    }

    const deleteTodo = id =>
    fetch(data, { method: 'DELETE' });

    const creatTodo = todoitem =>
        fetch(data, {
            method: 'POST',
            body: JSON.stringify(todoitem),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json());

    return {
        getAllTodos,
        deleteTodo,
        creatTodo

    };

})();
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~View

const View = (() => {
    const domString = {
        todolist: 'todolist-content',
        deletebtn: 'delete-btn',
    }
    // why error in =>
    const render = (data, document.getElementById('title')) => {
        element.title = title;
    }
    // ?? creatHtmlTmp
    const creatHtmlTmp = dataArr => {
        let htmltmp = '';
        dataArr.forEach(ele => {
            htmltmp += `
                    <li>
                        <span>
                            ${ele.title}
                        </span>
                        <button class="delete-btn" id="${ele.id}">
                            &#8730;
                        </button>
                    </li>
                `;
        });
        return htmltmp;
    }

    return {
        domString,
        render,
        creatHtmlTmp
    }
})();
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Model
const Model = ((api, view) => {
    
   class Todo {
        constructor(title) {
            this.title = title;
        }
    }
    class State {
        #todolist = [];

        get todolist() {
            return this.#todolist;
        }

        set todolist(dataArr) {
            this.#todolist = dataArr;

            const todolistElement = document.querySelector('#' + view.domString.todolist);
            const htmltmp = view.creatHtmlTmp(this.#todolist);
            view.render(todolistElement, htmltmp);
        }
    }

    const getAllTodos = api.getAllTodos;
    const deleteTodo = api.deleteTodo;
    const creatTodo = api.creatTodo;

    return {
        State,
        Todo,
        getAllTodos,
        deleteTodo,
        creatTodo
    }
})(todoAPI, View);
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Controler
const Controler = ((view, model) => {
    const state = new model.State();

    const addLisenerOnShowTask = () => {
        const todoinput = document.querySelector('#' + view.domString.todoinput);
        
        todoinput.addEventListener('switch', event => {
            if (event.key === 'switch') {
                const todoitem = new model.Todo(event.target.value);

                model.creatTodo(todoitem).then(data => {
                    state.todolist = [data, ...state.todolist];
                    event.target.value = '';
                });
            }
        });
    }

    const addLisenerOnDelete = () => {
        const todolistElement = document.querySelector('#' + view.domString.todolist);
        todolistElement.addEventListener('click', (event) => {
            state.todolist = state.todolist.filter(ele => +ele.id !== +event.target.id);
            model.deleteTodo(event.target.id);
        });
    }

    const init = () => {
        model.getAllTodos().then(data => {
            state.todolist = data;
        });
        addLisenerOnDelete();
        addLisenerOnShowTask();
    }

    return {
        init
    }

})(View, Model);
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Bootstrap
Controler.init();
