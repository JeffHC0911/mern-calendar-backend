const { response } = require('express');

const Event = require('../models/Event');

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventSave = await event.save();

        res.status(201).json({
            ok: true,
            evento: eventSave
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'Por favor hable con el administrador'
        })
    }
}

const getEvents = async (req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name');

    try {

        res.json({
            ok: true,
            events
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'Por favor hable con el administrador'
        })
    }
}

const updateEvents = async (req, res = response) => {

    const eventId = req.params.id;


    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });


        res.json({
            ok: true,
            event: eventUpdate

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'Por favor, hable con el administrador'
        })
    }
}

const deleteEvents = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            msg: 'Evento eliminado correctamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'Por favor hable con el administrador'
        })
    }

}

module.exports = {
    createEvent,
    getEvents,
    updateEvents,
    deleteEvents
}