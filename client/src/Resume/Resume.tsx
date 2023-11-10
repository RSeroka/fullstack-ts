import './Resume.css';
import React, { ReactNode } from 'react';
import FontAwesomeIconElementFactory from '../FontAwesomeFacade/FontAwesomeElementFactory';



type ResumeProperties = {
    linkText?: string
}

class Resume extends React.Component<ResumeProperties> {


    render(): ReactNode {
        const pdfLink = process.env.PUBLIC_URL + "/assets/documents/RichardSeroka.Resume.gdoc.pdf"
        const linkText:string = this.props.linkText ? this.props.linkText : 'Resume';
        return (
            <>

            <a target="_blank" rel="noreferrer" href={pdfLink} type="application/pdf">{linkText}</a>
            <span>&nbsp; {FontAwesomeIconElementFactory.instance.create('arrow-up-right-from-square')}</span>
            </>
        )
    }
}

export default Resume;