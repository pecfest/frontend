import React, {Component} from 'react';
import './Sponsors.css';
import './sponsors.js';

/*import ReactDom from 'react-dom';*/



class Sponsors extends Component{

	componentDidMount(){
        this.restore = document.body.style.overflow;
        document.body.style.overflow = 'auto';
    }

    componentWillUnmount() {
        document.body.style.overflow = this.restore;

    }


	render()
	{
		window.j = 0;

		function fin_ki_value(obj){return obj.id>=(window.j+1);}

		window.data = this.props.data;
		console.log(typeof(data));
		const imglist = window.data.map((image,i) => {return (<img key={i} className="col-1" src={image.image} alt="" />);});

		window.type_of_spons = [];

		var img_concat = [];var init=0; var final;

		for(window.j=0;init<imglist.length;window.j++)
		{
			final = window.data.findIndex(fin_ki_value);
			if(final===-1){img_concat[window.j] = imglist.slice(init,imglist.length);window.type_of_spons[window.j] = window.data[init].type;break;}
			console.log("final is ", final);
			window.type_of_spons[window.j] = window.data[init].type;
			img_concat[window.j] = imglist.slice(init,final);
			init = final;
		}

		console.log(img_concat);
		console.log(window.type_of_spons);
		window.j = 0;

		const final_arr = img_concat.map((imag,i) => {
			return (
					<div id="holder-div">
						<div className="App-indi-headers">
						{window.type_of_spons[window.j++]}	
						</div>
						<div className="flex-css" key={i}>
							{imag.concat(" ")}
						</div>
					</div>
					);
		
		});

		

		return (
			<div id="main-div">
			<div className="App-main-header" ><h1>Sponsors</h1></div>
			{final_arr}
			</div> 
		);
	}
}



export default Sponsors;