import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'react-bootstrap';

export default function About(props) {
    document.title="textUtils - About";
    return (
        <div className={"container my-5 p-5 rounded border border-" + (props.isDarkMode ? 'white bg-black text-light' : 'black bg-light text-black')}>
            <h1 className="fw-bolder">About Us</h1>
            <Accordion defaultActiveKey="0" className={props.isDarkMode ? 'bg-black text-light' : 'bg-light text-black'}>
                <Accordion.Item eventKey="0" className={props.isDarkMode ? 'bg-black text-light' : 'bg-light text-black'}>
                    <Accordion.Header>1. Transform Text with Ease: Uppercase & Lowercase Conversion</Accordion.Header>
                    <Accordion.Body>
                        Our text utility app simplifies the process of transforming your text. Whether you need to convert a paragraph to uppercase for emphasis or change it to lowercase for better readability, the app offers seamless functionality. Simply input or paste your text, choose the desired conversion option, and instantly see your text transformed, saving you time and effort. This feature is ideal for content creators, students, or anyone who needs quick text editing without any hassle.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className={props.isDarkMode ? 'bg-black text-light' : 'bg-light text-black'}>
                    <Accordion.Header>2. Summarize Texts and Get Key Insights Instantly</Accordion.Header>
                    <Accordion.Body>
                        With our app, summarizing long texts is no longer a tedious task. The built-in summarizer feature scans through lengthy paragraphs and distills them into concise, key points. Whether you're reading articles, reports, or essays, this tool helps you quickly grasp the essential information. This feature is a perfect time-saver for busy professionals, researchers, and students who need to understand large blocks of text in just a few moments.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className={props.isDarkMode ? 'bg-black text-light' : 'bg-light text-black'}>
                    <Accordion.Header>3. Track Reading Progress: Word Count & Words Per Minute (WPM)</Accordion.Header>
                    <Accordion.Body>
                        Understanding your reading habits and progress is easy with our app’s word count and WPM tracker. It provides a real-time count of the number of words in your text, so you can track the length of your content. Additionally, by calculating words per minute (WPM), it gives you an estimate of how long it will take to read the text. Whether you're editing for clarity or planning for an audience, these features enhance your ability to manage your content effectively.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

About.propTypes = {
    isDarkMode: PropTypes.bool.isRequired
  };
  