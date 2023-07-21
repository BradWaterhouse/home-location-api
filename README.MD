# Home location service

---

Home location service that uses NFC tags to detect current location in house

## Prerequisites

---

- `Node`
- `npm`/`yarn`
- `MySQL`
---

## Preparation

- Clone repository and run `npm install`/`yarn install`
- Create a `.env` file to store database credentials (copy `env.local` variable names)

### Database

If you'd like to connect to the database being used in the example follow the steps below in your DB management tool.

```mysql
CREATE DATABASE home_location;

CREATE TABLE device (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    `user` VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE location (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE location_events (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    device_id INT(11) NOT NULL,
    location_id int(11) NOT NULL,
    date_time DATETIME NOT NULL DEFAULT NOW(),
    KEY `device_id` (`device_id`),
    CONSTRAINT `device_id_fk` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`),
    CONSTRAINT `location_id` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`)
);
```
---

### Add action to NFC tag

The below example is how to add a NFC action via the shortcuts app on iOS. 

**Before you start please note that the following example requires the Node server to be running on a web server with a URL accessible outside of your local network**

- Firstly, open the Shortcuts application
- Next, press the "Automation" tab on the bottom bar
- Click the plus icon in the top right corner and select "Create Personal Automation"
- Scroll down to NFC tag, you should see a screen like the below image.


![Alt text](https://i.ibb.co/X5MBrrS/IMG-5530.jpg)

- From here click "scan" and move you're phone next to the NFC tag
- Once found, give that tag a name
- Now the tag is active you can assign actions to the tag when it's scanned.
- The following example show function set up to log that the NFC tag has been trigger in the dining room.
- The 1 in the URL is the `device_id`, the 4 in the url is the `location_id`

![Alt text](https://i.ibb.co/MZPmG3N/IMG-5529.jpg)

- And finally here's what the API endpoint will return when looking at all actions for device_id 1

```json
{
"device_user": "brad.waterhouse",
"device_type": "iPhone ",
"location_name": "Dining Room",
"entered_at": "2023-07-21T12:11:32.000Z"
}
```

---

## Run

---

- Run ``node .`` in root of project to start Node server
- Visit `localhost:8888/...` to access your API endpoints locally.



