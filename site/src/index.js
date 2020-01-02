import React from "react"
import { render } from "react-dom"
import "./style.scss"

const likebtn = document.querySelector(".like");
function getData(city){
    var url = "https://api.openweathermap.org/data/2.5/weather?q=";
    var openweatherApiKey = '7b55b40b533897f929d79c9d5869e072';
 
    
    fetch(url+city+"&appid="+openweatherApiKey)
    .then((response)=>{
        if(!response.ok){
            console.log("problem");
        }
        return response.json();})
        .then((response)=>{this.setState({
            cityWeather:response,
            done: true
        })})
    .catch((e)=>console.log(e));

};
class Status extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                likes: 0,
                comment: 0,
                commentList: [],
                cityWeather:{},
                done:false,
            }
        this.submit = this.submit.bind(this);
        this.upLike = this.upLike.bind(this);
        this.reset = this.reset.bind(this);
        this.toggleComment = this.toggleComment.bind(this);
        this.apiCall = this.apiCall.bind(this);
        this.input = React.createRef();
        this.comList = React.createRef();
    }

    upLike() {
        
        this.setState((state) => ({
            likes: state.likes + 1,
        }))
    }
    reset(event) {
        if (event.keyCode == 13) {
            this.input.current.value = "";
        }

    }
    toggleComment(){
     
        if(this.comList.current.style.display == "none"){
            this.comList.current.style.display = "block";
        }
        else{
            this.comList.current.style.display = "none";
        }
    }
    submit(event) {
        if (event.keyCode == 13) {
            this.setState((state) => ({
                comment: state.comment + 1,
                commentList: [...state.commentList, this.input.current.value]
            }))


        }
    }
    apiCall(e){
        if(e.keyCode==13){
            var city = e.target.value;
            console.log(city);
            getData.call(this,city);
        }
    }
    
    render() {
        console.log(this.state.done);
        var weatherMain = this.state.done?this.state.cityWeather.weather[0].main:"none";
        var weatherDes = this.state.done?this.state.cityWeather.weather[0].description:"none";
        var weatherTemp = this.state.done?(this.state.cityWeather.main.temp-273.15):"null";
        return (
            <div>
                <section class="container">
                    <div class="info">
                        <div class="img"></div>
                        <div class="name">
                        <span>Nam Le</span><br/>
                        <span id="time">now</span>
                        </div>
                        <input type="text" placeholder="City" onKeyDown={this.apiCall}></input>
                    </div>
                    <div class="content">
                        <div class="main">
                            <div class = "weather">
                                <p>{weatherMain}</p>
                                <p>{weatherDes}</p>
                                <p>{parseFloat(weatherTemp).toFixed(2)}&#176;C</p>
                            </div>
                        </div>
                        <div class="like" onClick={this.upLike}>
                        <span><i class="far fa-thumbs-up"></i>&nbsp; Like</span>
                        </div>
                        <div class="comment" onClick = {this.toggleComment}>
                        <span><i class="far fa-comment"></i>&nbsp; Comment</span>
                        </div>
                    </div>
                    <div class='status'>
                        <span>{this.state.likes} likes, {this.state.comment} comments</span>
                    </div>
                    
                
                    <div class="commentList" ref={this.comList}>
                        {this.state.commentList.map(function (element) {

                            return <div class="text">{element}</div>;
                        })}
                        <input ref={this.input} type='text' class="text"
                            onKeyDown={this.submit}
                            onKeyUp={this.reset}
                        ></input>
                    </div>
                </section>
                
            </div>


        )
    }
}
render(
    <Status ref={(component) => { window.component = component }} />,
    document.querySelector("#root")
);
