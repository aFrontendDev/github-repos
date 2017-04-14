import React from "react";

const SomeText = (props) => {
    return (
        <p>{props.tagline}</p>
    )
}

SomeText.propTypes = {
    tagline: React.PropTypes.string.isRequired
}

export default SomeText;