import assoc1 from './images/colors_assoc.jpg';
import assoc2 from './images/vh1_assoc.jpg';
import offmedia1 from './images/tsn_official_media.jpg';
import fmpartner1 from './images/fmpartner.jpg';
import youthpartner1 from './images/pupulse_youth.jpg';
import photopartner1 from './images/Hawkeyed_phot.jpg';

/*Keep the id of a particular type of sponsor to be the same throughout.*/

export default [
	{
		id : 0,
		name : 'colors',
		image : assoc1,
		color : '',
		type: 'Associate Partners'
	},
	{
		id : 0,
		name : 'vh1',
		image : assoc2,
		color : '',
		type: 'Associate Partners'
	},
	{
		id : 1,
		name : 'TSN',
		image : offmedia1,
		color : '',
		type: 'Official Media Partner'
	},
	{
		id : 2,
		name : '92.7 Big FM',
		image : fmpartner1,
		color : '',
		type: 'FM Partners'
	},
	{
		id : 3,
		name : 'PU Pulse',
		image : youthpartner1,
		color : '',
		type : 'Youth Partner'
	},
	{
		id : 4,
		name : 'Hawkeyed',
		image : photopartner1,
		color : '',
		type : 'Official Photography Partner'
	}
]