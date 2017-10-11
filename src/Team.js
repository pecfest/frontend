import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import Loader from './Loader';
// import SvgCircle from './SvgCircle';
import './Team.css';
import './Team.css';
export default class Team extends Component {

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
        this.color = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#e6ffe0';
    }

    componentWillUnmount() {
        document.body.style.overflow = this.restore;
        document.body.style.backgroundColor = this.color;
    }

    render() {
        return (
    <div className="container-fluid" id="parent_">
        <div className="Team-heading" style={{ textAlign: 'center'}}>
            <h1>PECFEST Team</h1>
        </div>
        <div className="row heading">
            <div className="col">
                <div className="designation">Convener</div>
                             <div className="Team-card" style={{ backgroundImage: "url(/team/placeholder.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Utsav Dahiya</div>
                            <div className="email">utsavdahiya333@gmail.com</div>
                            <div className="phone">8968388133</div></div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="designation">Co-Convener</div>
                <div className="Team-card" style={{ backgroundImage: "url(/team/Lakshay_Piplani.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Lakshay Piplani</div>
                            <div className="email">lakshay.piplani03@gmail.com</div>
                            <div className="phone">9877299387</div></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row heading">
            <div className="col">
                <div className="designation">Secretary</div>
                <div className="row">
                    <div className="Team-card" style={{ backgroundImage: "url(/team/Simran_Katyal.jpg)"}}>
                        <div className="card_inner">
                            <div className="pad"></div>
                            <div className="card_content_top"></div>
                            <div className="card_content_bottom">
                                <div className="name">Simran Katyal</div>
                                <div className="email">simrankatyal.pec@gmail.com</div>
                                <div className="phone">9815022114</div></div>
                        </div>
                    </div>
                    <div className="Team-card" style={{ backgroundImage: "url(/team/Swanya_Singh.jpg)"}}>
                        <div className="card_inner">
                            <div className="pad"></div>
                            <div className="card_content_top"></div>
                            <div className="card_content_bottom">
                                <div className="name">Swanya Singh</div>
                                </div>
                        </div>
                    </div>
                    <div className="Team-card" style={{ backgroundImage: "url(/team/Ayush_Anand.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Ayush Anand</div>
                            <div className="email">ayushanand.pec@gmail.com</div>
                            <div className="phone">8427353298</div></div>
                    </div>
                    </div>

                </div>

            </div>
        </div>

        <div className="row heading">
            <div className="col">
                <div className="designation">Event Coordination (Cultural)</div>
                <div className="Team-card" style={{ backgroundImage: "url(/team/Aayush_Parasher.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Aayush Parasher</div>
                            <div className="email">aayushparashar95@gmail.com</div>
                            <div className="phone">7837307607</div></div>
                    </div>
                </div>

            </div>
            <div className="col">
                <div className="designation">Event Coordination (Techincal)</div>
                <div className="Team-card" style={{ backgroundImage: "url(/team/Kanish_Bajaj.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Kanish Bajaj</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row heading">
            <div className="col">
                <div className="designation">Security and Discipline</div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="Team-card" style={{ backgroundImage: "url(/team/Tejwinder_S_Chauhan.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Tejwinder Singh</div>
                            <div className="email">tejwindersingh137@gmail.com</div>
                            <div className="phone">9646224771</div></div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="Team-card" style={{ backgroundImage: "url(/team/Jasraj_Sandhu.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Jasraj Singh Sandhu</div>
                            <div className="email">jasrajsandhu1996@gmail.com</div>
                            <div className="phone">7210000077</div></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row heading">
            <div className="col">
                <div className="designation">Public Relations and Media</div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="Team-card" style={{ backgroundImage: "url(/team/placeholder.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Akshita Kalra</div>
                            <div className="email">akshitakalra96@gmail.com</div>
                            <div className="phone">8968660212</div></div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="Team-card" style={{ backgroundImage: "url(/team/Aarushi_Gupta.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Aarushi</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row heading">
            <div className="col">
                <div className="designation">Finance</div>
                <div className="Team-card" style={{ backgroundImage: "url(/team/Dil_Raaj_Singh_Mand.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Dil Raj Singh Mand</div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="designation">Printing, Publishing and Stationary</div>
                    <div className="Team-card" style={{ backgroundImage: "url(/team/Pushkar_Bansal.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Pushkar Bansal</div>
                            <div className="email">printing@pecfest.in</div>
                            <div className="phone">9915658241</div></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row heading">
            <div className="col">
                <div className="designation">Infrastructure</div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="Team-card" style={{ backgroundImage: "url(/team/Anreet_Singh_Bhamra.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Anreet Singh Bhamra</div>
                            <div className="email">anreet1996@gmail.com</div>
                            <div className="phone">9501519521</div></div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="Team-card" style={{ backgroundImage: "url(/team/Dipanshu_Agarwal.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Dipanshu Agarwal</div>
                            <div className="email">adipanshu@gmail.com</div>
                            <div className="phone">7696115624</div></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row heading">
            <div className="col">
                <div className="designation">Publicity (Offline and Branding)</div>
                <div className="Team-card" style={{ backgroundImage: "url(/team/Aneet_Saini.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Aneeetinder Kaur Saini</div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="designation">Alumni &amp; Industry Relations</div>
                    <div className="Team-card" style={{ backgroundImage: "url(/team/Rupal_Verma.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Rupal Verma</div>
                            </div>
                    </div>
                    </div>
            </div>
        </div>

        <div className="row heading">
            <div className="col">
                <div className="designation">Creative</div>
                <div className="Team-card" style={{ backgroundImage: "url(/team/Ashish.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Ashish Puri</div>
                            <div className="email">ashish96puri@gmail.com</div>
                            <div className="phone">7589492304</div></div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="designation">Online Publicity and Website Management</div>
                <div className="Team-card" style={{ backgroundImage: "url(/team/Mitesh_Kakkar.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Mitesh Kakkar</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row heading">
            <div className="col">
                <div className="designation">Hospitality &amp; Logistics</div>
                <div className="Team-card" style={{ backgroundImage: "url(/team/Hansin_Garg.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Hansin Garg</div>
                            <div className="email">hansingarg81@yahoo.com</div>
                            <div className="phone">8558888850</div></div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="designation">Mega Shows</div>
                <div className="Team-card" style={{ backgroundImage: "url(/team/placeholder.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Vikramaditya Singh</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row heading">
            <div className="col">
                <div className="designation">Marketing (Branding and Sponsorship)</div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="Team-card" style={{ backgroundImage: "url(/team/placeholder.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Pallabh Singh</div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="Team-card" style={{ backgroundImage: "url(/team/placeholder.jpg)"}}>
                    <div className="card_inner">
                        <div className="pad"></div>
                        <div className="card_content_top"></div>
                        <div className="card_content_bottom">
                            <div className="name">Mayank Mittal</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



        )
    }
}