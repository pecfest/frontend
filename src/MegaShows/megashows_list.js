import farhanPicture from '../images/farhan.jpg';
import glit from '../images/glit.jpg';
import bhangra from '../images/bhangra.jpg';
import artha from '../images/artha.jpg';
import dakua from '../images/dakua.jpg';

export default [
	{
		id: 1,
		title: 'Farhan Live',
		date: '28 OCT',
		location: 'Main Stage',
		coverPhoto: farhanPicture,
		isEvent: false,
		shouldSplit: true,
	},
	{
		id: 2,
		title: 'Gliterrati',
		date: '27 OCT',
		location: 'Main Stage',
		coverPhoto: glit,
		isEvent: true,
		eventId: '/events/178',
		shouldSplit: false,
	},
	{
		id: 3,
		title: 'Bhangra Theque',
		date: '',
		location: 'Main Stage',
		coverPhoto: bhangra,
		isEvent: true,
		eventId: '/events/122',
		shouldSplit: false,
	},
	{
		id: 4,
		title: 'Artha',
		titleLine: `Headlining 'The Fusion Band Competition'`,
		date: '',
		location: '',
		coverPhoto: artha,
		shouldSplit: false,
	},
	{
		id: 5,
		title: 'The Dakua Stop',
		titleLine: `Headlining 'Rockathon'`,
		date: '',
		location: '',
		coverPhoto: dakua,
		shouldSplit: false,
	}
]