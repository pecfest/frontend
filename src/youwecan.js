import React, {Component} from 'react';
import './youwecan_css.css';
import youwecan from './images/youwecan.jpg'

class YWC extends Component
{
	componentDidMount(){
        this.restore = document.body.style.overflow;
        document.body.style.overflow = 'auto';
    }

    componentWillUnmount() {
        document.body.style.overflow = this.restore;

    }
	render()
	{

		return (
			<div className="ywc-main-div">
			<div>
			<img className="social_img" src={youwecan} alt="YOUWECAN" />
			</div>
			<div className="social_content">
			<h2 className="social_main-header">WHO WE ARE?</h2>
			<p>
			YOUWECAN, a YUVRAJ SINGH FOUNDATION was established by Indian cricketer
			Yuvraj Singh meant to fight Cancer by spreading awareness about the fatal
			disease. It is an initiative, aimed at detecting and fighting cancer right back at its
			initial stages, making sure that the detected person is not left alone in the biggest
			battle of his life. Through this manoeuvre, YOUWECAN will create consciousness on
			cancer prevention, early detection &amp; Fight against stigma. YUVRAJ SINGH
			FOUNDATION is a Non-Profit organisation founded in 2009 registered under the
			BOMBAY PUBLIC TRUST ACT 1950.
			</p>
			<p>
			Our aim is to create awareness and eradicate the socio-psychological stigma with
			Cancer along with providing mobile cancer examination stations within the reach
			of masses with a view to make routine check-ups a habit.
			</p>
			<br/>
			<h2 className="social_main-header">WHAT DO WE DO?</h2>
			<h3 className="">RAISE AWARENESS</h3>
			<p>
			YUVRAJ SINGH FOUNDATION conducts regular cancer awareness programs which
			includes Cancer’s causes, control symptoms, early detection and its treatment
			with an aim to remove the stigma within the society. In these programs we play a
			pivotal role in patient education regarding symptoms and clinical signs of cancer
			followed by education specifically targeted for Cancer patients on how to deal
			with the disease.
			</p>

			<h3>CANCER DETECTION CAMPS</h3>
			<p>
			We have been relentlessly providing health based services to the underprivileged
			communities focussing on oral cancer screening, breast cancer screening and
			general health test like – blood pressure, BMI, carbon monoxide detection and
			pulse oximetry. We have successfully organized more than 120 cancer detection
			camps across different locations and approximately 105000 people from
			underprivileged backgrounds have directly benefitted from these camps.
			</p>
			<h3>GIFT A SMILE CAMPAIGN</h3>
			<p>
			Gift a Smile Campaign facilitated by Yuvraj Singh Foundation makes an appeal to
			Schools, Colleges, Educational Institutions and Corporates to join hands. This
			Campaign will add meaning to the lives of people suffering from Cancer as well
			their care givers and Cancer Survivors. The contributions will enable People with
			Cancer to celebrate this Diwali in a Joyful and eventful manner and in the process
			give them strength, encouragement and motivation. The Campaign envisages
			inculcating the values of helping others from an early age in Children, Adolescents
			and Youth as they are the future of our country and are future Change makers.
			</p>
			<h3>CAMPUS AWARENESS PROGRAM</h3>
			<p>
			We Conduct Cancer Awareness Campaigns at Institutional level in association
			colleges, Institutions and Organizations. The objective of conducting these
			programs is to lay the foundation of raising awareness about cancer by conducting
			sessions, workshops, seminar with the help of reputed oncologist wherein students
			are enabled and empowered to discuss their doubts and inhibitions regarding
			Cancer at the grass-root level.
			</p>
			<h3>TOGETHERWECAN</h3>
			<p>
			On the occasion of World Cancer Day, YOUWECAN announced “TOGETHERWECAN”
			a crowd-funding campaign on Desiredwings.com. Often families of these cancer
			patients and survivors exhaust all their savings during the prolonged treatment and
			are left with little or no money to fund their children’s education. The idea behind
			this initiative is to support the education of young cancer patients and survivors
			who belong to the underprivileged section of the society and help them in securing
			their future.
			</p><br/>
			<h2 className="social_main-header">FUTURE PLANS</h2>
			<h3>TREATMENT PROGRAMS</h3>
			<p>
			YOUWECAN are in the process of collaborating with various local bodies and
			hospitals across the Nation for providing free treatment to cancer patients who are
			below poverty line who cannot afford the medical ailments for themselves or their
			family members. The intention is to sponsor their treatment and help them in
			faster and healthy recovery.
			</p>
			</div>
			</div>
			);
	}
}
export default YWC;