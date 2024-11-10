import React, { useState } from 'react';
import PropTypes, { element } from 'prop-types';

export default function TextForm(props) {

    document.title="textUtils - Home";

    // Set default text if nothing is stored
    let defaultText = 'Enter Text Here';

    // Retrieve stored text from localStorage on mount
    const [text, setText] = useState(localStorage.getItem('userText') || defaultText);
    // const [wpm, setWpm] = useState( 100);
    const [wpm, setWpm] = useState(localStorage.getItem('userReadTime')|| 100);


    // Handle the conversion to uppercase
    const handleUCClick = () => {
        if(text){
            try {
                setText(text.toUpperCase());
                props.showAlert('Success!', 'Text set to upper case successfully', false);
            } catch (err) {
                props.showAlert('Error Occured!', 'Something went wrong while setting text to upper case', true);
            }
        }
        else{
            props.showAlert('Invalid!', 'Nothing to convert Uppercase', true);
        }
    };
    
    // Handle the conversion to lowercase
    const handleLCClick = () => {
        if (text) {
            try {
                setText(text.toLowerCase());
                props.showAlert('Success!', 'Text set to lower case successfully', false);
            } catch (err) {
                props.showAlert('Error Occured!', 'Something went wrong while setting text to lower case', true);
            }
        }else{
            props.showAlert('Invalid!', 'Nothing to convert Lowercase', true);
        }
    };
    
    // Handle focus event to clear default text when focused
    const handleFocus = async() => {
        try{
            let copyT  = await navigator.clipboard.readText()||'';
            if (text === defaultText) {
                if(navigator.clipboard){
                    setText(copyT);
                    props.showAlert('Success!', 'detected copied text', false);
                }else{
                    setText(copyT);
                    props.showAlert('Nothing Found!', 'Unable to detect copied text', false);
                }
            }
            
        }catch(err){
            props.showAlert('warning!', 'Unable to detect copied text', true);
            setText('')
        }
    };

    const handleClearClick = () => {
        if(text){
            try {
                setText('');
                props.showAlert('Success!', 'Text cleared successfully', false);
            }
            catch (err) {
                props.showAlert('Error! Occured', 'Something went wrong while clearing text', true);
            }
        }else{
            props.showAlert('Invalid!', 'Nothing to clear', true);
        }
    };

    // Handle change event in textarea
    const handleOnChange = (event) => {
        setText(event.target.value);
        if (text !== defaultText) {
            localStorage.setItem('userText', event.target.value);
        }
    };

    // Handle reset functionality
    const handleResetClick = () => {
        const storedText = localStorage.getItem('userText');
        if (storedText) {
            setText(storedText);
            props.showAlert('Success!', 'Text restored successfully', false);
        } else {
            props.showAlert('Warning!', "You haven't stored anything", true);
        }
    };
    // Handle copy functionality
    const handleCopyText = () => {
        try {
            if(!text.split(" ").filter((element)=>{return element.length!==0}).length){
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(text).then(() => {
                        props.showAlert('Success!', 'Text copied successfully', false);
                    }).catch(() => {
                        props.showAlert('Error Occured!', 'Something went wrong while copying text.', true);
                    });
                } else {
                    // Fallback method
                    const textArea = document.createElement("textarea");
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        props.showAlert('Success!', 'Text copied successfully', false);
                    } catch (err) {
                        props.showAlert('Error Occured!', 'Something went wrong while copying text.', true);
                    }
                    document.body.removeChild(textArea);
                }
            }else{
                props.showAlert('Invalid!', 'Nothing to copy in text field', true);
            }
        }
        catch (err) {
            props.showAlert('Error Occured!', 'Something went wrong while copying text.', true);
        }
    };

    const handleExtraSpaces = () => {
        if(text){
            try {
                let newText = text.split(/[ ]+/);
                setText(newText.join(" "))
                props.showAlert('Success!', 'Text extra spaces removed successfully', false);
            } catch (err) {
                props.showAlert('Error Occured!', 'Something went wrong while removing extra spaces', true);
            }
        }else{
            props.showAlert('Invalid!', 'Nothing to remove in Spaces', true);
        }
    };

    // (!localStorage.getItem('userReadTime')))?100:localStorage.getItem('userReadTime')
    const checkReadTime = () => {
        const newWpm = parseInt(document.getElementById('wpm').value);
        if (newWpm && !isNaN(newWpm)) {
            setWpm(newWpm);  // Update the WPM state
            localStorage.setItem('userReadTime', newWpm);  // Store it in localStorage
        } else {
            props.showAlert('Warning', 'Please enter a valid number for words per minute.', true);
            document.getElementById('wpm').value = null;
        }
    }

    const readingTime = text.split(" ").filter((element)=>{return element.length!==0}).length / wpm;
    return (
        <>
            <div className={'container my-3 px-5 py-3 rounded border border-' + (props.isDarkMode ? 'white bg-black text-light' : 'black bg-light text-black')} >
                <h1 className='fw-bolder'>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className={"form-control " + (props.isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black')} id="myBox" rows="8" value={text} onFocus={handleFocus} onChange={handleOnChange}
                    ></textarea>
                </div>
                {/* <button className="btn btn-primary mx-1" onClick={handleStore}>Store the Text</button> */}
                <button className={"m-1 btn border-" + (props.isDarkMode ? 'white btn-outline-light' : 'black text-black btn-outline-secondary')} onClick={handleUCClick}>Convert to UpperCase</button>
                <button className={"m-1 btn border-" + (props.isDarkMode ? 'white btn-outline-light' : 'black text-black btn-outline-secondary')} onClick={handleResetClick}>Restore</button>
                <button className={"m-1 btn border-" + (props.isDarkMode ? 'white btn-outline-light' : 'black text-black btn-outline-secondary')} onClick={handleClearClick}>Clear text</button>
                <button className={"m-1 btn border-" + (props.isDarkMode ? 'white btn-outline-light' : 'black text-black btn-outline-secondary')} onClick={handleLCClick}>Convert to LowerCase</button>
                <button className={"m-1 btn border-" + (props.isDarkMode ? 'white btn-outline-light' : 'black text-black btn-outline-secondary')} onClick={handleCopyText}>Copy Text</button>
                <button className={"m-1 btn border-" + (props.isDarkMode ? 'white btn-outline-light' : 'black text-black btn-outline-secondary')} onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            </div>
            <div className={'container my-3 px-5 py-3 rounded border border-' + (props.isDarkMode ? 'white bg-black text-light' : 'black bg-light text-black')}>
                <h2 className="fw-bolder">Your Text Summary</h2>
                <p> {text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
                <label htmlFor="wpm" className="col-sm-5 col-form-label">How many word you can read in a minute</label>
                <div className="col-sm-2">
                    <input type="text" className={"form-control " + (props.isDarkMode ? ' bg-black text-light' : 'bg-white text-black border border-black')} id="wpm" onChange={checkReadTime} placeholder={wpm} />
                </div>
                <p>{readingTime.toFixed(2)} minutes to read</p>
            </div>
            <div className={'container my-3 px-5 py-3 rounded border border-' + (props.isDarkMode ? 'white bg-black text-light' : 'black bg-light text-black')}>
                <h3 className='fw-bolder'>Preview</h3>
                <p>{text.length === 0 ? 'No Preview' : text}</p>
            </div>
        </>
    );
}

TextForm.propTypes = {
    heading: PropTypes.string.isRequired,
    isDarkMode: PropTypes.bool.isRequired,
    showAlert: PropTypes.func.isRequired
};