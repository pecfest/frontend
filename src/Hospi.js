import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import Loader from './Loader';
// import SvgCircle from './SvgCircle';
import './Hospi.css';

export default class Hospi extends Component {


    componentDidMount(){

        var em = document.getElementsByClassName("email");
        var phone = document.getElementsByClassName("phone");
        for (var i of em) {
            var txt = i.innerHTML;
            i.innerHTML = "<a href='mailto:"+txt+"' title='"+txt+"'>"+txt+"</a>";
            // console.log(i.innerHTML);
        }
        for (var i of phone) {
            var txt = i.innerHTML;
            i.innerHTML = "<a href='tel:+91"+txt+"' title='+91-"+txt+"'>+91-"+txt+"</a>";
        }

        this.restore = document.body.style.overflow;
        document.body.style.overflow = 'auto';
 
    }

    componentWillUnmount() {
        document.body.style.overflow = this.restore;

    }


    render() {
        return (
    <div className="tabPanel-widget">
    <label for="tab-1" tabindex="0"></label>
      <input id="tab-1" type="radio" name="tabs" checked="true" aria-hidden="true"></input>
    <h2>Policy</h2>
    <div>
    <p>Here at this confluence of art, talent and competitions, a multitude of crowd turns up. It is we, the hospitality and logistics team that caters to the needs of almost every individual that sets foot in our campus.</p>
    <p>With the ever growing footfall at PECFEST, the hospitality of all the guests is of paramount importance. The Hospitality and Logistics team shall leave no stone unturned so as to ensure that the people visiting our campus have a great experience during their stay and leave with smiles on their face and a will to come back again next year. </p>
    <p>Along with providing accommodation to all the guests that seek so, we’ll also set up food services so that our guests won’t have to wander about in search of food. A desk will also be set up for the purpose of registration and all the queries and problems that the guests may have.</p>
    <p>
    <u><b>How to avail</b></u>
    <ol>
    <li>All those who wish to avail accommodation during PECFEST must first register to get their PECFEST ID.</li>
    <li>A desk will be set up at an appropriate location in the campus where all the participants willing to avail accommodation services need to report with the documents required. After that, just leave it upto us.</li>
    </ol>
    </p>

    <p>
    <u><b>Things to remember</b></u>
    <ol>
    <li>Owing to a large number of requests for accommodation, we are bound to provide it on a shared basis.</li>
    <li>You will be given accommodation only after it has been confirmed by the Hospitality and Logistics committee of PECFEST.</li>
    <li>Please bring along the following documents to the Hospitality desk.
        <ol>
        <li>College identity card.</li>
        <li>Registration proof for the event you’re participating in along with the PECFEST ID.</li>
        </ol>
    </li>
    </ol>
    </p>
    </div>
    <label for="tab-2" tabindex="0"></label>
    <input id="tab-2" type="radio" name="tabs" aria-hidden="true"></input>
    <h2>Reaching PEC</h2>
    <div>
      <p>PEC is located in sector 12, Chandigarh adjacent to PGI. It is 6km from the sector 17 bus stand and 10 km from the sector 43 bus stand. It is 12 km from the Chandigarh railway station and 18 km from the Chandigarh airport. Buses are available at regular time intervals from throughout the city for PEC. Also, cabs are available at reasonable rates.</p>
    </div>
    <label for="tab-3" tabindex="0"></label>
    <input id="tab-3" type="radio" name="tabs" aria-hidden="true"></input>
    <h2>Charges</h2>
    <div>
      <p>The charges for availing hospitality facilities are Rs. 800 irrespective of the number of days of stay. Please note that this fee does not include any food service. In certain exceptional circumstances, a penalty may be levied if permanent damage has been done to the room/dorm/accessories where you have been provided accommodation or the rooms are not vacated on or the date mentioned on the receipt issued to the person availing the services.
    </p>
    </div>
    <label for="tab-4" tabindex="0"></label>
    <input id="tab-4" type="radio" name="tabs" aria-hidden="true"></input>
    <h2>Contacts</h2>
    <div>
      <p>If you have any queries, please contact-</p>
      <div className="row">
      <div className="card1" style={{ backgroundImage: "url(/team/placeholder.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Anant</div>
                            <div className="email">askhospi@pecfest.in</div>
                            <div className="phone">7087878548</div></div>
                    </div>
        </div>
        <div className="card1" style={{ backgroundImage: "url(/team/placeholder.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Vikas </div>
                            <div className="phone">8054299381</div></div>
                    </div>
        </div>
        <div className="card1" style={{ backgroundImage: "url(/team/placeholder.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Vaishali </div>
                            <div className="phone">9996864671</div></div>
                    </div>
        </div>
        </div>
    </div>
  </div>
        )
    }
}