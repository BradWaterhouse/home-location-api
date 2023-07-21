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

## Run

---

- Run ``node .`` in root of project to start Node server
- Visit `localhost:8888/...` to access your API endpoints.



