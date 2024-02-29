import styles from './input.module.css'

const TextArea = ({ name, text, value, placeHolder, handleOnChange }) => {

    return (
        <div className={`${styles.formControl}`}>
            <label htmlFor={name}>{text}</label>
            <textarea
                rows="4"
                name={name}
                placeholder={placeHolder}
                value={value}
                id={name}
                onChange={handleOnChange}
            ></textarea>
        </div>
    )
}

export default TextArea