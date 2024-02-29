import styles from './input.module.css'

import {useState} from 'react'

const Input = ({ type, text, name, placeHolder, handleOnChange, value, required }) => {

    const [isEmpty, setEmpty] = useState(undefined)

    const handleBlur = (event) => {
        if (required && event.target.value.trim() === '') {
            setEmpty(true);
            setTimeout(() => {
                setEmpty(undefined)
            },1000)

            clearTimeout(setEmpty(true))
        } else {
            setEmpty(undefined);
        }
    };

    return (
        <div className={`${styles.formControl} ${isEmpty && styles.empty}`}>
            <label htmlFor={name}>{text}</label>
            <input
                required = {required}
                type={type}
                name={name}
                placeholder={placeHolder}
                value={value}
                id={name}
                onChange={handleOnChange}
                onBlur={handleBlur} />
                {isEmpty && (
                <p className={styles.error_msg}>Campo Obrigatório</p>
            )}
        </div>
    )
}

export default Input