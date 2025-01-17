const express = require('express');
const router=express.Router();
const app=express();
const bodyparser=require('body-parser');
const usermode=require('../models/location.js');
app.use(express.json());
app.use(bodyparser.json());

router.post('/',async(req,res)=>{
    try {
        const { latitude, longitude } = req.body;
        // console.log(latitude,longitude); // Extract from request body

        // Validate input
        if (!longitude || !latitude) {
            return res.status(400).json({ message: 'latitude and longitude are required' });
        }

        // Create and save the new worker
        const newWorker = new usermode({ longitude, latitude });
        const savedWorker = await newWorker.save();

        // Respond with the saved worker
        res.status(201).json({
            user: savedWorker
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        // Extract user-provided location (longitude and latitude) from query params
        const { longitude, latitude } = req.query;

        if (!longitude || !latitude) {
            return res.status(400).json({ message: 'Longitude and Latitude are required' });
        }

        // Use MongoDB geospatial query to find the closest worker
        const closestWorker = await usermode.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    distanceField: 'distance', // Field to store the calculated distance
                    spherical: true, // Use spherical distance calculation
                },
            },
            { $limit: 1 }, // Limit to the closest one
        ]);

        if (closestWorker.length === 0) {
            return res.status(404).json({ message: 'No workers found nearby' });
        }

        res.status(200).json({
            message: 'Closest worker found',
            worker: closestWorker[0],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports=router;