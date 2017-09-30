const activities = [
  {
    "parent_category": "Technical",
    description: "The best of the brilliant minds will be surfaced and the innovations from the erudite will be discovered. For those crazy after the codes and passionate for the revv of an engine or the speed of a bot, PECFEST calls you to celebrate your zest for all things technical and explore the joy of never-before inventions, right here beyond this link.",
    "sub_categories": [
    ]
  },

  {
    "parent_category": "Cultural",
    description: "The dreamers, the artists and the liberals who maintain the merry spirits of the world; your energy will find a medium, your imagination- its reality, and your talent- a thriving purpose, as PECfest brings to you the events to surpass your own magic. Here you’ll find your fascinating challenges and the rules to go by.",
    "sub_categories": [
        {
          id: 1,
          "name": "NATYAMANCH",
          description: '',
          backgroundImageUrl: 'http://source.unsplash.com/random',
        },
        {
          id: 2,
          "name": "NRITYAMANCH",
          description: '',
          backgroundImageUrl: 'http://source.unsplash.com/random',
        },
        {
          id: 3,
          "name": "LITERARY ARTS",
          description: '',
          backgroundImageUrl: 'http://source.unsplash.com/random',
        },
        {
          id: 4,
          "name": "SPEAKING ARTS",
          description: '',
          backgroundImageUrl: 'http://source.unsplash.com/random',
        },
        {
          id: 5,
          "name": "DIGITAL DESIGN ART",
          description: '',
          backgroundImageUrl: 'http://source.unsplash.com/random',
        },
        {
          id: 6,
          "name": "FINE ARTS",
          description: '',
          backgroundImageUrl: 'http://source.unsplash.com/random',
        },
        {
          id: 7,
          "name": "MUSICAL ARTS",
          description: '',
          backgroundImageUrl: 'http://source.unsplash.com/random',
        },
        {
          id: 8,
          "name": "ENTREPRENEURICAL ARTS",
          description: '',
          backgroundImageUrl: 'http://source.unsplash.com/random',
        }
      ]
    },
  {
    parent_category: "Lectures",
    description: "",
    sub_categories: [
    ]
  },
  {
    parent_category: "Workshops",
    description: "",
    sub_categories: [
    ]
  },
  {
    parent_category: "Shows",
    description: "",
    sub_categories: [
    ]
  }
];

function preprocessEvent(event) {
  let coordinators = event.coordinators.split('~~');
  coordinators = coordinators.map(coordinator => {
    let name, phone, email;
    if (coordinator.indexOf(';') !== -1) {
      let splits = coordinator.split(';');

      name = splits[0];
      if (splits.length === 3) {
        phone = splits[1];
        email = splits[2];
      } else if (splits.length === 2) {
        phone = splits[1]
      }
    } else if (coordinator.indexOf(':') !== -1) {
      let splits = coordinator.split(';');

      name = splits[0];
      if (splits.length === 3) {
        phone = splits[1];
        email = splits[2];
      } else if (splits.length === 2) {
        phone = splits[1]
      }
    }

    return {
      name, phone, email
    }
  });

  event.coordinators = coordinators;


  const rules = event.rulesList.split('.').map(rule => rule.trim() + '.').filter(rule => rule.length > 1);
  event.rulesList = rules;

  return event;
}

window._api = {
  url: 'http://165.227.156.176:10001/',
  getEventsForCategory(category, config) {
    const events = [];

    fetch(this.url + 'event/category/' + category.id)
      .then(data => data.json())
      .then(events => {
        console.log(events);

        if (events.ACK === 'SUCCESS') {
          delete events.ACK;

          const eventsArray = []
          for (const event in events) {
            eventsArray.push(events[event]);
          }
          config.onSuccess(eventsArray);
        }
        else
          config.onFailed(events);
      })
      .catch(err => {
        console.log("This should not happened. If you are dev, then please report this immediately");
        config.onFailed(err);
      });
  },
  getEvent(eventId, config) {
    fetch(this.url + 'event/' + eventId)
      .then(data => data.json())
      .then(event => {
        if (event.ACK === 'SUCCESS') {
          delete event.ACK;

          event = preprocessEvent(event);
          console.log(event);
          config.onSuccess(event);
        } else {
          config.onFailed(event);
        }
      })
      .catch(err => {
        console.log("This should not happened. If you are dev, then please report this immediately");
        config.onFailed(err);
      });
  }
}

const api = window._api

export { activities, api };