import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
             hasError: false
        }
    }

    static getDerivedStateFromError(error){
        return {
            hasError: true
        }
    }


    componentDidCatch(error, info){
        console.log(error);
        console.log(info);
    }

    // props object contains the children components of 
    // a particular component
    render() {
        if(this.state.hasError)
            return <h1>Something has gone wrong!</h1>
        else 
            return this.props.children;    
    }
}

export default ErrorBoundary;