import styles from './select.module.css'
import { useState } from 'react';

const Select = ({ text, name, options, handleOnChange, value, required }) => {
    const [isEmpty, setEmpty] = useState(undefined)

    const handleBlur = (event) => {
        if (required && event.target.value === '') {
            setEmpty(true);
            setTimeout(() => {
                setEmpty(undefined)
            }, 2000);
           // clearTimeout(setEmpty(true))
        } else {
            setEmpty(undefined);
        }
    };

    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}</label>
            <select 
            required={required}
            onChange={handleOnChange} 
            name={name} 
            id={name}
            onBlur={handleBlur}
            value={value || ''}
             className={isEmpty && styles.empty}
            >
                <option value="" >Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
            {isEmpty && required && <p className={styles.error_msg}>Campo obrigatório</p>}
        </div>
    )
}

export default Select