const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

app.get('/test', (req, res) => {
    connection.connect((error) => {
        if (error) {
            res.send(error.message);
        }

        res.send({data: 'Connected to the MySQl server. 🔥'});
    });
});

app.get('/:device_id/location/history', async (req, res) => {
    connection.query(`
      SELECT device.user, device.type, location.name, location_events.date_time AS entered_at
      FROM location_events
      JOIN location ON location.id = location_events.location_id
      JOIN device ON device.id = location_events.device_id
      WHERE device_id = ?
      ORDER BY date_time DESC
      LIMIT 15`, [req.params.device_id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
        }
        res.send(results);
    });
});

app.get('/:device_id/:location_id/add', async (req, res) => {

    connection.query(`
        INSERT INTO location_events (device_id, location_id)
        VALUES (?, ?)`,
        [
            req.params.device_id,
            req.params.location_id
        ],
        (error, results, fields) => {
        if (error) {
            res.send({error: "something has gone wrong!"});
        }
            res.send('New event added ✅');
    });
});

app.listen(8888, () => console.log('alive on http://localhost:8888 💻'));
