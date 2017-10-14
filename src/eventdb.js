window._activities = {
  activities: []
}

const activities = window._activities.activities

function preprocessEvent(event) {
  let coordinators = event.coordinators.split(';');
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
      let splits = coordinator.split(':');

      name = splits[0];
      if (splits.length === 3) {
        phone = splits[1];
        email = splits[2];
      } else if (splits.length === 2) {
        phone = splits[1]
      }
    } else if (coordinator.indexOf('-') !== -1) {
      let splits = coordinator.split('-');

      name = splits[0];
      if (splits.length === 3) {
        phone = splits[1];
        email = splits[2];
      } else if (splits.length === 2) {
        phone = splits[1]
      }
    } else if (coordinator.indexOf('(') !== -1) {
      name = coordinator.split('(')[0];
      phone = coordinator.match(/\(([^)]+)\)/)[1]
    } else {
      name = coordinator;
    }

    return {
      name, phone, email
    }
  });

  event.coordinators = coordinators;


  event.rulesList = [event.rulesList];

  return event;
}

window._api = {
  url: process.env.NODE_ENV === 'development1' ? 'http://localhost/v1/' : 'http://api.pecfest.in/v1/',
  getEventsForCategory(category, config) {
    const events = [];

    fetch(this.url + 'event/category/' + category.id)
      .then(data => data.json())
      .then(events => {
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
          config.onSuccess(event);
        } else {
          config.onFailed(event);
        }
      })
      .catch(err => {
        console.log("This should not happened. If you are dev, then please report this immediately");
        config.onFailed(err);
      });
  },

  getActivities(config) {
    fetch(this.url + 'categories')
      .then(data => data.json())
      .then(cats => {
        for (const cat in cats) {
          activities.push(cats[cat])
        }
        config.onSuccess(activities);
      })
      .catch(err => {
        config.onFailed(err)
      })
  }
}

const api = window._api

export { api, activities };