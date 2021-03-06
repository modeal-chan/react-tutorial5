import React, { useState, useEffect, useRef } from 'react'

function TodoForm(props) {
    const [ input, setInput ] = useState(props.edit ? props.edit.value : '');
    const inputRef = useRef(null); // 생성된 todo input창에 focus될 수 있는 코드. (커서 깜빡이)
    useEffect(() => {
        inputRef.current.focus();
    })

    const handleChange = e => {
        setInput(e.target.value); // onChnage 이벤트 핸들러는 첫번째 매개변수 e라는 이벤트 객체를 받게 된다. 이벤트 객체의 value값을 가르킨다. 여기서는 input의 value={input}을 가르킨다.
    }
    const handleSubmit = e => {
        e.preventDefault(); // 새로고침 현상을 막는다.

        props.onSubmit({ // input에 입력된 내용을 저장한다. 
            id: Math.floor(Math.random() * 1000), // 함수가 작동될때마다 id에 랜덤한 수를 생성.
            text: input // 입력된 데이터를 text라는 키값에 전달.
        });
        setInput(''); // 사용자가 텍스트를 입력후 input창을 빠져나왔거나 "Add Todo"버튼을 클릭 했음에도 불구하고 input창에 텍스트가 그래도 남아 있는 겻을 reset해주기 위함이다.
    }
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? ( 
                <>
                    <input
                    type="text"
                    placeholder="Update your item"
                    value={input} // useState의 초기값이 비어 있다.
                    name="text"
                    className="todo-input edit"
                    onChange={handleChange} // 자바스크립트 이벤트 핸들러인 onchange는 input의 변경된 내용을 감지하여 onchange 안에 있는 함수를 실행시킨다.
                    ref={inputRef}
                    />
                    <button onClick={handleSubmit} className="todo-button edit">Update</button>
                </> 
                ) : ( 
                <>
                <input
                    type="text"
                    placeholder="Add a todo"
                    value={input}
                    name="text"
                    className="todo-input"
                    onChange={handleChange} 
                    ref={inputRef}
                />
                <button onClick={handleSubmit} className="todo-button">Add todo</button>
                </>
            )}
        </form>
    );
}

export default TodoForm;