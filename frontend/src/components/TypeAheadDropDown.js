import React, { useState } from "react";
import '../TypeAheadDropDown.css'

export default class TypeAheadDropDown extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        suggestions: [],
        text:''
      }
    }

    onTextChange = (e) => {
        const {iteams, onChange} = this.props;
        let suggestions = [];
        const value = e.target.value;
        if (typeof onChange === "function") {
          onChange(e); // This allows you to call the function you made to update location.
        }
            
        if (value.length > 0) {
          const regex = new RegExp(`^${value}`, `i`);
          suggestions = iteams.sort().filter(v => regex.test(v));
        }

        this.setState(() => ({
            suggestions,
            text:value
        }));
    }

    suggestionSelected=(value)=>{
      const {onChange} = this.props;
        this.setState(()=>({
          text:value,
          suggestions:[]
        }))
        if (typeof onChange === "function") {
          onChange({target: {value : value}});
        }
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;
        //console.log("suggestions :",suggestions);
        if (suggestions.length === 0) {
          return null;
        }
        return (
          <ul>
            {suggestions.map(dorm => <li key={dorm} onClick={(e)=>this.suggestionSelected(dorm)}>{dorm}</li>)}
          </ul>
        )
    }

    render() {
        const {text}=this.state
        return (
        <div className="TypeAheadDropDown" style={{overflowY: "scroll", maxHeight: "100px"}}>
          <input onChange={this.onTextChange} placeholder="Search dorm name" value={text} type="text" required />
          {this.renderSuggestions()}
        </div>
        );
      }
}