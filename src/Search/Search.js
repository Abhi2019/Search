import React, {Component} from 'react';
import './Search.css';
import search from '../Images/search.svg';
import images from '../Images/images.png'
class Search extends Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
        cursor: -2,
        result: [],
        filterArr: [],
        isChecked: false,
        isTextVisible: true,
        label: "",
        text: "",
        searchList : [
            {
              "id": "123-s2-546",
              "name": "John Jacobs",
              "items": ["bucket", "bottle"],
              "address": "1st Cross, 9th Main, abc Apartment",
              "pincode": "5xx012"
            },
            {
              "id": "123-s3-146",
              "name": "David Mire",
              "items": ["Bedroom Set"],
              "address": "2nd Cross, BTI Apartment",
              "pincode": "4xx012"
            },
            {
              "id": "223-a1-234",
              "name": "Soloman Marshall",
              "items": ["bottle"],
              "address": "Riverbed Apartment",
              "pincode": "4xx032"
            },
            {
              "id": "121-s2-111",
              "name": "Ricky Beno",
              "items": ["Mobile Set"],
              "address": "Sunshine City",
              "pincode": "5xx072"
            },
            {
              "id": "123-p2-246",
              "name": "Sikander Singh",
              "items": ["Air Conditioner"],
              "address": "Riverbed Apartment",
              "pincode": "4xx032"
            },
            {
              "id": "b23-s2-321",
              "name": "Ross Wheeler",
              "items": ["Mobile"],
              "address": "1st Cross, 9th Main, abc Apartement",
              "pincode": "5xx012"
            },
            {
              "id": "113-n2-563",
              "name": "Ben Bish",
              "items": ["Kitchen Set", "Chair"],
              "address": "Sunshine City",
              "pincode": "5xx072"
            },
            {
              "id": "323-s2-112",
              "name": "John Michael",
              "items": ["Refrigerator"],
              "address": "1st Cross, 9th Main, abc Apartement",
              "pincode": "5xx012"
            },
            {
              "id": "abc-34-122",
              "name": "Jason Jordan",
              "items": ["Mobile"],
              "address": "Riverbed Apartment",
              "pincode": "4xx032"
            }
          ]
    }
  }

  textUpdate = (e)=>{
    let str = e.target.value;
    this.setState({text: str});
  }
      
  callDebounce = ()=> {
        let timer;
        return (e)=> {
            this.textUpdate(e);
            clearTimeout(timer);
            let str = e.target.value;
            console.log(str);
            timer = setTimeout(()=>{ this.getsearchItems(str)}, 400)
        } 
    }
    searchItems = this.callDebounce(Event);
    getsearchItems = (value) => {
      let newArray = [];
      for (let key in this.state.searchList) {
        let a = Object.values(this.state.searchList[key]);
        let str = a.join("");
        if (str.toLowerCase().match(value.toLowerCase()) != null) {
          newArray.push(this.state.searchList[key]);
        }
     
    }
     

    if ((this.state.searchList.length ===  newArray.length  || newArray.length === 0) && value !== "" ) {
      this.setState({filterArr: [], isChecked: true});
    } else if (value === "") {
      this.setState({filterArr: [], isChecked: false, text: ""});
    } else {
      this.setState({filterArr: newArray, isChecked: false});
    }
    
  }
  callMouse = (i)=> { 
     let indexValue = parseInt(i.currentTarget.id);
     this.setState({cursor: indexValue});
  }
  cleartext =()=>{
    this.setState({text: "", isTextVisible: true, filterArr: [], isChecked: false});
  }
  handleKeyDown(e) {
    const cursor = this.state.cursor;
    const result = this.state.filterArr;
    let details, concatAddress;
    let cursorIndex = 0;
    if (e.keyCode === 38 && cursor > 0) {
      e.preventDefault();
      console.log("keyup"+this.state.cursor);
      cursorIndex = this.state.cursor -1;
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }));
       details = this.state.filterArr[cursorIndex];
       concatAddress = details.name + " " + details.address + ","+ details.pincode;
     
    } else if (e.keyCode === 40 && cursor < result.length - 1) {
      e.preventDefault();
      console.log("keydown"+this.state.cursor);
      cursorIndex = this.state.cursor+1;
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }));
      details = this.state.filterArr[cursorIndex];
      concatAddress = details.name + " " + details.address + ","+ details.pincode;
     
    }
    this.setState({label: concatAddress, isTextVisible: false});
  }
    render() {
        let showlist = null;
        if (this.state.filterArr.length > 0) {
          showlist = (
           this.state.filterArr.map((items, i)=>{
             return(<div className ={this.state.hover === i ? "search-element" : null} id={i} onMouseOver={this.callMouse.bind(this)} key={i}>
             <div className={this.state.cursor === i ? "search-active" : null}>
             <div className ="search-border">
             <div>{items.name}</div>
               <span>{items.address}</span><span>{items.pincode}</span>
             </div>
             </div>
             </div>)
           })
          );
        } else if (this.state.isChecked) {
          showlist = "No Result Found";
        }
        return(
            <div>
                <div className="search-inputdiv">
                <input  type="text" className="search-inputBox" placeholder= "Search any item" value= {this.state.isTextVisible ? this.state.text : this.state.label}  onChange={this.searchItems} ></input>
                <input type="image" src = {images} className="search-cross" alt="Search" onClick = {()=>this.cleartext()}></input>
                <input type="image"  src = {search} className="search-image" alt="Search"></input>
                <div tabIndex="0" onKeyDown ={this.handleKeyDown.bind(this)} className="search-result">{showlist}</div>
                </div>
            </div>
        );
    }
}
export default Search;