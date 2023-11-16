import React from "react";
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
        const {iteams} = this.props;
        let suggestions = [];
        const value = e.target.value;
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
        this.setState(()=>({
          text:value,
          suggestions:[]
        }))
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
        <div className="TypeAheadDropDown">
          <input onChange={this.onTextChange} placeholder="Search dorm name" value={text} type="text" />
          {this.renderSuggestions()}
        </div>
        );
      }
}